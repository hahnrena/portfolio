// src/components/Navbar.jsx
// Sticky editorial navbar with scroll-reactive background and mobile overlay nav

import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndex.navbar};
  transition: background-color ${({ theme }) => theme.transitions.base},
    box-shadow ${({ theme }) => theme.transitions.base},
    transform ${({ theme }) => theme.transitions.base};
  background-color: ${({ $scrolled, theme }) =>
    $scrolled ? theme.colors.espressoBark : 'transparent'};
  color: ${({ theme }) => theme.colors.oxbloodBrick};
`;

const NavInner = styled.nav`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-inline: ${({ theme }) => theme.spacing.lg};
    padding-block: ${({ theme }) => theme.spacing.md};
  }
`;

const Logo = styled(Link)`
  font-family: ${({ theme }) => theme.typography.fonts.display};
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.rustOchre};
`;

const NavLinks = styled.div`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    gap: ${({ theme }) => theme.spacing.lg};
    align-items: center;
  }
`;

const NavLink = styled(Link)`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  position: relative;
  padding-bottom: 2px;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.goldenMustard};
    transform-origin: left;
    transform: scaleX(0);
    transition: transform 220ms ease-out;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.goldenMustard};
  }

  &:hover::after {
    transform-origin: left;
    transform: scaleX(1);
  }

  &.--active {
    color: ${({ theme }) => theme.colors.goldenMustard};
  }
`;

const BurgerButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  width: 32px;
  height: 32px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const BurgerLine = styled.span`
  height: 2px;
  width: 100%;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.linenCream};
  transform-origin: center;
  transition: transform ${({ theme }) => theme.transitions.fast},
    opacity ${({ theme }) => theme.transitions.fast};

  ${({ $open, $index }) =>
    $open &&
    ($index === 0
      ? 'transform: translateY(6px) rotate(45deg);'
      : $index === 1
      ? 'opacity: 0;'
      : 'transform: translateY(-6px) rotate(-45deg);')}
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.oxideUmber};
  color: ${({ theme }) => theme.colors.linenCream};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  z-index: ${({ theme }) => theme.zIndex.overlayNav};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: opacity ${({ theme }) => theme.transitions.base};
`;

const OverlayLink = styled(Link)`
  font-family: ${({ theme }) => theme.typography.fonts.display};
  font-size: 1.8rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
`;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close overlay on route change
    setOpen(false);
  }, [location.pathname]);

  return (
    <NavWrapper $scrolled={scrolled}>
      <NavInner>
        <Logo to="/">Rena Hahn</Logo>

        <NavLinks>
          <NavLink to="/" className={location.pathname === '/' ? '--active' : ''}>
            Home
          </NavLink>
          <NavLink
            to="/work"
            className={location.pathname.startsWith('/work') ? '--active' : ''}
          >
            Work
          </NavLink>
          <NavLink
            to="/resume"
            className={location.pathname === '/resume' ? '--active' : ''}
          >
            Resume
          </NavLink>
        </NavLinks>

        <BurgerButton
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen((prev) => !prev)}
        >
          {[0, 1, 2].map((index) => (
            <BurgerLine key={index} $open={open} $index={index} />
          ))}
        </BurgerButton>
      </NavInner>

      <Overlay $open={open}>
        <OverlayLink to="/">Home</OverlayLink>
        <OverlayLink to="/work">Work</OverlayLink>
        <OverlayLink to="/resume">Resume</OverlayLink>
      </Overlay>
    </NavWrapper>
  );
}

