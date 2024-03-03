//QAIA
import { useState, useEffect, useRef } from 'react';
import { searchImages, getImagesByPage } from '../api/api';
import { useValuesContext } from '../context/valuesContext';
import { UnsplashImage } from '../interfaces/app.interface';
import { useQueryClient } from 'react-query';

const useFetch = (searchQuery: string | undefined, historyQuery?: string): [UnsplashImage[], boolean, () => void] => {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { page, setPage } = useValuesContext();
  const queryClient = useQueryClient();
  const historyQueryRef = useRef<string | undefined>(historyQuery);
  const pageRef = useRef<number>(page);

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  useEffect(() => {
    historyQueryRef.current = historyQuery; 
  }, [historyQuery]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      let res;
      const currentQuery = searchQuery || historyQueryRef.current;
      const cacheKey = ['img', currentQuery, pageRef.current];
      const cachedData = queryClient.getQueryData(cacheKey);

      if (cachedData) {
        res = cachedData;
      } else {
        if (searchQuery) {
          res = await searchImages(searchQuery, pageRef.current);
        } else if (historyQueryRef.current) {
          res = await searchImages(historyQueryRef.current, pageRef.current);
        } else {
          res = await getImagesByPage(pageRef.current);
        }
        queryClient.setQueryData(cacheKey, res);
      }

      const response = res;
      if (pageRef.current === 1) {
        setImages(response);
      } else {
        setImages(prevImages => [...prevImages, ...response]);
      }

      setPage((prevPage:number) => prevPage + 1);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setImages([]);
    setPage(1);
  }, [searchQuery, historyQuery]);

  return [images, loading, fetchImages];
};

export default useFetch;
