// src/pages/Home.jsx
// Home page with hero, selected work strip, and philosophy quote section.

import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useParallax from '../hooks/useParallax';
import useInView from '../hooks/useInView';
import { projects } from '../data/projects';

const heroVideoSrc = `${process.env.PUBLIC_URL}/assets/mixed-media.mp4`;
// Optional poster for faster perceived load: add poster={`${process.env.PUBLIC_URL}/assets/hero-poster.jpg`} to <HeroBgVideo>

const PageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

/* ── HERO (full viewport, scroll-reveal) ───────────────────────── */

const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  height: 100svh;
  overflow: hidden;
  flex-shrink: 0;
`;

const HeroBgVideo = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    to top,
    rgba(34, 25, 22, 0.88) 0%,
    rgba(34, 25, 22, 0.4) 50%,
    transparent 100%
  );
  pointer-events: none;
`;



const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* Reveals on first scroll: glides up from below */
const HeroContentSection = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  transform: translateY(${({ $revealed }) => ($revealed ? '0' : '100%')});
  transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    transform: translateY(0);
  }
`;

/* Text content inside reveal block */
const HeroContent = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xxl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.lg};
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  opacity: ${({ $revealed }) => ($revealed ? 0 : 1)};
  transition: opacity 0.4s ease-out;
  pointer-events: none;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    opacity: 0;
  }
`;

const ScrollIndicatorText = styled.span`
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.linenCream};
  opacity: 0.9;
`;

const HeroEyebrow = styled.h3`
  color: ${({ theme }) => theme.colors.linenCream};
  font-size: 0.9rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.95;
  animation: ${fadeUp} 0.9s ease-out 0.2s both;
`;

const HeroHeadline = styled.h1`
  max-width: 18ch;
  color: ${({ theme }) => theme.colors.chalkWhite};
  text-shadow: 0 2px 24px rgba(0, 0, 0, 0.4);
  animation: ${fadeUp} 0.9s ease-out 0.45s both;
`;

const HeroSubcopy = styled.p`
  max-width: 42rem;
  color: ${({ theme }) => theme.colors.linenCream};
  opacity: 0.9;
  text-shadow: 0 1px 12px rgba(0, 0, 0, 0.3);
  animation: ${fadeUp} 0.9s ease-out 0.65s both;
`;

const HeroMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
  animation: ${fadeUp} 0.9s ease-out 0.85s both;
`;

const MagneticButton = styled.button.attrs(() => ({
  'data-hoverable': true,
}))`
  position: relative;
  align-self: flex-start;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.rustOchre};
  color: ${({ theme }) => theme.colors.chalkWhite};
  overflow: hidden;
  transition: transform 180ms ease-out, box-shadow 220ms ease-out,
    background-color 200ms ease-out;
  box-shadow: 0 12px 32px rgba(197, 116, 87, 0.35);

  &:hover {
    background: ${({ theme }) => theme.colors.burntSiennaClay};
  }

  span {
    font-family: ${({ theme }) => theme.typography.fonts.body};
    font-weight: 400;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-size: 0.83rem;
  }
`;

/* ── MAIN CONTENT (same width/padding as App ContentWrapper) ──── */

const MainContent = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xxl};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-inline: ${({ theme }) => theme.spacing.lg};
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-inline: ${({ theme }) => theme.spacing.xl};
  }
`;

/* ── WORK STRIP ──────────────────────────────────────────────── */

const WorkSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  padding: 0 ${({ theme }) => theme.spacing.lg};
`;

const WorkHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const WorkStrip = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(260px, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  overflow-x: auto;
  padding-bottom: ${({ theme }) => theme.spacing.sm};
`;

const CardShell = styled.article.attrs(() => ({
  'data-hoverable': true,
}))`
  background: ${({ theme }) => theme.colors.softParchment};
  border-radius: 18px;
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.cardSoft};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  transform-style: preserve-3d;
  transform: perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px);
  transition: transform 220ms ease-out, box-shadow 220ms ease-out,
    background-color 220ms ease-out;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.cardStrong};
  }
`;

const CardMedia = styled.div`
  border-radius: 12px;
  height: 180px;
  background: ${({ theme, $tone }) =>
    $tone === 'almondWash'
      ? theme.colors.almondWash
      : $tone === 'softParchment'
      ? theme.colors.softParchment
      : theme.colors.weatheredSand};
`;

const CardTitle = styled.h2`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.espressoBark};
  transition: color 220ms ease-out;

  ${CardShell}:hover & {
    color: ${({ theme }) => theme.colors.rustOchre};
  }
`;

const CardMetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  opacity: 0.8;
`;

const Tag = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-weight: 500;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
`;

/* ── QUOTE ───────────────────────────────────────────────────── */

