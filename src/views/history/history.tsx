import React from "react"
import { NavLink } from "react-router-dom"
import { StyledGalleryDiv, StyledHistoryHeading, StyledLoading, StyledQuery, StyledQueryContainer, StyledQueryDiv } from "./history.styled"
import { useRef, useState } from "react"
import {  useValuesContext } from "../../context/valuesContext"
import useFetch from "../../hooks/useFetch"
import useInfiniteScroll from "../../hooks/useInfiniteScroll"
import { Gallery } from "../../components/gallery"
import { debounce } from "lodash"

export const History: React.FC = () => {
  const [isQuery, setIsQuery] = useState(localStorage.getItem('searchQueries'))
  const items = JSON.parse(localStorage.getItem('searchQueries') || '[]')
  const { handleClick, historyQuery, setHistoryQuery} = useValuesContext()
  const [images, loading, fetchImages] = useFetch(undefined, historyQuery);
  const selectedQuery = useRef("")
  const [debounceActive, setDebounceActive] = useState(false);
  
  useInfiniteScroll(fetchImages, loading);
  
  const handleQueryClick = (query: string) => {
    setHistoryQuery(query)
    selectedQuery.current = query
    const debouncedFetch = debounce(() => {
      setDebounceActive(false); 
      fetchImages();
    }, 1000);
    setDebounceActive(true)
    debouncedFetch()
  }

  return (
  <>
  <StyledHistoryHeading>
         {!isQuery && <p>No search history, <NavLink to={"/"}>Go back</NavLink></p>}
         <StyledQueryContainer>
         {items?.map((query:string, index:number) => (
          <StyledQueryDiv key={index}>
            <StyledQuery onClick={() => handleQueryClick(query)} style={{ backgroundColor: selectedQuery.current === query ? "transparent" : '', color: selectedQuery.current === query ? '#323643' : '' }}>{query}</StyledQuery>
          </StyledQueryDiv>
        ))}
       <StyledGalleryDiv><Gallery images={images} handleClick={handleClick}/></StyledGalleryDiv>
         </StyledQueryContainer>
      </StyledHistoryHeading>
      {debounceActive && <StyledLoading className="loading">Loading..</StyledLoading>}
      {loading && !debounceActive && <StyledLoading className="loading">Loading More Images..</StyledLoading>}

  </>
  )
}
