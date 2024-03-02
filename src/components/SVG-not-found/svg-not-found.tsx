import { NavLink } from "react-router-dom";
import {
  Styled404,
  StyledErr,
  StyledMainBox,
  StyledQusetion,
  Styledmsg,
} from "./svg-not-found.styled";

export const SVGNotFound = () => {
  return (
    <StyledMainBox>
      <Styled404>
        <StyledErr>4</StyledErr>
        <StyledQusetion>?</StyledQusetion>
        <StyledErr>4</StyledErr>
      </Styled404>
      <Styledmsg>
        Maybe this page moved? Got deleted? Is hiding? Never existed in the
        first place?
        <p>
          Let's go{" "}
          <span>
            <NavLink to={"/"}>home</NavLink>
          </span>{" "}
          and try from there.
        </p>
      </Styledmsg>
    </StyledMainBox>
  );
};
