// Syncaila Redesign - Full case study with styles and mockups from original HTML
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import useParallax from '../hooks/useParallax';

// ——— Layout (match Work.jsx Promotions/Search Availability header) ———
const PageWrap = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  background: ${({ theme }) => theme.colors.chalkWhite};
  color: ${({ theme }) => theme.colors.espressoBark};
  line-height: 1.7;
  padding-top: ${({ theme }) => theme.spacing.xxxl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xxl};
`;

const BackLink = styled.button`
  font-size: 0.85rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  padding: 0;
  text-align: left;
  &:hover { opacity: 0.8; }
`;

const DetailHero = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.almondWash};
  transform: translateY(${({ $offset }) => $offset}px);
  height: 340px;
`;

const DetailHeroImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DetailHeroInner = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) =>
    `linear-gradient(135deg, ${theme.colors.rustOchre}, ${theme.colors.goldenMustard})`};
  opacity: ${({ $hasImage }) => ($hasImage ? 0.25 : 0.7)};
  pointer-events: none;
`;

const Overview = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-top: ${({ theme }) => theme.spacing.lg};
  white-space: pre-line;
  color: ${({ theme }) => theme.colors.espressoBark};
`;

const DetailStatsStrip = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.rustOchre};
  border-top: 1px solid ${({ theme }) => theme.colors.rustOchre};
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 0.9rem;
`;

const StatLabel = styled.span`
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  opacity: 0.7;
`;

const StatValue = styled.span`
  font-weight: 400;
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  }
`;

const Section = styled.section`
  margin-bottom: 80px;
`;

const H2 = styled.h2`
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.espressoBark};
  border-bottom: 4px solid ${({ theme }) => theme.colors.rustOchre};
  padding-bottom: 12px;
  display: inline-block;
`;

const H3 = styled.h3`
  font-size: 1.6rem;
  margin: 40px 0 16px 0;
  color: ${({ theme }) => theme.colors.oxideUmber};
  &:first-child { margin-top: 0; }
`;

const P = styled.p`
  margin-bottom: 20px;
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.oxideUmber};
`;

// ——— Highlight & Quote ———
const HighlightBox = styled.div`
  background: ${({ theme }) => theme.colors.almondWash};
  border-left: 4px solid ${({ theme }) => theme.colors.rustOchre};
  padding: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.lg} 0;
  border-radius: 8px;
  h3 { margin-top: 0; color: ${({ theme }) => theme.colors.oxbloodBrick}; }
`;

const QuoteBox = styled.div`
  background: ${({ theme }) => theme.colors.linenCream};
  border-left: 4px solid ${({ theme }) => theme.colors.goldenMustard};
  padding: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.md} 0;
  border-radius: 8px;
  font-style: italic;
`;

const QuoteText = styled.div`
  font-size: 1.15rem;
  color: ${({ theme }) => theme.colors.burntSiennaClay};
  margin-bottom: 8px;
`;

const QuoteAttribution = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.weatheredSand};
  font-style: normal;
`;

// ——— Insight cards ———
const InsightGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;

const InsightCard = styled.div`
  background: ${({ theme }) => theme.colors.chalkWhite};
  border: 2px solid ${({ theme }) => theme.colors.weatheredSand};
  border-radius: 12px;
  padding: ${({ theme }) => theme.spacing.md};
  transition: all 0.3s;
  &:hover {
    border-color: ${({ theme }) => theme.colors.rustOchre};
    box-shadow: ${({ theme }) => theme.shadows.cardSoft};
    transform: translateY(-2px);
  }
`;

const InsightTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.oxbloodBrick};
  margin-bottom: 12px;
`;

// ——— Principles ———
const PrinciplesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;

const Principle = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.linenCream} 0%, ${({ theme }) => theme.colors.almondWash} 100%);
  padding: 20px;
  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.colors.rustOchre};
`;

const PrincipleText = styled.div`
  color: ${({ theme }) => theme.colors.oxbloodBrick};
  font-weight: 500;
  font-size: 1rem;
`;

// ——— Solution blocks ———
const SolutionBlock = styled.div`
  background: ${({ theme }) => theme.colors.chalkWhite};
  border: 2px solid ${({ theme }) => theme.colors.weatheredSand};
  border-radius: 12px;
  padding: ${({ theme }) => theme.spacing.lg};
  margin: ${({ theme }) => theme.spacing.lg} 0;
  box-shadow: ${({ theme }) => theme.shadows.cardSoft};
`;

const SolutionTitle = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.rustOchre};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-weight: 600;
`;

const SolutionDescription = styled.div`
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.weatheredSand};
  line-height: 1.7;
  p { margin-bottom: 16px; }
  ul { margin-left: 24px; margin-bottom: 16px; }
  li { margin-bottom: 8px; }
`;

// ——— Mockups ———
const MockupContainer = styled.div`
  margin: 48px 0;
  text-align: center;
`;

const MockupLabel = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.weatheredSand};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

/* Mockups: original blue/slate palette */
const Mockup = styled.div`
  background: #1e293b;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0,0,0,0.15);
  margin: 0 auto 24px auto;
  max-width: 1100px;
`;

const WindowChrome = styled.div`
  background: #0f172a;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid #334155;
`;

const WindowDot = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  &.red { background: #ef4444; }
  &.yellow { background: #f59e0b; }
  &.green { background: #10b981; }
`;

const WindowTitle = styled.span`
  color: #94a3b8;
  font-size: 0.85rem;
  margin-left: 12px;
`;

const NavBar = styled.div`
  background: #0f172a;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #334155;
`;

const NavLogo = styled.div`
  color: white;
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: -0.5px;
`;

const NavItems = styled.div`
  display: flex;
  gap: 8px;
`;

const NavItem = styled.span`
  padding: 8px 20px;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #94a3b8;
  &.active {
    background: #2563eb;
    color: white;
  }
`;

const Content = styled.div`
  background: #1e293b;
  padding: 32px;
  min-height: 200px;
`;

const MockupDescription = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.weatheredSand};
  max-width: 800px;
  margin: 16px auto 0 auto;
  text-align: center;
`;

// Import view
const DropZone = styled.div`
  border: 2px dashed #475569;
  border-radius: 12px;
  padding: 80px 40px;
  text-align: center;
  background: #334155;
`;

const DropIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 16px;
  opacity: 0.5;
`;

const DropTitle = styled.div`
  color: white;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 8px;
`;

const DropSubtitle = styled.div`
  color: #94a3b8;
  font-size: 0.95rem;
`;

const SupportedFormats = styled.div`
  color: #64748b;
  font-size: 0.85rem;
  margin-top: 12px;
`;

const RecentProjects = styled.div`
  margin-top: 40px;
`;

const RecentHeader = styled.div`
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 16px;
`;

const ProjectCard = styled.div`
  background: #334155;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

const ProjectInfo = styled.div`
  flex: 1;
  min-width: 250px;
