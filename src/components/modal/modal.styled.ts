import styled from "styled-components";
export const StyledBTN = styled.button`
  height: 3.125rem;
  width: 100%;
  cursor: pointer;
  color: aliceblue;
  background-color: var(--clr-indigo-500);
`;

export const StyledCDPopup = styled.div`
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(94, 110, 141, 0.3);
  animation: fadein 0.5s;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const StyledTexts = styled.div`
position: absolute;
left: 0;
bottom: 0;
width: 18rem;
height: 10rem;
border-top-right-radius: 1rem;
cursor: pointer;
padding-left: 0.5rem;
background-color: var(--clr-background-black);
p{
  margin: 1rem 0;
  font-weight: bold;
}



&:hover{
background-color: transparent;
transition: 1s ease-out;
}

`

export const StyledCDContainer = styled.div`
  position: absolute;
  width: 85vw;
  height: 90vh;
  z-index: 9999;
  top: 50%;
  left: 50%;
  overflow: hidden;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 0.25em 0.25em 0.4em 0.4em;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const StyledPopuoButtons = styled.ul`
  &:after {
    content: "";
    display: table;
    clear: both;
  }

  li {
    float: left;
    width: 50%;
    list-style: none;
    cursor: pointer;
    display: block;
    height: 3.125rem;
    line-height: 3.125rem;
    text-transform: uppercase;
    color: #fff;
    transition: background-color 0.2s;
  }

  li:first-child {
    background: #fc7169;
    border-radius: 0 0 0 0.25em;
  }

  li:first-child:hover {
    background-color: #fc8982;
  }

  li:last-child {
    background: #b6bece;
    border-radius: 0 0 0.25em 0;
  }

  li:last-child:hover {
    background-color: aliceblue;
    color: #c0c7d5;
  }
`;

export const StyledClose = styled.button`
  position: absolute;
  top: 0.625rem;
  right: 1.25rem;
  font-size: 1.3rem;
  cursor: pointer;
`;
