import { NavLink, useNavigate } from "react-router-dom"
import { StyledHistoryHeading, StyledQuery, StyledQueryContainer, StyledQueryDiv } from "./history.styled"
import { useState } from "react"

export const History = () => {
  const [isQuery, setIsQuery] = useState(localStorage.getItem('searchQueries'))
  const items = JSON.parse(localStorage.getItem('searchQueries') || '[]')
  const navigate = useNavigate()

  console.log(items)
  return (
  <StyledHistoryHeading>
         {!isQuery && <p>No search history, <NavLink to={"/"}>Go back</NavLink></p>}
         <StyledQueryContainer>
         {items?.map((query:string, index:number) => (
          <StyledQueryDiv key={index}>
            <StyledQuery><NavLink to={'/'}>{query}</NavLink></StyledQuery>
          </StyledQueryDiv>
        ))}
         </StyledQueryContainer>
      </StyledHistoryHeading>
      
  )
}