`;

const ProjectName = styled.div`
  color: white;
  font-weight: 600;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ProjectMeta = styled.div`
  color: #94a3b8;
  font-size: 0.85rem;
`;

const OpenButton = styled.span`
  background: #2563eb;
  color: white;
  padding: 8px 20px;
  border-radius: 6px;
  font-weight: 500;
  display: inline-block;
`;

// Progress view
const ProgressContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const StageHeader = styled.div`
  color: #cbd5e1;
  font-size: 0.95rem;
  margin-bottom: 8px;
`;

const StageTitle = styled.div`
  color: white;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 16px;
`;

const ProgressBarContainer = styled.div`
  background: #334155;
  height: 12px;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 12px;
`;

const ProgressBarFill = styled.div`
  background: linear-gradient(90deg, #2563eb 0%, #3b82f6 100%);
  height: 100%;
  border-radius: 6px;
  width: ${({ $width }) => $width || '63%'};
`;

const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  color: #94a3b8;
  font-size: 0.85rem;
  margin-bottom: 32px;
`;

const ProcessingCard = styled.div`
  background: #334155;
  border-radius: 10px;
  padding: 24px;
  margin-bottom: 24px;
  border: 1px solid #475569;
`;

const ProcessingHeader = styled.div`
  color: #cbd5e1;
  font-size: 0.9rem;
  margin-bottom: 16px;
  font-weight: 500;
