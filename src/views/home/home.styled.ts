import styled from "styled-components";

export const StyledScrollDiv = styled.main`
    overflow: auto;
    /* position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 7;
    left: 0;
    padding-top: 10vh; */
    margin-top: 10vh;
    position: relative;
    z-index: 7;
`

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
    position: relative;
    z-index: 10;
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

export const StyledLoading = styled.p`
text-align: center;
font-size: 2rem;
line-height: 2.7rem;
margin: 0.4rem;
`

export const StyledInput = styled.input`
    align-self: center;
    border-bottom: 1px solid var(--clr-white);
    width: 50%;
    padding: 1rem;
    margin: 1rem 0 2rem 0;
`
export const StyledLabel = styled.label`
display: flex;
max-width: 75rem;
justify-content: center;
margin: auto;
pad: 0 1rem;

`