import { useState, useEffect } from 'react';
import { searchImages, getImagesByPage } from '../api/api';
import { debounce } from "lodash";

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
  const [page, setPage] = useState<number>(1);
  
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
      setPage(prevPage => prevPage + 1);
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

  // useEffect(() => {
  //   const initialLoadDelay = searchQuery ? 1000 : 0;
  //   const debouncedFetchImages = debounce(fetchImages, initialLoadDelay);
  //   debouncedFetchImages(); // Call the debounced function
  
  //   let timer: NodeJS.Timeout | null = null;
  
  //   if (searchQuery) {
  //     const saveQueryAfterDelay = () => {
  //       timer = setTimeout(() => {
  //         const previousQueries = JSON.parse(localStorage.getItem('searchQueries') || '[]');
  //         if (!previousQueries.includes(searchQuery)) {
  //           const updatedQueries = [...previousQueries, searchQuery];
  //           localStorage.setItem('searchQueries', JSON.stringify(updatedQueries));
  //         }
  //       }, 1000);
  //     };
  //       saveQueryAfterDelay();
  
  //     return () => {
  //       if (timer) clearTimeout(timer);
  //       debouncedFetchImages.cancel();
  //     };
  //   }
  // }, [searchQuery]);
  

  return [images, loading, fetchImages];
};


export default useFetch;