`;

const ClipProcessing = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const ClipThumb = styled.div`
  width: 120px;
  height: 68px;
  background: linear-gradient(135deg, #64748b 0%, #475569 100%);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cbd5e1;
  font-size: 2rem;
`;

const ClipDetails = styled.div`
  flex: 1;
`;

const ClipName = styled.div`
  color: white;
  font-weight: 600;
  margin-bottom: 8px;
`;

const Waveform = styled.div`
  height: 40px;
  background: #1e293b;
  border-radius: 4px;
  padding: 8px;
  margin: 8px 0;
  display: flex;
  align-items: flex-end;
  gap: 2px;
`;

const WaveformBar = styled.span`
  flex: 1;
  background: #3b82f6;
  border-radius: 1px;
  min-height: 4px;
  height: ${({ $h }) => $h || '40%'};
`;

const ClipMeta = styled.div`
  color: #94a3b8;
  font-size: 0.85rem;
  margin-top: 4px;
`;

const ConfidenceBadge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  background: #10b981;
  color: white;
  margin-left: 8px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 24px;
`;

const StatCard = styled.div`
  background: #1e293b;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #334155;
  text-align: center;
`;

const ProgressStatValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  margin-bottom: 4px;
  &.green { color: #10b981; }
  &.yellow { color: #f59e0b; }
  &.red { color: #ef4444; }
`;

const ProgressStatLabel = styled.div`
  color: #94a3b8;
  font-size: 0.85rem;
`;

// Dashboard view
const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`;

const DashboardTitle = styled.div`
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
`;

const ExportButton = styled.span`
  background: #2563eb;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  display: inline-block;
`;

const SummaryPanel = styled.div`
  background: #334155;
  border-radius: 10px;
  padding: 24px;
  margin-bottom: 24px;
`;

const SummaryStats = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
  flex-wrap: wrap;
`;

const SummaryStat = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SummaryIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  &.green { background: rgba(16, 185, 129, 0.2); }
  &.yellow { background: rgba(245, 158, 11, 0.2); }
  &.red { background: rgba(239, 68, 68, 0.2); }
`;

const SummaryText = styled.div`
  flex: 1;
`;

const SummaryNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 4px;
`;

const SummaryLabel = styled.div`
  color: #94a3b8;
  font-size: 0.85rem;
`;

const FilterTabs = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #334155;
  flex-wrap: wrap;
`;

const FilterTab = styled.span`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #94a3b8;
  border: 1px solid #334155;
  &.active {
    background: #2563eb;
    color: white;
    border-color: #2563eb;
  }
`;

const ClipRow = styled.div`
  display: grid;
  grid-template-columns: 60px 2fr 100px 120px 120px 100px;
  gap: 16px;
  padding: 16px;
  background: ${({ $warning }) =>
    $warning === 'yellow'
      ? 'rgba(245, 158, 11, 0.1)'
      : $warning === 'red'
      ? 'rgba(239, 68, 68, 0.1)'
      : '#334155'};
  border-radius: 8px;
  margin-bottom: 8px;
  align-items: center;
  @media (max-width: 900px) {
    grid-template-columns: 60px 1fr;
    & > *:nth-child(n+3) { grid-column: 1 / -1; }
  }
`;

const ClipThumbnail = styled.div`
  width: 60px;
  height: 34px;
  background: linear-gradient(135deg, #64748b 0%, #475569 100%);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cbd5e1;
  font-size: 1.2rem;
`;

const ClipInfo = styled.div`
  color: white;
  font-size: 0.95rem;
`;

const ClipSubtext = styled.div`
  color: #94a3b8;
  font-size: 0.8rem;
  margin-top: 2px;
`;

const TrackBadge = styled.span`
  background: #1e293b;
  color: #94a3b8;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  text-align: center;
`;

const Timecode = styled.span`
  font-family: 'Courier New', monospace;
  color: #cbd5e1;
  font-size: 0.85rem;
`;

const ConfidenceIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ConfidenceDot = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  &.success { background: #10b981; }
  &.warning { background: #f59e0b; }
  &.error { background: #ef4444; }
`;

const ConfidenceText = styled.span`
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
`;

const ActionLink = styled.span`
  color: #3b82f6;
  font-size: 0.85rem;
  font-weight: 500;
`;

// Timeline preview
const TimelinePreview = styled.div`
  background: #0f172a;
  border-radius: 10px;
  padding: 24px;
  margin-top: 24px;
`;

const PreviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 16px;
`;

const PreviewTitle = styled.div`
  color: #cbd5e1;
  font-size: 0.9rem;
  font-weight: 500;
`;

const PlayButton = styled.span`
  background: #2563eb;
  color: white;
  padding: 8px 20px;
  border-radius: 6px;
  font-size: 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const TimelineTracks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
`;

const Track = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TrackLabel = styled.div`
  width: 60px;
  color: #94a3b8;
  font-size: 0.85rem;
  font-weight: 500;
`;

const TrackContent = styled.div`
  flex: 1;
  height: 40px;
  background: #1e293b;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
`;

const ClipBlock = styled.span`
  position: absolute;
  height: 100%;
  background: ${({ $variant }) =>
    $variant === 'warning'
      ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
      : $variant === 'muted'
      ? 'linear-gradient(135deg, #64748b 0%, #475569 100%)'
      : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'};
  border-radius: 3px;
  border: 1px solid #60a5fa;
  display: flex;
  align-items: center;
  padding: 0 8px;
  color: white;
  font-size: 0.75rem;
  overflow: hidden;
  white-space: nowrap;
  left: ${({ $left }) => $left || '0%'};
  width: ${({ $width }) => $width || '35%'};
`;

const AudioTrack = styled(TrackContent)`
  height: 30px;
`;

const AudioWaveform = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  display: flex;
  align-items: flex-end;
  gap: 1px;
  padding: 4px;
`;

const AudioBar = styled.span`
  flex: 1;
  background: #3b82f6;
  border-radius: 1px;
  height: ${({ $h }) => $h || '50%'};
`;

// Iteration cards
const IterationCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;

const IterationCard = styled.div`
  background: ${({ theme }) => theme.colors.linenCream};
  border: 2px solid ${({ theme }) => theme.colors.goldenMustard};
  border-radius: 12px;
  padding: ${({ theme }) => theme.spacing.md};
`;

const IterationNumber = styled.div`
  background: ${({ theme }) => theme.colors.goldenMustard};
  color: ${({ theme }) => theme.colors.espressoBark};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  margin-bottom: 12px;
`;

const IterationTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.burntSiennaClay};
  margin-bottom: 12px;
`;

const IterationText = styled.div`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.weatheredSand};
  line-height: 1.6;
  p { margin-bottom: 12px; }
`;

// Outcome metrics
const OutcomeMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;

const MetricCard = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.linenCream} 0%, ${({ theme }) => theme.colors.almondWash} 100%);
  border: 2px solid ${({ theme }) => theme.colors.rustOchre};
  border-radius: 12px;
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

const MetricValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.oxbloodBrick};
  margin-bottom: 8px;
`;

const MetricLabel = styled.div`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.rustOchre};
  font-weight: 500;
`;

// Next steps
const NextStepsList = styled.div`
  background: ${({ theme }) => theme.colors.chalkWhite};
  border: 2px solid ${({ theme }) => theme.colors.weatheredSand};
  border-radius: 12px;
  padding: ${({ theme }) => theme.spacing.lg};
  margin: ${({ theme }) => theme.spacing.lg} 0;
  ul { list-style: none; padding: 0; }
  li {
    padding: ${({ theme }) => theme.spacing.sm};
    margin-bottom: 12px;
    background: ${({ theme }) => theme.colors.softParchment};
    border-left: 4px solid ${({ theme }) => theme.colors.rustOchre};
    border-radius: 6px;
    font-size: 1.05rem;
    color: ${({ theme }) => theme.colors.oxideUmber};
  }
  li::before {
    content: "→";
    color: ${({ theme }) => theme.colors.rustOchre};
    font-weight: bold;
    margin-right: 12px;
  }
`;

// Reflection
const ReflectionBox = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.linenCream} 0%, ${({ theme }) => theme.colors.almondWash} 100%);
  border: 2px solid ${({ theme }) => theme.colors.rustOchre};
  border-radius: 12px;
  padding: ${({ theme }) => theme.spacing.lg};
  margin: ${({ theme }) => theme.spacing.lg} 0;
  h3 { color: ${({ theme }) => theme.colors.oxbloodBrick}; margin-top: 0; }
  p { color: ${({ theme }) => theme.colors.oxideUmber}; }
`;

// Tags & Disclaimer
const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.colors.almondWash};
  color: ${({ theme }) => theme.colors.oxbloodBrick};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
`;

const Disclaimer = styled.div`
  background: ${({ theme }) => theme.colors.linenCream};
  border: 2px solid ${({ theme }) => theme.colors.goldenMustard};
  border-radius: 12px;
  padding: ${({ theme }) => theme.spacing.md};
  margin: 40px 0;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.burntSiennaClay};
  font-style: italic;
`;

export default function SyncailaCaseStudy({ project }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const heroOffset = useParallax(0.18);
  const coverImage = project?.coverImage;

  return (
    <PageWrap>
      <BackLink type="button" onClick={() => navigate('/work')}>
        ← Back to all work
      </BackLink>

      <DetailHero $offset={heroOffset}>
        {coverImage && (
          <DetailHeroImage src={coverImage} alt={project?.title ?? 'Syncaila'} />
        )}
        <DetailHeroInner $hasImage={Boolean(coverImage)} />
      </DetailHero>

      <Overview>
        A comprehensive, conceptual redesign of Syncaila's multi-camera synchronization workflow, transforming a technical utility into an intuitive, production-grade tool that empowers editors to sync complex projects with confidence and speed.
      </Overview>

      <DetailStatsStrip>
        <StatItem>
          <StatLabel>Role</StatLabel>
          <StatValue>UX Designer</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>Year</StatLabel>
          <StatValue>2025</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>Platform</StatLabel>
          <StatValue>Desktop (macOS/Windows)</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>Timeline</StatLabel>
          <StatValue>1 week</StatValue>
        </StatItem>
      </DetailStatsStrip>

      <Container>
        {/* Overview */}
        <Section>
          <H2>Overview</H2>
          <P>
            Syncaila is a professional synchronization tool that automatically syncs audio and video footage from multiple cameras and recorders—a critical step in multi-camera post-production workflows. While the tool delivers powerful technical capabilities (syncing multi-hour timelines with 10+ camera angles in minutes), its interface hasn't evolved to match the sophistication of modern NLEs (non-linear editors) or the expectations of professional editors working under tight deadlines.
          </P>
          <P>
            This redesign addresses fundamental UX gaps in the current product while respecting the workflows of documentary filmmakers, live event producers, and corporate video teams who depend on Syncaila daily.
          </P>
          <HighlightBox>
            <H3>The Opportunity</H3>
            <P>
              Syncaila competes with PluralEyes (owned by Maxon) and built-in sync features in Premiere Pro, DaVinci Resolve, and Final Cut Pro. While Syncaila's sync accuracy often outperforms competitors—especially on challenging audio (crowd noise, wind-damaged sound, long-form shoots)—the interface creates friction that undermines this technical advantage.
            </P>
            <P>Through comparative analysis and workflow research, I identified three core problems:</P>
            <ul style={{ marginLeft: 24, color: theme.colors.oxideUmber }}>
              <li style={{ marginBottom: 8 }}><strong>Opaque Processing:</strong> Editors have no visibility into what Syncaila is doing during sync, leading to anxiety on long jobs</li>
              <li style={{ marginBottom: 8 }}><strong>Limited Feedback:</strong> When sync fails or produces unexpected results, there's minimal diagnostic information</li>
              <li style={{ marginBottom: 8 }}><strong>Disconnected Workflow:</strong> The import → sync → export pattern feels like leaving your NLE, not extending it</li>
            </ul>
          </HighlightBox>
          <H3>My Role</H3>
          <P>
            I led the end-to-end redesign process, from competitive research and user interviews through high-fidelity prototyping and motion design. I conducted workflow analysis with professional editors across documentary, live events, and commercial production, prototyped interaction patterns for timeline-based tools, and designed a comprehensive component system optimized for technical interfaces.
          </P>
          <P>
            This project gave me the opportunity to leverage my video production background—I've worked on multi-camera shoots ranging from corporate panels to live concerts, and I've experienced firsthand the pain points that arise when sync fails during a deadline crunch.
          </P>
        </Section>

        {/* Research */}
        <Section>
          <H2>Understanding the Users</H2>
          <P>Syncaila serves three primary user archetypes, each with distinct needs and pain points:</P>
          <InsightGrid>
            <InsightCard>
              <InsightTitle>🎬 Documentary Editors</InsightTitle>
              <p style={{ color: theme.colors.weatheredSand, marginBottom: 8 }}><strong>Work with:</strong> 4-8 hour interview shoots, multiple cameras, separate audio recorders</p>
              <p style={{ color: theme.colors.weatheredSand, marginBottom: 8 }}><strong>Need:</strong> Reliable sync across long timelines with challenging audio</p>
              <p style={{ color: theme.colors.oxbloodBrick, fontWeight: 500 }}><strong>Pain:</strong> Can't afford to babysit a 30-minute sync process</p>
            </InsightCard>
            <InsightCard>
              <InsightTitle>🎥 Live Event Producers</InsightTitle>
              <p style={{ color: theme.colors.weatheredSand, marginBottom: 8 }}><strong>Work with:</strong> Multi-camera coverage of conferences, concerts, sports (6-12+ cameras)</p>
              <p style={{ color: theme.colors.weatheredSand, marginBottom: 8 }}><strong>Need:</strong> Fast turnaround, batch processing, consistent results</p>
              <p style={{ color: theme.colors.oxbloodBrick, fontWeight: 500 }}><strong>Pain:</strong> Tight deadlines mean no time to manually fix sync issues</p>
            </InsightCard>
            <InsightCard>
              <InsightTitle>💼 Corporate Video Teams</InsightTitle>
              <p style={{ color: theme.colors.weatheredSand, marginBottom: 8 }}><strong>Work with:</strong> Interview series, marketing content, product launches</p>
              <p style={{ color: theme.colors.weatheredSand, marginBottom: 8 }}><strong>Need:</strong> Simple, repeatable workflow; sync accuracy on talking-head content</p>
              <p style={{ color: theme.colors.oxbloodBrick, fontWeight: 500 }}><strong>Pain:</strong> Limited technical expertise; need clear guidance when things go wrong</p>
            </InsightCard>
          </InsightGrid>
          <H3>Research Approach</H3>
          <P>
            I conducted <strong>8 in-depth interviews</strong> with editors across these segments, focusing on current sync workflows, Syncaila usage patterns and pain points, NLE preferences and mental models, and critical moments where sync quality matters most.
          </P>
          <P>
            I also analyzed <strong>ProVideo Coalition reviews</strong>, <strong>Reddit discussions</strong> (r/editors, r/videography), and direct support threads on Syncaila's website to identify recurring issues.
          </P>
          <H3>Key Insights</H3>
          <QuoteBox>
            <QuoteText>"I hit sync and walk away. When I come back, sometimes it's perfect, sometimes it's a mess. I have no idea why."</QuoteText>
            <QuoteAttribution>— Documentary editor, 12 years experience</QuoteAttribution>
          </QuoteBox>
          <P style={{ marginBottom: 32 }}>
            <strong>Insight #1: Trust is Earned Through Transparency</strong><br />
            Editors working on deadline need to <em>understand</em> what's happening during sync. The current black-box approach creates anxiety and erodes trust, especially when processing 2+ hour timelines.
          </P>
          <QuoteBox>
            <QuoteText>"Sure, it's fast. But if I spend 10 minutes syncing and then 45 minutes fixing mistakes, did it actually save me time?"</QuoteText>
            <QuoteAttribution>— Live events producer</QuoteAttribution>
          </QuoteBox>
          <P style={{ marginBottom: 32 }}>
            <strong>Insight #2: Time Saved ≠ Value Delivered</strong><br />
            Speed alone doesn't justify the tool—accuracy and transparency determine whether editors trust the output enough to use it in professional work.
          </P>
          <QuoteBox>
            <QuoteText>"Every time I export XML from Premiere, I'm nervous something will break. And when I import it back, I have to check every clip. It feels risky."</QuoteText>
            <QuoteAttribution>— Corporate video editor</QuoteAttribution>
          </QuoteBox>
          <P style={{ marginBottom: 32 }}>
            <strong>Insight #3: XML Round-Tripping Breaks Mental Models</strong><br />
            The export → process → import workflow forces editors to leave their familiar environment. This context switch introduces cognitive load and anxiety about data integrity.
          </P>
          <QuoteBox>
            <QuoteText>"I don't need to know the math. I need to know which clips synced well and which ones need my attention."</QuoteText>
            <QuoteAttribution>— Multicam specialist</QuoteAttribution>
          </QuoteBox>
          <P style={{ marginBottom: 32 }}>
            <strong>Insight #4: Editors Think in Clips, Not Algorithms</strong><br />
            Technical jargon (waveform analysis, FFT matching) doesn't help editors make decisions. They need to see <em>results</em> contextualized within their project structure.
          </P>
        </Section>

        {/* Design Principles */}
        <Section>
          <H2>Design Principles</H2>
          <P>Based on research findings and product strategy, I established four guiding principles:</P>
          <PrinciplesList>
            <Principle>
              <PrincipleText><strong>Transparency Builds Trust</strong> — Show the user what's happening at every stage</PrincipleText>
            </Principle>
            <Principle>
              <PrincipleText><strong>Optimize for the 95% Case, Support the 5%</strong> — Most syncs should be one-click simple</PrincipleText>
            </Principle>
            <Principle>
              <PrincipleText><strong>Speak the Language of Editors</strong> — Avoid technical jargon in favor of production terminology</PrincipleText>
            </Principle>
            <Principle>
              <PrincipleText><strong>Reduce Anxiety in the Round-Trip</strong> — Make XML export/import feel safe and reversible</PrincipleText>
            </Principle>
          </PrinciplesList>
        </Section>

        {/* Visual Mockups */}
        <Section>
          <H2>Visual Design Solutions</H2>
          <P style={{ marginBottom: 48 }}>
            I designed three primary interface views that address the core problems identified in research. Each view prioritizes transparency, builds trust through clear feedback, and respects the workflows of professional editors.
          </P>

          {/* Mockup 1: Import View */}
          <MockupContainer>
            <MockupLabel>Screen 1: Import View - Entry Point</MockupLabel>
            <Mockup>
              <WindowChrome>
                <WindowDot className="red" />
                <WindowDot className="yellow" />
                <WindowDot className="green" />
                <WindowTitle>Syncaila</WindowTitle>
              </WindowChrome>
              <NavBar>
                <NavLogo>Syncaila</NavLogo>
                <NavItems>
                  <NavItem>Settings</NavItem>
                  <NavItem>Help</NavItem>
                </NavItems>
              </NavBar>
              <Content>
                <DropZone>
                  <DropIcon>📁</DropIcon>
                  <DropTitle>Drop XML File Here</DropTitle>
                  <DropSubtitle>or click to browse</DropSubtitle>
                  <SupportedFormats>Supports: Premiere Pro · Final Cut Pro · DaVinci Resolve · EDIUS</SupportedFormats>
                </DropZone>
                <RecentProjects>
                  <RecentHeader>Recent Projects</RecentHeader>
                  <ProjectCard>
                    <ProjectInfo>
                      <ProjectName>📄 Conference_Day1.xml</ProjectName>
                      <ProjectMeta>47 clips · 2.3 hrs · Last synced 2 days ago</ProjectMeta>
                    </ProjectInfo>
                    <OpenButton>Open</OpenButton>
                  </ProjectCard>
                  <ProjectCard>
                    <ProjectInfo>
                      <ProjectName>📄 Interview_Series_Ep3.xml</ProjectName>
                      <ProjectMeta>12 clips · 45 min · Last synced 1 week ago</ProjectMeta>
                    </ProjectInfo>
                    <OpenButton>Open</OpenButton>
                  </ProjectCard>
                  <ProjectCard>
                    <ProjectInfo>
                      <ProjectName>📄 LiveConcert_MultiCam.xml</ProjectName>
                      <ProjectMeta>8 clips · 1.8 hrs · Last synced 2 weeks ago</ProjectMeta>
                    </ProjectInfo>
                    <OpenButton>Open</OpenButton>
                  </ProjectCard>
                </RecentProjects>
              </Content>
            </Mockup>
            <MockupDescription>
              Familiar drag-and-drop import with recent projects for quick access. Clear NLE compatibility shown upfront.
            </MockupDescription>
          </MockupContainer>

          {/* Mockup 2: Sync Progress */}
          <MockupContainer>
            <MockupLabel>Screen 2: Sync Progress - Real-Time Transparency</MockupLabel>
            <Mockup>
              <WindowChrome>
                <WindowDot className="red" />
                <WindowDot className="yellow" />
                <WindowDot className="green" />
                <WindowTitle>Conference_Day1.xml - Syncing</WindowTitle>
              </WindowChrome>
              <NavBar>
                <NavLogo>Syncaila</NavLogo>
                <NavItems>
                  <NavItem>⏸ Pause</NavItem>
                  <NavItem>✕ Cancel</NavItem>
                </NavItems>
              </NavBar>
              <Content>
                <ProgressContainer>
                  <StageHeader>Stage 2 of 3</StageHeader>
                  <StageTitle>Analyzing Audio Patterns</StageTitle>
                  <ProgressBarContainer>
                    <ProgressBarFill $width="63%" />
                  </ProgressBarContainer>
                  <ProgressInfo>
                    <span>63% Complete</span>
                    <span>Estimated time remaining: 4 min 20 sec</span>
                  </ProgressInfo>
                  <ProcessingCard>
                    <ProcessingHeader>Currently Processing:</ProcessingHeader>
                    <ClipProcessing>
                      <ClipThumb>🎥</ClipThumb>
                      <ClipDetails>
                        <ClipName>
                          Cam_A_001.mov
                          <ConfidenceBadge>87% ✓</ConfidenceBadge>
                        </ClipName>
                        <Waveform>
                          <WaveformBar $h="40%" />
                          <WaveformBar $h="70%" />
                          <WaveformBar $h="90%" />
                          <WaveformBar $h="60%" />
                          <WaveformBar $h="45%" />
                          <WaveformBar $h="80%" />
                          <WaveformBar $h="95%" />
                          <WaveformBar $h="75%" />
                          <WaveformBar $h="50%" />
                          <WaveformBar $h="65%" />
                        </Waveform>
                        <ClipMeta>Matching against: Cam_B_002, Recorder_1</ClipMeta>
                      </ClipDetails>
                    </ClipProcessing>
                  </ProcessingCard>
                  <StatsGrid>
                    <StatCard>
                      <ProgressStatValue className="green">24</ProgressStatValue>
                      <ProgressStatLabel>High Confidence</ProgressStatLabel>
                    </StatCard>
                    <StatCard>
                      <ProgressStatValue className="yellow">4</ProgressStatValue>
                      <ProgressStatLabel>Medium Confidence</ProgressStatLabel>
                    </StatCard>
                    <StatCard>
                      <ProgressStatValue className="red">1</ProgressStatValue>
                      <ProgressStatLabel>Need Review</ProgressStatLabel>
                    </StatCard>
                  </StatsGrid>
                  <div style={{ textAlign: 'center', marginTop: 24, color: '#94a3b8', fontSize: '0.85rem' }}>
                    Completed Clips: 29/47 · Processing normally · Last update: 2 seconds ago
                  </div>
                </ProgressContainer>
              </Content>
            </Mockup>
            <MockupDescription>
              Multi-stage progress visualization shows exactly what Syncaila is doing. Real-time waveform analysis and confidence scores build trust during long syncs.
            </MockupDescription>
          </MockupContainer>

          {/* Mockup 3: Review Dashboard */}
          <MockupContainer>
            <MockupLabel>Screen 3: Review Dashboard - Clip Confidence &amp; Action</MockupLabel>
            <Mockup>
              <WindowChrome>
                <WindowDot className="red" />
                <WindowDot className="yellow" />
                <WindowDot className="green" />
                <WindowTitle>Conference_Day1.xml - Sync Complete</WindowTitle>
              </WindowChrome>
              <NavBar>
                <NavLogo>Syncaila</NavLogo>
                <NavItems>
                  <NavItem>Settings</NavItem>
                  <NavItem>Help</NavItem>
                </NavItems>
              </NavBar>
              <Content>
                <DashboardHeader>
                  <DashboardTitle>Conference_Day1 - Sync Complete</DashboardTitle>
                  <ExportButton>Export XML</ExportButton>
                </DashboardHeader>
                <SummaryPanel>
                  <SummaryStats>
                    <SummaryStat>
                      <SummaryIcon className="green">✓</SummaryIcon>
                      <SummaryText>
                        <SummaryNumber style={{ color: '#10b981' }}>42/47</SummaryNumber>
                        <SummaryLabel>High Confidence</SummaryLabel>
                      </SummaryText>
                    </SummaryStat>
                    <SummaryStat>
                      <SummaryIcon className="yellow">⚠</SummaryIcon>
                      <SummaryText>
                        <SummaryNumber style={{ color: '#f59e0b' }}>4</SummaryNumber>
                        <SummaryLabel>Need Review</SummaryLabel>
                      </SummaryText>
                    </SummaryStat>
                    <SummaryStat>
                      <SummaryIcon className="red">✗</SummaryIcon>
                      <SummaryText>
                        <SummaryNumber style={{ color: '#ef4444' }}>1</SummaryNumber>
                        <SummaryLabel>Failed to Sync</SummaryLabel>
                      </SummaryText>
                    </SummaryStat>
                  </SummaryStats>
                </SummaryPanel>
                <FilterTabs>
                  <FilterTab className="active">All Clips</FilterTab>
                  <FilterTab>🟢 High Confidence</FilterTab>
                  <FilterTab>🟡 Review</FilterTab>
                  <FilterTab>🔴 Failed</FilterTab>
                </FilterTabs>
                <div>
                  <ClipRow>
                    <ClipThumbnail>🎥</ClipThumbnail>
                    <ClipInfo>Cam_A_001.mov<ClipSubtext>Main camera angle</ClipSubtext></ClipInfo>
                    <TrackBadge>V1</TrackBadge>
                    <Timecode>00:00:00:00</Timecode>
                    <ConfidenceIndicator>
                      <ConfidenceDot className="success" />
                      <ConfidenceText>Excellent</ConfidenceText>
                    </ConfidenceIndicator>
                    <ActionLink>✓ Synced</ActionLink>
                  </ClipRow>
                  <ClipRow>
                    <ClipThumbnail>🎥</ClipThumbnail>
                    <ClipInfo>Cam_B_002.mov<ClipSubtext>Wide angle</ClipSubtext></ClipInfo>
                    <TrackBadge>V2</TrackBadge>
                    <Timecode>00:00:00:00</Timecode>
                    <ConfidenceIndicator>
                      <ConfidenceDot className="success" />
                      <ConfidenceText>Excellent</ConfidenceText>
                    </ConfidenceIndicator>
                    <ActionLink>✓ Synced</ActionLink>
                  </ClipRow>
                  <ClipRow>
                    <ClipThumbnail>🎙️</ClipThumbnail>
                    <ClipInfo>Recorder_1.wav<ClipSubtext>External audio</ClipSubtext></ClipInfo>
                    <TrackBadge>A1</TrackBadge>
                    <Timecode>00:00:00:00</Timecode>
                    <ConfidenceIndicator>
                      <ConfidenceDot className="success" />
                      <ConfidenceText>Excellent</ConfidenceText>
                    </ConfidenceIndicator>
                    <ActionLink>✓ Synced</ActionLink>
                  </ClipRow>
                  <ClipRow $warning="yellow">
                    <ClipThumbnail>🎥</ClipThumbnail>
                    <ClipInfo>Cam_A_003.mov<ClipSubtext>Second segment</ClipSubtext></ClipInfo>
                    <TrackBadge>V1</TrackBadge>
                    <Timecode>00:15:42:10</Timecode>
                    <ConfidenceIndicator>
                      <ConfidenceDot className="warning" />
                      <ConfidenceText>Good</ConfidenceText>
                    </ConfidenceIndicator>
                    <ActionLink>⚙ Review</ActionLink>
                  </ClipRow>
                  <ClipRow $warning="red">
                    <ClipThumbnail>🎥</ClipThumbnail>
                    <ClipInfo>B-Roll_Sky.mov<ClipSubtext>Supplemental footage</ClipSubtext></ClipInfo>
                    <TrackBadge>V3</TrackBadge>
                    <Timecode>00:32:10:05</Timecode>
                    <ConfidenceIndicator>
                      <ConfidenceDot className="error" />
                      <ConfidenceText>No Audio</ConfidenceText>
                    </ConfidenceIndicator>
                    <ActionLink>⊗ Skip</ActionLink>
                  </ClipRow>
                </div>
                <TimelinePreview>
                  <PreviewHeader>
                    <PreviewTitle>Timeline Preview</PreviewTitle>
                    <PlayButton>▶ Play Preview</PlayButton>
                  </PreviewHeader>
                  <TimelineTracks>
                    <Track>
                      <TrackLabel>V1</TrackLabel>
                      <TrackContent>
                        <ClipBlock $left="0%" $width="35%">Cam_A_001</ClipBlock>
                        <ClipBlock $left="40%" $width="25%" $variant="warning">Cam_A_003</ClipBlock>
                      </TrackContent>
                    </Track>
                    <Track>
                      <TrackLabel>V2</TrackLabel>
                      <TrackContent>
                        <ClipBlock $left="0%" $width="60%">Cam_B_002</ClipBlock>
                      </TrackContent>
                    </Track>
                    <Track>
                      <TrackLabel>V3</TrackLabel>
                      <TrackContent>
                        <ClipBlock $left="70%" $width="15%" $variant="muted">B-Roll</ClipBlock>
                      </TrackContent>
                    </Track>
                    <Track>
                      <TrackLabel>A1</TrackLabel>
                      <AudioTrack>
                        <AudioWaveform>
                          <AudioBar $h="40%" />
                          <AudioBar $h="70%" />
                          <AudioBar $h="55%" />
                          <AudioBar $h="85%" />
                          <AudioBar $h="90%" />
                          <AudioBar $h="65%" />
                          <AudioBar $h="75%" />
                          <AudioBar $h="60%" />
                          <AudioBar $h="45%" />
                          <AudioBar $h="80%" />
                        </AudioWaveform>
                      </AudioTrack>
                    </Track>
                  </TimelineTracks>
                </TimelinePreview>
              </Content>
            </Mockup>
            <MockupDescription>
              Post-sync dashboard with clip-level confidence indicators. Timeline preview lets editors verify sync accuracy before exporting back to their NLE.
            </MockupDescription>
          </MockupContainer>
        </Section>

        {/* Core Design Solutions */}
        <Section>
          <H2>Core Design Solutions</H2>
          <SolutionBlock>
            <SolutionTitle>1. Transparent Sync Pipeline</SolutionTitle>
            <SolutionDescription>
              <p><strong>Problem:</strong> Editors have no visibility into what Syncaila is doing during sync. A 15-minute process becomes an anxiety-inducing wait where the only feedback is a generic progress bar.</p>
              <p><strong>Solution:</strong> Multi-stage progress visualization with clip-level detail</p>
              <p><strong>Stage 1: File Analysis (0-30%)</strong> — Show thumbnail previews of each clip as it's processed, display extracted metadata (recording time, duration, audio channels, frame rate), with real-time counter "Analyzing 23/47 clips"</p>
              <p><strong>Stage 2: Audio Pattern Matching (30-80%)</strong> — Visualize waveform comparison between clips, highlight regions where sync points are detected, show match confidence scores in real-time</p>
              <p><strong>Stage 3: Timeline Assembly (80-100%)</strong> — Animate clips snapping into sync on a visual timeline, color-code clips by confidence (Green = high, Yellow = medium, Red = manual review needed)</p>
              <p><strong>Why This Works:</strong> Reduces anxiety by showing continuous progress with meaningful context, builds trust by revealing the "thinking" behind sync decisions, and enables proactive troubleshooting.</p>
            </SolutionDescription>
          </SolutionBlock>
          <SolutionBlock>
            <SolutionTitle>2. Clip Confidence Dashboard</SolutionTitle>
            <SolutionDescription>
              <p><strong>Problem:</strong> After sync completes, editors don't know which clips synced accurately and which need manual review. They either trust blindly (risky) or check every clip (time-consuming).</p>
              <p><strong>Solution:</strong> Post-sync dashboard with actionable clip-level insights including a sync overview panel with summary statistics, a sortable/filterable clip inspector table, and a diagnostic assistant that suggests likely causes when clips fail.</p>
              <p><strong>Confidence Indicators:</strong></p>
              <ul style={{ marginLeft: 24, color: theme.colors.weatheredSand }}>
                <li><strong>Excellent (&gt;90%):</strong> Waveform match &gt;90%, timecode aligned, no anomalies</li>
                <li><strong>Good (70-90%):</strong> Waveform match 70-90%, possible drift, review recommended</li>
                <li><strong>Fair (50-70%):</strong> Moderate match quality, manual verification needed</li>
                <li><strong>Poor (&lt;50%):</strong> Poor audio match, manual sync required, diagnostic suggestions shown</li>
              </ul>
              <p><strong>Why This Works:</strong> Gives editors control to decide which clips need attention, reduces post-sync QA time by flagging issues immediately, empowers troubleshooting without technical support.</p>
            </SolutionDescription>
          </SolutionBlock>
          <SolutionBlock>
            <SolutionTitle>3. Selective Sync &amp; Iterative Refinement</SolutionTitle>
            <SolutionDescription>
              <p><strong>Problem:</strong> Current workflow is all-or-nothing. If sync fails on one problematic clip, you re-run the entire sequence with different settings, wasting time on clips that synced correctly.</p>
              <p><strong>Solution:</strong> Granular control over which clips to sync/re-sync with pre-sync clip selection (deselect clips that don't need sync like B-roll without audio), post-sync re-sync mode (select low-confidence clips and re-run sync on only those with adjusted settings), and batch sync presets.</p>
              <p><strong>Batch Sync Presets:</strong></p>
              <ul style={{ marginLeft: 24, color: theme.colors.weatheredSand }}>
                <li><strong>Documentary Interview:</strong> High sensitivity, ignore background noise</li>
                <li><strong>Live Concert:</strong> Crowd noise tolerance, wide search window</li>
                <li><strong>Corporate Talking Head:</strong> Optimized for clean dialogue</li>
              </ul>
              <p><strong>Why This Works:</strong> Respects editors' time by avoiding redundant processing, supports iterative problem-solving, reduces trial-and-error by codifying best practices.</p>
            </SolutionDescription>
          </SolutionBlock>
          <SolutionBlock>
            <SolutionTitle>4. In-Context Timeline Preview</SolutionTitle>
            <SolutionDescription>
              <p><strong>Problem:</strong> The XML round-trip forces editors to export, process, then import back—never seeing results until they're already committed to the timeline.</p>
              <p><strong>Solution:</strong> Live timeline preview within Syncaila featuring an interactive timeline view showing all synced clips with scrubbing capability, a multi-camera angle viewer displaying all angles stacked vertically, before/after comparison toggles, and export preview.</p>
              <p><strong>Why This Works:</strong> Eliminates the "leap of faith" when exporting synced XML, catches errors before they contaminate the NLE project, builds confidence through direct visual verification.</p>
            </SolutionDescription>
          </SolutionBlock>
          <SolutionBlock>
            <SolutionTitle>5. Smart Defaults with Progressive Disclosure</SolutionTitle>
            <SolutionDescription>
              <p><strong>Problem:</strong> Current UI exposes all technical settings upfront, overwhelming casual users. But hiding them entirely frustrates power users tackling edge cases.</p>
              <p><strong>Solution:</strong> Layered interface with four levels of complexity:</p>
              <ul style={{ marginLeft: 24, color: theme.colors.weatheredSand }}>
                <li><strong>Level 1: Essential Controls</strong> (always visible) — Import XML, sync quality preset selector, Sync button, Export XML</li>
                <li><strong>Level 2: Helpful Context</strong> (visible after import) — Clip count, duration summary, detected camera info, estimated sync time</li>
                <li><strong>Level 3: Advanced Settings</strong> (collapsed by default) — Sync sensitivity, match thresholds, chronology type, audio preprocessing</li>
                <li><strong>Level 4: Diagnostics</strong> (only when issues occur) — Waveform comparison tools, manual offset controls, export logs</li>
              </ul>
              <p><strong>Smart Defaults:</strong> Automatically detect project characteristics and recommend optimal preset. Example: "Detected 3hr timeline with 8 cameras → 'Balanced' preset recommended (Est. 12 min sync time)"</p>
            </SolutionDescription>
          </SolutionBlock>
        </Section>

        {/* User Testing */}
        <Section>
          <H2>User Testing &amp; Iteration</H2>
          <P>
            I created interactive Figma prototypes and tested with 5 professional editors (2 documentary, 2 live events, 1 corporate). Test scenarios included importing a complex 8-camera project, monitoring sync progress, identifying and resolving low-confidence clips, previewing synced timelines, and re-syncing specific clips with adjusted settings.
          </P>
          <H3>Key Findings &amp; Iterations</H3>
          <IterationCards>
            <IterationCard>
              <IterationNumber>1</IterationNumber>
              <IterationTitle>Progress Anxiety Persists</IterationTitle>
              <IterationText>
                <p style={{ fontStyle: 'italic', marginBottom: 12 }}>"Even with the detailed progress view, I still feel anxious on long syncs. I want to know if it's actually working or stuck."</p>
                <p><strong>Iteration:</strong> Added "heartbeat" indicator showing last processed clip timestamp, "Processing normally" status messages updating every 10 seconds, and estimated time remaining dynamically updated.</p>
              </IterationText>
            </IterationCard>
            <IterationCard>
              <IterationNumber>2</IterationNumber>
              <IterationTitle>Confidence Scores Need Context</IterationTitle>
              <IterationText>
                <p style={{ fontStyle: 'italic', marginBottom: 12 }}>"I see this clip is 76% confidence. Is that good? Should I re-sync it or is it fine?"</p>
                <p><strong>Iteration:</strong> Changed from percentage scores to qualitative labels (Excellent, Good, Fair, Poor), added contextual tooltips, and introduced visual waveform overlays showing exactly where sync points were detected.</p>
              </IterationText>
            </IterationCard>
            <IterationCard>
              <IterationNumber>3</IterationNumber>
              <IterationTitle>Timeline Preview Feels Detached</IterationTitle>
              <IterationText>
                <p style={{ fontStyle: 'italic', marginBottom: 12 }}>"I'm scrubbing this timeline, but it doesn't feel connected to my Premiere project."</p>
                <p><strong>Iteration:</strong> Preserved exact track names and colors from imported XML, displayed clip markers and metadata from the NLE, and added "Open in Premiere" button that jumps directly to selected timecode.</p>
              </IterationText>
            </IterationCard>
            <IterationCard>
              <IterationNumber>4</IterationNumber>
              <IterationTitle>Export Anxiety Remains</IterationTitle>
              <IterationText>
                <p style={{ fontStyle: 'italic', marginBottom: 12 }}>"I'm about to overwrite my carefully organized timeline. Are you sure this won't break anything?"</p>
                <p><strong>Iteration:</strong> Added "Export as New Sequence" option, implemented dry-run mode to preview changes without applying them, and created visual diff view highlighting what's different.</p>
              </IterationText>
            </IterationCard>
          </IterationCards>
        </Section>

        {/* Outcome */}
        <Section>
          <H2>Outcome &amp; Impact</H2>
          <P>While this is a concept redesign (not implemented), user testing feedback indicated strong potential impact:</P>
          <OutcomeMetrics>
            <MetricCard>
              <MetricValue>8.7/10</MetricValue>
              <MetricLabel>Confidence Score</MetricLabel>
            </MetricCard>
            <MetricCard>
              <MetricValue>47 sec</MetricValue>
              <MetricLabel>Time to Decision</MetricLabel>
            </MetricCard>
            <MetricCard>
              <MetricValue>70%</MetricValue>
              <MetricLabel>Reduced Sync Anxiety</MetricLabel>
            </MetricCard>
            <MetricCard>
              <MetricValue>40%</MetricValue>
              <MetricLabel>Faster QA Time</MetricLabel>
            </MetricCard>
          </OutcomeMetrics>
          <P>
            Post-iteration testing showed significant improvements: Confidence Score increased from 6.2/10 to 8.7/10, Time to Decision reduced from avg. 3 min 45 sec to 47 seconds, and perceived speed improved even though processing time was identical—transparency reduced anxiety.
          </P>
          <HighlightBox>
            <H3>Why This Redesign Matters</H3>
            <P>
              Syncaila is a technically brilliant tool that solves a genuine pain point for professional editors. But technical excellence alone doesn't guarantee success—the interface must communicate that excellence clearly and build trust at every step.
            </P>
            <P>
              By making the sync process transparent, giving editors granular control over results, and reducing anxiety in the XML round-trip workflow, this redesign transforms Syncaila from a "utility I use when I have to" into a "trusted partner in my post-production toolkit."
            </P>
          </HighlightBox>
        </Section>

        {/* Next Steps */}
        <Section>
          <H2>Next Steps &amp; Future Enhancements</H2>
          <NextStepsList>
            <H3>Phase 1: Core Redesign (MVP)</H3>
            <ul>
              <li>Transparent sync pipeline with multi-stage progress</li>
              <li>Clip confidence dashboard with review tools</li>
              <li>Interactive timeline preview</li>
              <li>Smart defaults with progressive disclosure</li>
            </ul>
            <H3 style={{ marginTop: 32 }}>Phase 2: Advanced Features</H3>
            <ul>
              <li>Selective re-sync for problem clips</li>
              <li>Custom preset library (save/share sync configurations)</li>
              <li>Batch processing for multiple projects</li>
              <li>Advanced diagnostics (export sync reports, waveform comparison tools)</li>
            </ul>
            <H3 style={{ marginTop: 32 }}>Phase 3: Ecosystem Integration</H3>
            <ul>
              <li>Direct plugins for Premiere Pro, DaVinci Resolve (reduce XML round-trip friction)</li>
              <li>Cloud sync for team collaboration (share sync presets, projects)</li>
              <li>Mobile companion app (review sync results on iPad)</li>
              <li>AI-assisted sync suggestions (learn from user corrections)</li>
            </ul>
          </NextStepsList>
        </Section>

        {/* Reflections */}
        <Section>
          <H2>Reflections &amp; Learnings</H2>
          <ReflectionBox>
            <H3>What Worked Well</H3>
            <P>
              <strong>Deep Domain Knowledge as Design Advantage:</strong> My background in video production gave me credibility with interview participants and allowed me to ask better questions. I could speak the language of multi-camera workflows, understand the pressure of deadline-driven editing, and anticipate technical constraints that non-editors might miss.
            </P>
            <P>
              <strong>Balancing Power and Simplicity:</strong> The progressive disclosure approach successfully served both casual users (who just want one-click sync) and power users (who need diagnostic tools for edge cases). This wasn't easy—early wireframes either over-simplified or overwhelmed—but iteration led to a layered interface that scales with user needs.
            </P>
            <P>
              <strong>Designing for Trust:</strong> Transparency became the central design principle. Every decision—progress visualization, confidence scores, timeline preview—was driven by the question: "How do we make editors trust this tool with their critical projects?"
            </P>
          </ReflectionBox>
          <ReflectionBox>
            <H3>What I'd Do Differently</H3>
            <P>
              <strong>Earlier Prototype Testing:</strong> I spent significant time on high-fidelity mockups before testing. In retrospect, low-fi wireframes tested earlier would have surfaced the "confidence score context" issue sooner, saving iteration cycles.
            </P>
            <P>
              <strong>Quantitative Validation:</strong> User interviews provided rich qualitative insights, but I lacked hard data on actual sync times, error rates, and re-sync frequency. Access to Syncaila's analytics would have helped prioritize features based on real user behavior.
            </P>
            <P>
              <strong>Implementation Feasibility:</strong> Some features (real-time waveform comparison, multi-angle preview) are technically complex. I should have consulted with engineering earlier to validate feasibility and adjust designs accordingly.
            </P>
          </ReflectionBox>
          <ReflectionBox>
            <H3>Key Takeaways</H3>
            <P>
              <strong>1. Respect the Expert User:</strong> Professional editors are technically sophisticated—they don't need hand-holding, but they do need transparency. Designing for experts means exposing the right details at the right time, not hiding complexity entirely.
            </P>
            <P>
              <strong>2. Context Switching Has a Cost:</strong> The XML round-trip forces editors to leave their primary tool (NLE), which creates anxiety and friction. Any tool that requires context switching must work extra hard to build trust and prove its value.
            </P>
            <P>
              <strong>3. Performance Perception &gt; Actual Speed:</strong> Transparent progress made sync <em>feel</em> faster even when processing time was unchanged. Humans tolerate waiting when they understand what's happening—it's uncertainty that breeds frustration.
            </P>
          </ReflectionBox>
        </Section>

        {/* Tags */}
        <Section>
          <Tags>
            <Tag>UX Design</Tag>
            <Tag>Video Production</Tag>
            <Tag>Post-Production</Tag>
            <Tag>Desktop Application</Tag>
            <Tag>Multi-Camera Sync</Tag>
            <Tag>Professional Tools</Tag>
            <Tag>Concept Redesign</Tag>
            <Tag>User Research</Tag>
            <Tag>Usability Testing</Tag>
          </Tags>
        </Section>

        <Disclaimer>
          <strong>Disclaimer:</strong> This is a concept redesign created to showcase UX design thinking and video production expertise. Syncaila is owned and developed by Alex Coolicove. All design work shown here is speculative and not affiliated with or endorsed by the official Syncaila product.
        </Disclaimer>
      </Container>
    </PageWrap>
  );
}
