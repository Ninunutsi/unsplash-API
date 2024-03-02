import styled from "styled-components";

export const StyledUl = styled.ul`
    margin: auto;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-evenly;
`

export const StyledImg = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 0.3rem;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    cursor: pointer;
    object-fit: cover;
`

export const StyledLi = styled.li`
    margin: 5px;
    flex: 0 0 calc(14% );
    width: 200px;
    height: 200px;
`

export const StyledGallery = styled.section`
    overflow-y: hidden;
`