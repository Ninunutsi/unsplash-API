import { useState, useEffect } from 'react';
import { searchImages, getImagesByPage } from '../api/api';
import { useValuesContext } from '../context/valuesContext';

interface UnsplashImage {
  id: string;
  urls: {
    regular: string;
    full: string
  };
  likes: number
}

const useFetch = (searchQuery: string): [UnsplashImage[], boolean, () => void] => {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const {page, setPage} = useValuesContext()

  
  const fetchImages = async () => {
    setLoading(true);
    try {
      let res
      if(searchQuery){
        res = await searchImages(searchQuery, page)
      }else{
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
