import { NavLink } from "react-router-dom"
import { StyledGalleryDiv, StyledHistoryHeading, StyledLoading, StyledQuery, StyledQueryContainer, StyledQueryDiv } from "./history.styled"
import { useState } from "react"
import {  useValuesContext } from "../../context/valuesContext"
import useFetch from "../../hooks/useFetch"
import useInfiniteScroll from "../../hooks/useInfiniteScroll"
import { Gallery } from "../../components/gallery"
import { debounce } from "lodash"

export const History = () => {
  const [isQuery, setIsQuery] = useState(localStorage.getItem('searchQueries'))
  const items = JSON.parse(localStorage.getItem('searchQueries') || '[]')
  const { handleClick, historyQuery, setHistoryQuery} = useValuesContext()
  const [images, loading, fetchImages] = useFetch(undefined, historyQuery);
  
  // custom hook for infinite scrolling
  useInfiniteScroll(fetchImages, loading);
  
  const handleQueryClick = (query: string) => {
    setHistoryQuery(query)
    const debouncedFetch = debounce(fetchImages, 1000)
    debouncedFetch()
  }

  return (
  <>
  <StyledHistoryHeading>
         {!isQuery && <p>No search history, <NavLink to={"/"}>Go back</NavLink></p>}
         <StyledQueryContainer>
         {items?.map((query:string, index:number) => (
          <StyledQueryDiv key={index}>
            <StyledQuery onClick={() => handleQueryClick(query)}>{query}</StyledQuery>
          </StyledQueryDiv>
        ))}
       <StyledGalleryDiv><Gallery images={images} handleClick={handleClick}/></StyledGalleryDiv>
         </StyledQueryContainer>
      </StyledHistoryHeading>
      {loading && <StyledLoading className="loading">Loading More Images..</StyledLoading>}

  </>
  )
}
