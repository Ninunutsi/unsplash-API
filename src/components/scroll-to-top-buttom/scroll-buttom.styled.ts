import styled from "styled-components";

export const StyledScrollButton = styled.button`
    position: fixed;
    right: 7rem;
    padding: 10px;
    background-color: aliceblue;
    color: green;
    z-index: 909090;
    bottom: 7rem;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    color: var(--clr-white);
    cursor: pointer;
    font-size: 20px;

    &:hover{
        opacity: 0.5;
        transition: .5s;
    }
`