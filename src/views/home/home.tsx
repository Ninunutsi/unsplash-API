import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { StyledImg, StyledInput, StyledLabel, StyledLi, StyledLoading, StyledScrollDiv, StyledUl } from "./home.styled";
import { Modal } from "../../components/modal";
import { getOneImage} from "../../api/api";
import { ScrollToTopButton } from "../../components/scroll-to-top-buttom";
import { useQueryClient } from "react-query";
import { debounce } from "lodash";
import { useValuesContext } from "../../context/valuesContext";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

interface ImageData {
  downloads: {
    total: number;
  };
  views: {
    total: number;
  };
}

interface ISinglePhoto {
  downloads:number
  likes:number
  views: number
  src: string
}

export const Home: React.FC = () => {
  const {searchQuery, setSearchQuery} = useValuesContext()
  const [images, loading, fetchImages] = useFetch(searchQuery);
  const [modal, setModal] = useState<boolean>(false);
  const [singlePhoto, setSinglePhoto] = useState<ISinglePhoto | undefined>(undefined)

  const queryClient = useQueryClient();
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

  const handleCloseModal = () => {
    setModal(false);
  };

  // useEffect(() => {
  //   const handleScroll = debounce(() => {
  //     if (
  //       window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 300 &&
  //       !loading
  //     ) {
  //       fetchImages();
  //     }
  //   }, 200);

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [loading, fetchImages]);


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClick = async (id: string, src: string, likes: number) => {
  // Check if data is already cached
  const cachedData = queryClient.getQueryData(['image', id]);
  
  if (cachedData) {
    const { downloads: {total: downloads}, views: {total: views} } = cachedData as ImageData;
    setSinglePhoto({
      downloads: downloads,
      likes: likes,
      views: views,
      src: src
    });
  } else {
    // Fetch and cache the data if not cached
    const res = await getOneImage(id);
    const data = res?.data;
    if (data) {
      const { downloads: {total: downloads}, views: {total: views} } = data;
      queryClient.setQueryData(['image', id], data);
      setSinglePhoto({
        downloads: downloads,
        likes: likes,
        views: views,
        src: src
      });
    }
  }
  setModal(true);
}

  return (
    <>
        {modal && <Modal onClick={handleCloseModal} data={singlePhoto}/>}
      <StyledScrollDiv>
        {!modal && <ScrollToTopButton/>}
        <StyledLabel>
          <StyledInput type="text" placeholder="Search images" value={searchQuery} onChange={handleSearch} />
        </StyledLabel>
        <StyledUl>
          {images.map(({ id, urls: { regular, full }, likes }, index) => (
            // To make sure keys unique
            <StyledLi key={`${id}-${index}`}>
              <StyledImg src={regular} alt={`Image ${id}`} onClick={() => handleClick(id, full, likes)} />
            </StyledLi>
          ))}
        </StyledUl>
        {loading && <StyledLoading className="loading">Loading More Images..</StyledLoading>}
      </StyledScrollDiv>
    </>
  );
};
