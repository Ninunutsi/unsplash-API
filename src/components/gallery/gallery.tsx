import React from 'react'
import { StyledImg, StyledLi, StyledUl } from './gallery.styled'
import { Modal } from '../modal';
import { ScrollToTopButton } from '../scroll-to-top-buttom';
import { useValuesContext } from '../../context/valuesContext';
  interface UnsplashImage {
    id: string;
    urls: {
      regular: string;
      full: string
    };
    likes: number
  }

  interface IGallery {
    images: UnsplashImage[]
    handleClick: (id: string, full: string, likes: number) => void
  }

export const Gallery:React.FC<IGallery> = ({images, handleClick}) => {
  const { singlePhoto, modal,handleCloseModal} = useValuesContext()

  return (
    <>
      {modal && <Modal onClick={handleCloseModal} data={singlePhoto}/>}
            {!modal && <ScrollToTopButton/>}
    <StyledUl>
          {images.map(({ id, urls: { regular, full }, likes }, index) => (
            // To make sure keys are unique
            <StyledLi key={`${id}-${index}`}>
              <StyledImg src={regular} alt={`Image ${id}`} onClick={() => handleClick(id, full, likes)} />
            </StyledLi>
          ))}
        </StyledUl>
    </>
  )
}
