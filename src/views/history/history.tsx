import { NavLink, useNavigate } from "react-router-dom"
import { StyledHistoryHeading, StyledImg, StyledLi, StyledQuery, StyledQueryContainer, StyledQueryDiv, StyledUl } from "./history.styled"
import { useEffect, useState } from "react"
import {  useValuesContext } from "../../context/valuesContext"
import { searchImages } from "../../api/api"
import useFetch from "../../hooks/useFetch"
import { debounce } from "lodash"
import useInfiniteScroll from "../../hooks/useInfiniteScroll"

export const History = () => {
  const [isQuery, setIsQuery] = useState(localStorage.getItem('searchQueries'))
  const items = JSON.parse(localStorage.getItem('searchQueries') || '[]')
  const navigate = useNavigate()
  const { searchQuery, setSearchQuery, page, setPage } = useValuesContext()
  const [images, loading, fetchImages] = useFetch(searchQuery);

  // custom hook for infinite scrolling
  useInfiniteScroll(fetchImages, loading);
  const handleClick = async (query: string) => {
    setSearchQuery(query)
  }

  useEffect(() => {
    if(searchQuery){
      fetchImages()
    }
  }, [searchQuery])

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

  return (
  <StyledHistoryHeading>
         {!isQuery && <p>No search history, <NavLink to={"/"}>Go back</NavLink></p>}
         <StyledQueryContainer>
         {items?.map((query:string, index:number) => (
          <StyledQueryDiv key={index}>
            <StyledQuery onClick={() => handleClick(query)}>{query}</StyledQuery>
          </StyledQueryDiv>
        ))}

       <StyledUl>
       {images.map(({ id, urls: { regular, full }, likes }, index) => (
            // To make sure keys unique
            <StyledLi key={`${id}-${index}`}>
              <StyledImg src={regular} alt={`Image ${id}`} />
            </StyledLi>
          ))}
       </StyledUl>
         </StyledQueryContainer>
      </StyledHistoryHeading>
      
  )
}