const QuoteSection = styled.section`
  position: relative;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
  margin-inline: calc(-1 * ${({ theme }) => theme.spacing.md});
  background-color: ${({ theme }) => theme.colors.oxideUmber};
  color: ${({ theme }) => theme.colors.linenCream};
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-inline: calc(-1 * ${({ theme }) => theme.spacing.lg});
  }
`;

const QuoteBackground = styled.div`
  position: absolute;
  inset: -40%;
  background: radial-gradient(
    circle at top,
    rgba(206, 155, 89, 0.16),
    transparent
  );
  transform: translateY(${({ $offset }) => $offset}px);
  transition: transform 80ms linear;
`;

const QuoteInner = styled.div`
  position: relative;
  max-width: 780px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Rule = styled.hr`
  border: none;
  height: 1px;
  width: 120px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.rustOchre};
`;

const QuoteText = styled.h2`
  color: ${({ theme }) => theme.colors.linenCream};
  font-weight: 300;
`;

/* ── COMPONENT ───────────────────────────────────────────────── */

export default function Home() {
  const navigate = useNavigate();
  const quoteOffset = useParallax(0.15);
  const sentinelRef = useRef(null);
  const [revealed, setRevealed] = useState(true);

  const { ref: workRef, inView: workInView } = useInView();

  // Respect prefers-reduced-motion: show content immediately, no scroll-reveal
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) setRevealed(true);
  }, []);

  // On first scroll: reveal hero content (single IO, no per-frame scroll listener)
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting) setRevealed(true);
      },
      { threshold: 0, rootMargin: '0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleMagneticMove = useCallback((event) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    const max = 8;
    const dx = Math.max(Math.min(x / 10, max), -max);
    const dy = Math.max(Math.min(y / 10, max), -max);
    target.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
  }, []);

  const resetMagnetic = useCallback((event) => {
    event.currentTarget.style.transform = 'translate3d(0px, 0px, 0)';
  }, []);

  const handleCardTilt = (event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6 * -1;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * 6;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  };

  const resetCardTilt = (event) => {
    event.currentTarget.style.transform =
      'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return (
    <PageWrapper>
      {/* Sentinel: when this leaves viewport (user scrolls), hero content reveals */}
      <div ref={sentinelRef} aria-hidden style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 1, pointerEvents: 'none' }} />

      {/* ── HERO (fullscreen video, content reveals on first scroll) ── */}
      <HeroSection>
        <HeroBgVideo
          src={heroVideoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Background video"
        />
        <HeroOverlay />
        <HeroContentSection $revealed={revealed}>
          <HeroContent>
            <HeroEyebrow>Product Design</HeroEyebrow>
            <HeroHeadline>
              Designing for the space between intention and experience.
            </HeroHeadline>
            <HeroSubcopy>
              I bridge engineering, interaction, and visual systems to craft products that feel quietly 
              inevitable - familiar yet new, nostalgic yet precise.
            </HeroSubcopy>
            <HeroMeta>
              <MagneticButton
                onMouseMove={handleMagneticMove}
                onMouseLeave={resetMagnetic}
                onClick={() => navigate('/work')}
              >
                <span>Browse Selected Work</span>
              </MagneticButton>
            </HeroMeta>
          </HeroContent>
        </HeroContentSection>
        <ScrollIndicator $revealed={revealed}>
          <ScrollIndicatorText>Scroll</ScrollIndicatorText>
        </ScrollIndicator>
      </HeroSection>

      {/* ── MAIN CONTENT (work + quote, same width as other pages) ── */}
      <MainContent>
        <WorkSection ref={workRef}>
        <WorkHeader>
          <div>
            <h3>Selected Work</h3>
            <p>A few case studies spanning product, UX, and visual systems.</p>
          </div>
        </WorkHeader>
        <WorkStrip>
          {projects.slice(0, 3).map((project, index) => (
            <CardShell
              key={project.id}
              className={`reveal ${workInView ? 'reveal--visible' : ''}`}
              style={{ transitionDelay: workInView ? `${index * 150}ms` : '0ms' }}
              onMouseMove={handleCardTilt}
              onMouseLeave={resetCardTilt}
              onClick={() => navigate(`/work/${project.slug}`)}
            >
              <CardMedia $tone={project.coverColor} />
              <div>
                <CardTitle>{project.title}</CardTitle>
                <Tag>{project.category}</Tag>
              </div>
              <CardMetaRow>
                <span>{project.year}</span>
                <span>{project.shortDesc}</span>
              </CardMetaRow>
            </CardShell>
          ))}
        </WorkStrip>
      </WorkSection>

        {/* ── QUOTE ── */}
        <QuoteSection>
          <QuoteBackground $offset={quoteOffset} />
          <QuoteInner>
            <Rule />
            <QuoteText>
              &ldquo;My work lives in the quiet hinge moments—the small decisions that make
              a product feel like it was always meant to be there.&rdquo;
            </QuoteText>
            <Rule />
          </QuoteInner>
        </QuoteSection>
      </MainContent>
    </PageWrapper>
  );
}