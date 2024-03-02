import React, { useState, useEffect } from 'react';
import { StyledScrollButton } from './scroll-buttom.styled';

interface MyComponentProps {
    scrollRef: React.RefObject<HTMLDivElement>;
  }

export const ScrollToTopButton: React.FC<MyComponentProps> = ({scrollRef}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const scrollY = scrollRef.current.scrollTop;
      const isVisible = scrollY > 100;
      setIsVisible(isVisible);
    };

    if (scrollRef.current) {
      scrollRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [scrollRef]);

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
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

