import { useEffect } from 'react';
import { debounce } from 'lodash';

const useInfiniteScroll = (fetchFunction: () => void, loading: boolean) => {
  useEffect(() => {
    const handleScroll = debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 300 &&
        !loading
      ) {
        fetchFunction();
      }
    }, 200);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, fetchFunction]);
};

export default useInfiniteScroll;
