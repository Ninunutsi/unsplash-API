import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { StyledInput, StyledLabel, StyledLoading, StyledScrollDiv} from "./home.styled";
import { debounce } from "lodash";
import { useValuesContext } from "../../context/valuesContext";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { Gallery } from "../../components/gallery";

export const Home: React.FC = () => {
  const {searchQuery, setSearchQuery, handleClick} = useValuesContext()
  const [images, loading, fetchImages] = useFetch(searchQuery);

  useInfiniteScroll(fetchImages, loading);

  useEffect(() => {
    const initialLoadDelay = searchQuery ? 1000 : 0;
    const debouncedFetchImages = debounce(fetchImages, initialLoadDelay);
    debouncedFetchImages(); // Call the debounced function
  
    let timer: number = 0;
  
    if (searchQuery) {
      const saveQueryAfterDelay = () => {
        timer = setTimeout(() => {
          const previousQueries = JSON.parse(localStorage.getItem('searchQueries') || '[]');
          if (!previousQueries.includes(searchQuery)) {
            const updatedQueries = [searchQuery, ...previousQueries];
            localStorage.setItem('searchQueries', JSON.stringify(updatedQueries));
          }
        }, 1000);
      };
        saveQueryAfterDelay();
  
      return () => {
        if (timer) clearTimeout(timer);
        debouncedFetchImages.cancel();
      };
    }
  }, [searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <StyledScrollDiv>
        <StyledLabel>
          <StyledInput type="text" placeholder="Search images" value={searchQuery} onChange={handleSearch} />
        </StyledLabel>
        <Gallery images={images} handleClick={handleClick}/>
        {loading && <StyledLoading className="loading">Loading More Images..</StyledLoading>}
      </StyledScrollDiv>
    </>
  );
};
