import React, { useState, useEffect } from 'react';
import { StyledScrollButton } from './scroll-buttom.styled';
import { useValuesContext } from '../../context/valuesContext';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const {setModal} = useValuesContext()

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const isVisible = scrollY > 100;
      setIsVisible(isVisible);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      setModal(false)
  };

  return (
    <StyledScrollButton
      onClick={scrollToTop}
      style={{ display: isVisible ? 'block' : 'none' }}
    >
      Scroll to Top
    </StyledScrollButton>
  );
};
