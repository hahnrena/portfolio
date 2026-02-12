// src/GlobalStyles.js
// Global reset and base typography using styled-components

import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* Google Fonts import */

  /* CSS Reset (simplified) */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    font-family: ${({ theme }) => theme.typography.fonts.body};
    background-color: ${({ theme }) => theme.colors.chalkWhite};
    color: ${({ theme }) => theme.colors.espressoBark};
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  input, button, textarea, select {
    font: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
    position: relative;
    cursor: pointer;
  }

  /* Underline draw animation for text links */
  a::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.rustOchre};
    transform-origin: left;
    transform: scaleX(0);
    transition: transform 220ms ease-out;
  }

  a:hover::after {
    transform-origin: right;
    transform: scaleX(1);
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.typography.fonts.display};
    font-weight: 300;
    color: ${({ theme }) => theme.colors.espressoBark};
  }

  h1 {
    font-family: ${({ theme }) => theme.typography.fonts.display};
    font-weight: 300;
    letter-spacing: 0.06em;
    line-height: 1.05;
    font-size: clamp(3.5rem, 5.2vw, 6rem);
  }

  h2 {
    font-weight: 400;
    font-size: clamp(2.2rem, 3.4vw, 3.5rem);
    line-height: 1.1;
  }

  h3 {
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-weight: 500;
    font-size: 0.95rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  }

  p {
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-weight: 300;
    font-size: 1rem;
    line-height: 1.7;
  }

  /* Utility class for reveal animations (used with useInView hook) */
  .reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
                transform 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .reveal--visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

