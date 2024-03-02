import { useState, useEffect, useRef } from 'react';
import { searchImages, getImagesByPage } from '../api/api';
import { useValuesContext } from '../context/valuesContext';
import { UnsplashImage } from '../interfaces/app.interface';
import { useQueryClient } from 'react-query';

const useFetch = (searchQuery: string | undefined, historyQuery?:string): [UnsplashImage[], boolean, () => void] => {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const {page, setPage} = useValuesContext()
  const queryClient = useQueryClient();
  const historyQueryRef = useRef<string | undefined>(historyQuery);
  const pageRef = useRef<number>(page)
  console.log(page, "1")
  console.log(pageRef)
  useEffect(() => {
    pageRef.current = page; // Update pageRef.current whenever page changes
  }, [page]);
  useEffect(() => {
    historyQueryRef.current = historyQuery; // Update the ref whenever historyQuery changes
  }, [historyQuery]);
  const fetchImages = async () => {
    setLoading(true);
    try {
      let res
      const currentHistoryQuery = historyQueryRef.current;
      if(searchQuery){
          const cachedData = queryClient.getQueryData(['img', searchQuery, pageRef.current]);
        if (cachedData) {
          res = cachedData;
        } else {
          res = await searchImages(searchQuery, pageRef.current);
          queryClient.setQueryData(['img', searchQuery, pageRef.current], res);
        }
      }else if(currentHistoryQuery){
        const cachedData = queryClient.getQueryData(['img', currentHistoryQuery, pageRef.current]);
        if (cachedData) {
          res = cachedData;
        } else {
          res = await searchImages(currentHistoryQuery, pageRef.current);
          queryClient.setQueryData(['img', currentHistoryQuery, pageRef.current], res);
        }
      }else{
          res = await getImagesByPage(pageRef.current)
        }
      const response = res
      if (pageRef.current === 1) {
        setImages(response);
      } else {
        setImages(prevImages => [...prevImages, ...response]);
      }
      console.log(page, "trishi")

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
    console.log(page, "useEffectshi")
  }, [searchQuery, historyQuery]);

  return [images, loading, fetchImages];
};


export default useFetch;
