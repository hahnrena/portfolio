// src/App.js
// App shell and route configuration with simple page fade transitions

import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Work from './pages/Work';
import About from './pages/About';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const AppShell = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.chalkWhite};
  color: ${({ theme }) => theme.colors.espressoBark};
`;

const PageTransition = styled.main`
  animation: ${fadeIn} 400ms ease-out;
`;

const ContentWrapper = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.md}
    ${({ theme }) => theme.spacing.xxl};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-inline: ${({ theme }) => theme.spacing.lg};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-inline: ${({ theme }) => theme.spacing.xl};
  }
`;

function AppRoutes() {
  const location = useLocation();

  return (
    <PageTransition key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<ContentWrapper><Work /></ContentWrapper>} />
        <Route path="/resume" element={<ContentWrapper><About /></ContentWrapper>} />
        <Route path="/work/:slug" element={<ContentWrapper><Work /></ContentWrapper>} />
      </Routes>
    </PageTransition>
  );
}

function App() {
  return (
    <AppShell>
      <Navbar />
      <AppRoutes />
      <Footer />
    </AppShell>
  );
}

export default App;

