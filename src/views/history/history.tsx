import { NavLink, useNavigate } from "react-router-dom"
import { StyledHistoryHeading, StyledQuery, StyledQueryContainer, StyledQueryDiv } from "./history.styled"
import { useEffect, useState } from "react"
import {  useValuesContext } from "../../context/valuesContext"
import { searchImages } from "../../api/api"

export const History = () => {
  const [isQuery, setIsQuery] = useState(localStorage.getItem('searchQueries'))
  const items = JSON.parse(localStorage.getItem('searchQueries') || '[]')
  const navigate = useNavigate()
  const { searchQuery, setSearchQuery, page, setPage } = useValuesContext()

  const handleClick = async (query: string) => {
    setSearchQuery(query)
    await searchImages(query, page)
  }
  return (
  <StyledHistoryHeading>
         {!isQuery && <p>No search history, <NavLink to={"/"}>Go back</NavLink></p>}
         <StyledQueryContainer>
         {items?.map((query:string, index:number) => (
          <StyledQueryDiv key={index}>
            <StyledQuery onClick={() => handleClick(query)}><NavLink to={'/'}>{query}</NavLink></StyledQuery>
          </StyledQueryDiv>
        ))}
         </StyledQueryContainer>
      </StyledHistoryHeading>
      
  )
}
