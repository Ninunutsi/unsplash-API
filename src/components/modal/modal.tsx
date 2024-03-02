import React from "react";
import {
  StyledCDContainer,
  StyledCDPopup,
  StyledClose,
  StyledTexts,
} from "./modal.styled";
import { IModal } from "../../interfaces/app.interface";

export const Modal: React.FC<IModal> = ({ onClick, data}) => {
  const { downloads, likes, src, views } = data || {
    downloads: 0,
    likes: 0,
    src: "",
    views: 0,
  };
  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <StyledCDPopup onClick={onClick}>
      <StyledCDContainer onClick={handleContentClick}>
        <StyledTexts><p>Downloads: {downloads}</p>
        <p>Views: {views}</p>
        <p>Likes: {likes}</p></StyledTexts>
       <img src={src} alt="" />
        <StyledClose onClick={onClick} id="close">
          &times;
        </StyledClose>
      </StyledCDContainer>
    </StyledCDPopup>
  );
};
