import styled from "styled-components";

export const StyledHistoryHeading = styled.main`
text-align: center;
margin-top: 17vh;
font-size: var(--fs-h3);
color: var(--clr-white);
/* border: 1px solid var(--clr-white); */
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
gap: 2rem;
align-items: center;
`

export const StyledQueryDiv = styled.div`

`
export const StyledQuery = styled.p`
`