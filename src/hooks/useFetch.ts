import { useState, useEffect } from 'react';
import { searchImages, getImagesByPage, useSearchImages } from '../api/api';
import { useValuesContext } from '../context/valuesContext';
import { UnsplashImage } from '../interfaces/app.interface';
import { useQueryClient } from 'react-query';

const useFetch = (searchQuery: string | undefined, historyQuery?:string): [UnsplashImage[], boolean, () => void] => {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const {page, setPage} = useValuesContext()
  const queryClient = useQueryClient();
console.log(historyQuery)
  const fetchImages = async () => {
    setLoading(true);
    try {
      let res
      if(searchQuery){
          console.log('search')
          const cachedData = queryClient.getQueryData(['img', searchQuery, page]);
        if (cachedData) {
          res = cachedData;
        } else {
          res = await searchImages(searchQuery, page);
          queryClient.setQueryData(['img', searchQuery, page], res);
        }}else{
          console.log("arcertu")
          res = await getImagesByPage(page)
        }
      const response = res
      if (page === 1) {
        setImages(response);
      } else {
        setImages(prevImages => [...prevImages, ...response]);
      }
      setPage((prevPage: number) => prevPage + 1);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setImages([]);
    setPage(1); 
  }, [searchQuery]);

  return [images, loading, fetchImages];
};


export default useFetch;
