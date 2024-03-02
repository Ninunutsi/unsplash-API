import styled, { keyframes } from "styled-components";

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Styled404 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9rem;
  gap: 2rem;
`;

export const StyledMainBox = styled.div`
  margin: 10vh auto;
  display: flex;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  gap: 1rem;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  position: relative;
`;

export const StyledErr = styled.div``;

export const Styledmsg = styled.div`
  width: 27rem;
  text-align: center;
  font-size: var(--fs-s);
  line-height: 1.6rem;
  border: 1ps solid red;

  p {
    margin-top: 1rem;
    font-size: 1.3rem;
  }

  p span {
    cursor: pointer;
    padding: 0.3rem 0.7rem;
    border-radius: 0.5rem;
    color: var(--clr-background-black);
    background-color: var(--clr-white);
  }
  p span:hover {
    color: var(--clr-purple);
  }
`;

export const StyledQusetion = styled.div`
  animation: ${spinAnimation} 8s linear infinite;
`;
