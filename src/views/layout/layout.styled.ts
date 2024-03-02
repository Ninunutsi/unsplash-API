import styled from "styled-components";

export const StyledMainBody = styled.main`

`

export const StyledHeader = styled.header`

`

export const StyledNav = styled.nav`
width: 100%;
font-size: 30px;
position: fixed;
left: 0;
top: 0;
z-index: 9;
background-color: var(--clr-background-black);
display: flex;
margin: auto;
align-items: center;
gap: 3rem;
justify-content: space-between;

a{
    width: 50%;
    padding: 1rem;
    text-align: center;
    border: 1px solid transparent;
}

a:hover{
    transition: 0.5s ease-in;
    background-color: transparent;
    color: var(--clr-white);
    border-bottom: 1px solid var(--clr-white);
}

a.active{
    padding: 1rem;
    color: var(--clr-background-black);
    background-color: var(--clr-white);
    border-bottom: 1px solid var(--clr-blue);
}

`