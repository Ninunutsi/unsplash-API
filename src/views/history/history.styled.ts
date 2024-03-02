import styled from "styled-components";

export const StyledHistoryHeading = styled.main`
text-align: center;
margin-top: 11vh;
font-size: var(--fs-h3);
color: var(--clr-white);
padding: 4rem;

a{
    background-color: var(--clr-white);
    padding: 0.4rem 1rem;
    border: 1px solid var(--clr-white);
    border-radius: 0.6rem;
    color: var(--clr-background-black);
}

a:hover{
    background-color: transparent;
    color: var(--clr-white);
    transition: 0.5s ease-out;
}
`

export const StyledHistoryContainer = styled.main`
color: red;
`

export const StyledQueryContainer = styled.div`
width: 100%;
display: flex;
flex-wrap: wrap;
gap: 1rem;
align-items: center;
`

export const StyledQueryDiv = styled.div`
`
export const StyledQuery = styled.p`
cursor: pointer;
background-color: var(--clr-white);
border: 1px solid transparent;
padding: 0.4rem;
color: var(--clr-background-black);
font-size: 1.2rem;
`

export const StyledLoading = styled.p`
text-align: center;
font-size: 2rem;
line-height: 2.7rem;
margin: 0.4rem;
`