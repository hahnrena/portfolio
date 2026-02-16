// src/theme.js
// Design tokens and layout system for the portfolio

export const theme = {
  colors: {
    // Dark
    espressoBark: '#221916',
    oxideUmber: '#352521',
    oxbloodBrick: '#6B2925',
    burntSiennaClay: '#7D432E',

    // Mid
    rustOchre: '#C57457',
    goldenMustard: '#CE9B59',
    dustyApricot: '#D39B70',
    weatheredSand: '#B19475',

    // Light
    linenCream: '#F0E4D6',
    softParchment: '#E6DACB',
    almondWash: '#DFD2BA',
    chalkWhite: '#F7F1EC',
  },
  spacing: {
    xs: '8px',
    sm: '16px',
    md: '24px',
    lg: '40px',
    xl: '64px',
    xxl: '96px',
    xxxl: '128px',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  },
  layout: {
    maxWidth: '1280px',
  },
  typography: {
    fonts: {
      display: "'Cormorant Garamond', serif",
      body: "'DM Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },
  },
  zIndex: {
    cursor: 9999,
    navbar: 100,
    overlayNav: 99,
  },
  transitions: {
    fast: '150ms ease-out',
    base: '250ms ease-out',
    slow: '400ms ease-out',
  },
  shadows: {
    cardSoft: '0 18px 45px rgba(34, 25, 22, 0.18)',
    cardStrong: '0 26px 60px rgba(34, 25, 22, 0.28)',
  },
};

