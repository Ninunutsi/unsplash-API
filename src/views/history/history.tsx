import { NavLink } from "react-router-dom"
import { StyledHistoryHeading, StyledLoading, StyledQuery, StyledQueryContainer, StyledQueryDiv } from "./history.styled"
import { useEffect, useState } from "react"
import {  useValuesContext } from "../../context/valuesContext"
import useFetch from "../../hooks/useFetch"
import useInfiniteScroll from "../../hooks/useInfiniteScroll"
import { Gallery } from "../../components/gallery"

export const History = () => {
  const [isQuery, setIsQuery] = useState(localStorage.getItem('searchQueries'))
  const items = JSON.parse(localStorage.getItem('searchQueries') || '[]')
  const {searchQuery, setSearchQuery, handleClick} = useValuesContext()
  const [images, loading, fetchImages] = useFetch(searchQuery);

  // custom hook for infinite scrolling
  useInfiniteScroll(fetchImages, loading);
  
  const handleQueryClick = async (query: string) => {
    setSearchQuery(query)
  }
  useEffect(() => {
    if(searchQuery){
      fetchImages()
    }
  }, [searchQuery])

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
       <Gallery images={images} handleClick={handleClick}/>
         </StyledQueryContainer>
      </StyledHistoryHeading>
      {loading && <StyledLoading className="loading">Loading More Images..</StyledLoading>}

  </>
  )
}
