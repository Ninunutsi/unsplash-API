import React from "react";
import {
  StyledCDContainer,
  StyledCDPopup,
  StyledClose,
  StyledTexts,
} from "./modal.styled";

export interface ISinglePhoto {
  downloads:number
  likes:number
  src: string
  views: number
}

interface IModal {
  data: ISinglePhoto | undefined
  onClick: () => void;
}

export const Modal: React.FC<IModal> = ({ onClick, data}) => {
  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <StyledCDPopup onClick={onClick}>
      <StyledCDContainer onClick={handleContentClick}>
        <StyledTexts><p>Downloads: {data?.downloads}</p>
        <p>Views: {data?.views}</p>
        <p>Likes: {data?.likes}</p></StyledTexts>
       <img src={data?.src} alt="" />
        <StyledClose onClick={onClick} id="close">
          &times;
        </StyledClose>
      </StyledCDContainer>
    </StyledCDPopup>
  );
};
