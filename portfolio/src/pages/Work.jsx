// src/pages/Work.jsx
// Work listing grid and simple case study detail view.

import React from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import useInView from '../hooks/useInView';
import useParallax from '../hooks/useParallax';
import { projects } from '../data/projects';
import SyncailaCaseStudy from './SyncailaCaseStudy';

const PageWrapper = styled.div`
  padding-top: ${({ theme }) => theme.spacing.xxxl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xxl};
`;

const Header = styled.header`
  max-width: 720px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Grid = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Card = styled.article.attrs(() => ({
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
  transform: perspective(900px) rotateX(0deg) rotateY(0deg)
    translateY(0px);
  transition: transform 220ms ease-out,
    box-shadow 220ms ease-out,
    background-color 220ms ease-out;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.cardStrong};
  }
`;

const CardMediaWrap = styled.div`
  border-radius: 12px;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: ${({ theme, $tone }) =>
    $tone === 'almondWash'
      ? theme.colors.almondWash
      : $tone === 'softParchment'
      ? theme.colors.softParchment
      : theme.colors.weatheredSand};
`;

const CardMedia = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardTitle = styled.h2`
  font-size: 1.6rem;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  opacity: 0.85;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const DetailLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: ${({ theme }) => theme.spacing.xl};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 3fr) minmax(0, 1.5fr);
    align-items: flex-start;
  }
`;

const DetailHero = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
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
  opacity: ${({ $hasImage }) => ($hasImage ? 0.25 : 0.7)};
  pointer-events: none;
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

const DetailBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const DetailSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Sidebar = styled.aside`
  position: sticky;
  top: 120px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding-left: ${({ theme }) => theme.spacing.md};
  border-left: 1px solid ${({ theme }) => theme.colors.weatheredSand};
`;

const SidebarLink = styled.button`
  text-align: left;
  font-size: 0.9rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  opacity: 0.85;

  &:hover {
    opacity: 1;
  }
`;

const BackLink = styled.button`
  font-size: 0.85rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Overview = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-top: ${({ theme }) => theme.spacing.lg};
  white-space: pre-line;
`;

const RoleDetail = styled.p`
  font-size: 0.95rem;
  line-height: 1.7;
  opacity: 0.9;
`;

const PrinciplesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const PrinciplePill = styled.span`
  padding: 6px ${({ theme }) => theme.spacing.sm};
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.almondWash};
  color: ${({ theme }) => theme.colors.oxbloodBrick};
  font-size: 0.82rem;
`;

const SolutionBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const SolutionTitle = styled.h4`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-weight: 500;
  font-size: 1rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.rustOchre};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const SolutionDescription = styled.p`
  line-height: 1.7;
  white-space: pre-line;
`;

const IterationBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const IterationHeader = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const IterationNumber = styled.span`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-weight: 500;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  color: ${({ theme }) => theme.colors.weatheredSand};
  min-width: 32px;
`;

const IterationTitle = styled.h4`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-weight: 500;
  font-size: 1rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.espressoBark};
`;

const IterationDescription = styled.p`
  line-height: 1.7;
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const NextStepsList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const NextStepItem = styled.li`
  position: relative;
  padding-left: ${({ theme }) => theme.spacing.md};
  line-height: 1.7;

  &::before {
    content: '—';
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.rustOchre};
  }
`;

const Reflection = styled.p`
  font-style: italic;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.oxideUmber};
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.weatheredSand};
`;

const TagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.weatheredSand};
`;

const TagPill = styled.span`
  padding: 4px ${({ theme }) => theme.spacing.sm};
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.softParchment};
  color: ${({ theme }) => theme.colors.espressoBark};
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const Impact = styled.p`
  font-size: 1.05rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.oxideUmber};
  margin-top: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.linenCream};
  border-left: 3px solid ${({ theme }) => theme.colors.rustOchre};
`;

const MetricCategory = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const MetricCategoryTitle = styled.h4`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-weight: 500;
  font-size: 0.9rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.rustOchre};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const MetricList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  padding-left: ${({ theme }) => theme.spacing.md};
`;

const MetricItem = styled.li`
  position: relative;
  line-height: 1.6;

  &::before {
    content: '•';
    position: absolute;
    left: -${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.weatheredSand};
  }
`;

const ConstraintBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.linenCream};
  border-radius: 8px;
`;

const ConstraintTitle = styled.h4`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-weight: 500;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.espressoBark};
`;

const ConstraintLabel = styled.span`
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.rustOchre};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const ReflectionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ReflectionCategory = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const ReflectionCategoryTitle = styled.h4`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-weight: 500;
  font-size: 0.95rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.espressoBark};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const ReflectionList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding-left: ${({ theme }) => theme.spacing.md};
`;

const ReflectionListItem = styled.li`
  position: relative;
  line-height: 1.7;

  &::before {
    content: '•';
    position: absolute;
    left: -${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.rustOchre};
  }
`;

const BeyondSection = styled.p`
  font-size: 0.95rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.oxideUmber};
  font-style: italic;
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.weatheredSand};
`;

const UserFlowContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const FlowRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

const FlowStep = styled.div`
  flex: 1;
  min-width: 200px;
  background: ${({ $primary, theme }) =>
    $primary ? theme.colors.linenCream : theme.colors.chalkWhite};
  border: 2px solid
    ${({ $primary, theme }) =>
      $primary ? theme.colors.rustOchre : theme.colors.weatheredSand};
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing.md};
  position: relative;
`;

const FlowStepDecision = styled.div`
  background: ${({ theme }) => theme.colors.goldenMustard};
  border: 2px solid ${({ theme }) => theme.colors.goldenMustard};
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.espressoBark};
`;

const StepNumber = styled.span`
  display: inline-block;
  width: 28px;
  height: 28px;
  background: ${({ theme }) => theme.colors.rustOchre};
  color: ${({ theme }) => theme.colors.chalkWhite};
  border-radius: 50%;
  text-align: center;
  line-height: 28px;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StepTitle = styled.div`
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.espressoBark};
`;

const StepDesc = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.oxideUmber};
  line-height: 1.5;
`;

const FlowArrow = styled.span`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.weatheredSand};
  flex-shrink: 0;
`;

const KeyInsight = styled.div`
  background: ${({ theme }) => theme.colors.goldenMustard};
  border-left: 4px solid ${({ theme }) => theme.colors.rustOchre};
  padding: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
  border-radius: 4px;
`;

const InsightTitle = styled.div`
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.espressoBark};
`;

const WireframeDescription = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.linenCream};
  border-radius: 8px;
  border-left: 3px solid ${({ theme }) => theme.colors.rustOchre};
`;

const WireframeTitle = styled.h4`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-weight: 500;
  font-size: 0.95rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.rustOchre};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const DesignDecisionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StickyNote = styled.div`
  background: ${({ theme, $index }) =>
    $index % 3 === 0
      ? theme.colors.goldenMustard
      : $index % 3 === 1
      ? theme.colors.linenCream
      : theme.colors.dustyApricot};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: 4px;
  box-shadow: ${({ theme }) => theme.shadows.cardSoft};
  position: relative;
  min-height: 140px;
  transform: ${({ $index }) =>
    $index % 2 === 0 ? 'rotate(-1deg)' : 'rotate(1deg)'};
`;

const StickyTitle = styled.h4`
  font-size: 0.85rem;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.espressoBark};
  border-bottom: 1px solid rgba(34, 25, 22, 0.2);
  padding-bottom: ${({ theme }) => theme.spacing.xs};
  font-weight: 600;
`;

const StickyText = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.espressoBark};
  line-height: 1.5;
`;

function WorkGrid() {
  const navigate = useNavigate();
  const { ref, inView } = useInView();

  const handleCardTilt = (event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const maxTilt = 6;

    const rotateY = ((x - midX) / midX) * maxTilt * -1;
    const rotateX = ((y - midY) / midY) * maxTilt;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  };

  const resetCardTilt = (event) => {
    const card = event.currentTarget;
    card.style.transform =
      'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };
  
  

  return (
    <PageWrapper>
      <Header>
        <h3>Case Studies</h3>
        <h1>Work that traces the journey from question to quietly confident product.</h1>
        <p>
          A collection of end-to-end case studies across healthtech and video production — each rooted in research and tuned to the textures of everyday use.
        </p>
      </Header>

      <Grid ref={ref}>
        {projects.map((project, index) => {
          return (
          <Card
            key={project.id}
            className={`reveal ${inView ? 'reveal--visible' : ''}`}
            style={{
              transitionDelay: inView ? `${index * 150}ms` : '0ms',
            }}
            onMouseMove={handleCardTilt}
            onMouseLeave={resetCardTilt}
            onClick={() => navigate(`/work/${project.slug}`)}
          >
            <CardMediaWrap>
              {project.coverImage && (
                <CardMedia src={project.coverImage} alt={project.title} />
              )}
            </CardMediaWrap>
            <div>
              <CardTitle>{project.title}</CardTitle>
              <p>{project.shortDesc}</p>
            </div>
            <CardMeta>
              <span>{project.year}</span>
              <TagRow>
                {Array.isArray(project.role)
                  ? project.role.map((r) => <span key={r}>{r}</span>)
                  : <span>{project.role}</span>}
              </TagRow>
            </CardMeta>
          </Card>
        )})}
      </Grid>
    </PageWrapper>
  );
}

function WorkDetail({ project }) {
  const navigate = useNavigate();
  const heroOffset = useParallax(0.18);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle role as both string and array
  const roleDisplay = Array.isArray(project.role) ? project.role.join(', ') : project.role;
  const platformDisplay = project.platform || 'Mobile & Web';

  return (
    <PageWrapper>
      <BackLink onClick={() => navigate('/work')}>← Back to all work</BackLink>

      <DetailLayout>
        <div>
          <DetailHero $offset={heroOffset}>
            {project.coverImage && (
              <DetailHeroImage src={project.coverImage} alt={project.title} />
            )}
            <DetailHeroInner $hasImage={Boolean(project.coverImage)} />
          </DetailHero>

          {/* Overview */}
          {project.overview && <Overview>{project.overview}</Overview>}

          {/* Impact */}
          {project.impact && <Impact>{project.impact}</Impact>}

          <DetailStatsStrip>
            <StatItem>
              <StatLabel>Role</StatLabel>
              <StatValue>{roleDisplay}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Year</StatLabel>
              <StatValue>{project.year}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Platform</StatLabel>
              <StatValue>{platformDisplay}</StatValue>
            </StatItem>
          </DetailStatsStrip>

          {/* Role Detail */}
          {project.role_detail && (
            <DetailSection id="role">
              <h3>My Role</h3>
              <RoleDetail>{project.role_detail}</RoleDetail>
            </DetailSection>
          )}

          <DetailBody>
            {/* Research */}
            {project.research && (
              <DetailSection id="research">
                <h3>Understanding Users</h3>
                {project.research.summary && (
                  <p style={{ whiteSpace: 'pre-line' }}>{project.research.summary}</p>
                )}
                {project.research.usabilityTesting && (
                  <p style={{ marginTop: '1rem', whiteSpace: 'pre-line' }}>
                    {project.research.usabilityTesting}
                  </p>
                )}
              </DetailSection>
            )}

            {/* Requirements */}
            {project.requirements && (
              <DetailSection id="requirements">
                <h3>Defining Requirements</h3>
                {project.requirements.successMetrics && (
                  <>
                    <MetricCategoryTitle>Success Metrics</MetricCategoryTitle>
                    {project.requirements.successMetrics.product && (
                      <MetricCategory>
                        <ConstraintLabel>Product Metrics</ConstraintLabel>
                        <MetricList>
                          {project.requirements.successMetrics.product.map((metric, idx) => (
                            <MetricItem key={idx}>{metric}</MetricItem>
                          ))}
                        </MetricList>
                      </MetricCategory>
                    )}
                    {project.requirements.successMetrics.business && (
                      <MetricCategory>
                        <ConstraintLabel>Business Metrics</ConstraintLabel>
                        <MetricList>
                          {project.requirements.successMetrics.business.map((metric, idx) => (
                            <MetricItem key={idx}>{metric}</MetricItem>
                          ))}
                        </MetricList>
                      </MetricCategory>
                    )}
                    {project.requirements.successMetrics.userExperience && (
                      <MetricCategory>
                        <ConstraintLabel>User Experience Metrics</ConstraintLabel>
                        <MetricList>
                          {project.requirements.successMetrics.userExperience.map((metric, idx) => (
                            <MetricItem key={idx}>{metric}</MetricItem>
                          ))}
                        </MetricList>
                      </MetricCategory>
                    )}
                  </>
                )}
                {project.requirements.coreFunctionality && (
                  <>
                    <MetricCategoryTitle>Core Functionality</MetricCategoryTitle>
                    <MetricList>
                      {project.requirements.coreFunctionality.map((func, idx) => (
                        <MetricItem key={idx}>{func}</MetricItem>
                      ))}
                    </MetricList>
                  </>
                )}
              </DetailSection>
            )}

            {/* Technical Architecture */}
            {project.technicalArchitecture && (
              <DetailSection id="technical-architecture">
                <h3>Technical Architecture</h3>
                {project.technicalArchitecture.stateManagement && (
                  <div style={{ marginTop: '1rem' }}>
                    <ConstraintLabel>State Management Design</ConstraintLabel>
                    <p style={{ marginTop: '0.5rem', whiteSpace: 'pre-line' }}>{project.technicalArchitecture.stateManagement}</p>
                  </div>
                )}
                {project.technicalArchitecture.performanceOptimization && (
                  <div style={{ marginTop: '1.5rem' }}>
                    <ConstraintLabel>Performance Optimization</ConstraintLabel>
                    {project.technicalArchitecture.performanceOptimization.rtkQueryCaching && (
                      <div style={{ marginTop: '0.75rem' }}>
                        <strong>RTK Query Caching:</strong>
                        <p style={{ marginTop: '0.25rem', whiteSpace: 'pre-line' }}>
                          {project.technicalArchitecture.performanceOptimization.rtkQueryCaching}
                        </p>
                      </div>
                    )}
                    {project.technicalArchitecture.performanceOptimization.listVirtualization && (
                      <div style={{ marginTop: '0.75rem' }}>
                        <strong>List Virtualization:</strong>
                        <p style={{ marginTop: '0.25rem', whiteSpace: 'pre-line' }}>
                          {project.technicalArchitecture.performanceOptimization.listVirtualization}
                        </p>
                      </div>
                    )}
                    {project.technicalArchitecture.performanceOptimization.dragAndDrop && (
                      <div style={{ marginTop: '0.75rem' }}>
                        <strong>Drag-and-Drop Optimization:</strong>
                        <p style={{ marginTop: '0.25rem', whiteSpace: 'pre-line' }}>
                          {project.technicalArchitecture.performanceOptimization.dragAndDrop}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </DetailSection>
            )}

            {/* Design Process */}
            {project.designProcess && (
              <DetailSection id="design-process">
                <h3>Design Process</h3>
                {project.designProcess.wireframing && (
                  <div style={{ marginTop: '1rem' }}>
                    <ConstraintLabel>Wireframing Core Interactions</ConstraintLabel>
                    <p style={{ marginTop: '0.5rem', whiteSpace: 'pre-line' }}>
                      {project.designProcess.wireframing}
                    </p>
                  </div>
                )}

                {/* User Flow */}
                {project.designProcess.userFlow && (() => {
                  const steps = project.designProcess.userFlow.steps || [];
                  const byNum = (n) => steps.find((s) => s.number === n);
                  const decision = steps.find((s) => s.type === 'decision');
                  const step1 = byNum(1);
                  const step2 = byNum(2);
                  const step3 = byNum(3);
                  const step4a = byNum('4a');
                  const step4b = byNum('4b');
                  const step5 = byNum(5);
                  const step6 = byNum(6);
                  const step7 = byNum(7);
                  const step8 = byNum(8);
                  const renderStep = (step) =>
                    step ? (
                      <FlowStep key={step.number} $primary={step.isPrimary}>
                        <StepNumber>{step.number}</StepNumber>
                        <StepTitle>{step.title}</StepTitle>
                        {step.description && <StepDesc>{step.description}</StepDesc>}
                      </FlowStep>
                    ) : null;
                  return (
                    <div style={{ marginTop: '1.5rem' }}>
                      <ConstraintLabel>{project.designProcess.userFlow.title}</ConstraintLabel>
                      <UserFlowContainer>
                        {/* Row 1: 1 → 2 → 3 */}
                        <FlowRow>
                          {renderStep(step1)}
                          <FlowArrow>→</FlowArrow>
                          {renderStep(step2)}
                          <FlowArrow>→</FlowArrow>
                          {renderStep(step3)}
                        </FlowRow>
                        {/* Row 2: "Has Existing Promotions?" */}
                        {decision && (
                          <FlowRow>
                            <FlowStepDecision>{decision.title}</FlowStepDecision>
                          </FlowRow>
                        )}
                        {/* Row 3: 4a → 4b */}
                        <FlowRow>
                          {renderStep(step4a)}
                          <FlowArrow>→</FlowArrow>
                          {renderStep(step4b)}
                        </FlowRow>
                        {/* Row 4: 5 → 6 */}
                        <FlowRow>
                          {renderStep(step5)}
                          <FlowArrow>→</FlowArrow>
                          {renderStep(step6)}
                        </FlowRow>
                        {/* Row 5: 7 → 8 */}
                        <FlowRow>
                          {renderStep(step7)}
                          <FlowArrow>→</FlowArrow>
                          {renderStep(step8)}
                        </FlowRow>
                      </UserFlowContainer>
                      {project.designProcess.userFlow.keyInsight && (
                        <KeyInsight>
                          <InsightTitle>Key Insight</InsightTitle>
                          <p>{project.designProcess.userFlow.keyInsight}</p>
                        </KeyInsight>
                      )}
                    </div>
                  );
                })()}

                {/* Wireframe Screens */}
                {project.designProcess.wireframes &&
                  typeof project.designProcess.wireframes === 'object' &&
                  !Array.isArray(project.designProcess.wireframes) && (
                    <div style={{ marginTop: '2rem' }}>
                      <ConstraintLabel>Wireframe Screens</ConstraintLabel>
                      {project.designProcess.wireframes.mainDashboard && (
                        <WireframeDescription>
                          <WireframeTitle>
                            {project.designProcess.wireframes.mainDashboard.title}
                          </WireframeTitle>
                          <p style={{ whiteSpace: 'pre-line' }}>
                            {project.designProcess.wireframes.mainDashboard.description}
                          </p>
                        </WireframeDescription>
                      )}
                      {project.designProcess.wireframes.expandedView && (
                        <WireframeDescription style={{ marginTop: '1rem' }}>
                          <WireframeTitle>
                            {project.designProcess.wireframes.expandedView.title}
                          </WireframeTitle>
                          <p style={{ whiteSpace: 'pre-line' }}>
                            {project.designProcess.wireframes.expandedView.description}
                          </p>
                        </WireframeDescription>
                      )}
                      {project.designProcess.wireframes.addProviderModal && (
                        <WireframeDescription style={{ marginTop: '1rem' }}>
                          <WireframeTitle>
                            {project.designProcess.wireframes.addProviderModal.title}
                          </WireframeTitle>
                          <p style={{ whiteSpace: 'pre-line' }}>
                            {project.designProcess.wireframes.addProviderModal.description}
                          </p>
                        </WireframeDescription>
                      )}
                      {project.designProcess.wireframes.emptyState && (
                        <WireframeDescription style={{ marginTop: '1rem' }}>
                          <WireframeTitle>
                            {project.designProcess.wireframes.emptyState.title}
                          </WireframeTitle>
                          <p style={{ whiteSpace: 'pre-line' }}>
                            {project.designProcess.wireframes.emptyState.description}
                          </p>
                        </WireframeDescription>
                      )}
                    </div>
                  )}

                {/* Design Decisions */}
                {project.designProcess.designDecisions &&
                  project.designProcess.designDecisions.length > 0 && (
                    <div style={{ marginTop: '2rem' }}>
                      <ConstraintLabel>Design Decisions: Sticky Note Insights</ConstraintLabel>
                      <DesignDecisionsGrid>
                        {project.designProcess.designDecisions.map((decision, idx) => (
                          <StickyNote key={idx} $index={idx}>
                            <StickyTitle>{decision.title}</StickyTitle>
                            <StickyText>{decision.description}</StickyText>
                          </StickyNote>
                        ))}
                      </DesignDecisionsGrid>
                    </div>
                  )}

                {project.designProcess.interactionDesign && (
                  <div style={{ marginTop: '1.5rem' }}>
                    <ConstraintLabel>Interaction Design</ConstraintLabel>
                    <p style={{ marginTop: '0.5rem', whiteSpace: 'pre-line' }}>
                      {project.designProcess.interactionDesign}
                    </p>
                  </div>
                )}
                {project.designProcess.informationArchitecture && (
                  <div style={{ marginTop: '1.5rem' }}>
                    <ConstraintLabel>Information Architecture</ConstraintLabel>
                    <p style={{ marginTop: '0.5rem', whiteSpace: 'pre-line' }}>
                      {project.designProcess.informationArchitecture}
                    </p>
                  </div>
                )}
              </DetailSection>
            )}

            {/* Design Principles */}
            {project.designPrinciples && project.designPrinciples.length > 0 && (
              <DetailSection id="principles">
                <h3>Design Principles</h3>
                <PrinciplesRow>
                  {project.designPrinciples.map((principle, idx) => (
                    <PrinciplePill key={idx}>{principle}</PrinciplePill>
                  ))}
                </PrinciplesRow>
              </DetailSection>
            )}

            {/* Design Solutions */}
            {project.designSolutions && project.designSolutions.length > 0 && (
              <DetailSection id="solutions">
                <h3>Design Solutions</h3>
                {project.designSolutions.map((solution, idx) => (
                  <SolutionBlock key={idx}>
                    <SolutionTitle>{solution.title}</SolutionTitle>
                    <SolutionDescription>{solution.description}</SolutionDescription>
                  </SolutionBlock>
                ))}
              </DetailSection>
            )}

            {/* Constraints */}
            {project.constraints && project.constraints.length > 0 && (
              <DetailSection id="constraints">
                <h3>Navigating Technical Constraints</h3>
                {project.constraints.map((constraint, idx) => (
                  <ConstraintBlock key={idx}>
                    <ConstraintTitle>{constraint.challenge}</ConstraintTitle>
                    <div style={{ marginTop: '0.5rem' }}>
                      <ConstraintLabel>Problem</ConstraintLabel>
                      <p style={{ marginTop: '0.25rem' }}>{constraint.problem}</p>
                    </div>
                    <div style={{ marginTop: '0.75rem' }}>
                      <ConstraintLabel>Solution</ConstraintLabel>
                      <p style={{ marginTop: '0.25rem', whiteSpace: 'pre-line' }}>
                        {constraint.solution}
                      </p>
                    </div>
                    <div style={{ marginTop: '0.75rem' }}>
                      <ConstraintLabel>Result</ConstraintLabel>
                      <p style={{ marginTop: '0.25rem' }}>{constraint.result}</p>
                    </div>
                  </ConstraintBlock>
                ))}
              </DetailSection>
            )}

            {/* Implementation */}
            {project.implementation && (
              <DetailSection id="implementation">
                <h3>Implementation &amp; Validation</h3>
                {project.implementation.designHandoff && (
                  <div style={{ marginTop: '1rem' }}>
                    <ConstraintLabel>Design Handoff</ConstraintLabel>
                    <p style={{ marginTop: '0.5rem', whiteSpace: 'pre-line' }}>
                      {project.implementation.designHandoff}
                    </p>
                  </div>
                )}
                {project.implementation.iteratingWithEngineering && (
                  <div style={{ marginTop: '1.5rem' }}>
                    <ConstraintLabel>Iterating with Engineering</ConstraintLabel>
                    <p style={{ marginTop: '0.5rem', whiteSpace: 'pre-line' }}>
                      {project.implementation.iteratingWithEngineering}
                    </p>
                  </div>
                )}
                {project.implementation.userTesting && (
                  <div style={{ marginTop: '1.5rem' }}>
                    <ConstraintLabel>User Testing &amp; Refinement</ConstraintLabel>
                    <p style={{ marginTop: '0.5rem', whiteSpace: 'pre-line' }}>
                      {project.implementation.userTesting}
                    </p>
                  </div>
                )}
              </DetailSection>
            )}

            {/* Iterations */}
            {project.iterations && project.iterations.length > 0 && (
              <DetailSection id="iterations">
                <h3>Design Iterations</h3>
                {project.iterations.map((iteration, idx) => (
                  <IterationBlock key={idx}>
                    <IterationHeader>
                      <IterationNumber>
                        {String(idx + 1).padStart(2, '0')}
                      </IterationNumber>
                      <IterationTitle>{iteration.title}</IterationTitle>
                    </IterationHeader>
                    <IterationDescription>{iteration.description}</IterationDescription>
                  </IterationBlock>
                ))}
              </DetailSection>
            )}

            {/* Outcome */}
            {project.outcome && (
              <DetailSection id="outcome">
                <h3>Outcome &amp; Impact</h3>
                <p style={{ whiteSpace: 'pre-line' }}>{project.outcome}</p>
              </DetailSection>
            )}

            {/* Next Steps */}
            {project.nextSteps && project.nextSteps.length > 0 && (
              <DetailSection id="next-steps">
                <h3>Next Steps</h3>
                <NextStepsList>
                  {project.nextSteps.map((step, idx) => (
                    <NextStepItem key={idx}>{step}</NextStepItem>
                  ))}
                </NextStepsList>
              </DetailSection>
            )}

            {/* Reflection */}
            {project.reflection && (
              <DetailSection id="reflection">
                <h3>Reflections &amp; Learnings</h3>
                {typeof project.reflection === 'string' ? (
                  <Reflection>{project.reflection}</Reflection>
                ) : (
                  <ReflectionSection>
                    {project.reflection.whatWorkedWell && (
                      <ReflectionCategory>
                        <ReflectionCategoryTitle>What Worked Well</ReflectionCategoryTitle>
                        <ReflectionList>
                          {project.reflection.whatWorkedWell.map((item, idx) => (
                            <ReflectionListItem key={idx}>{item}</ReflectionListItem>
                          ))}
                        </ReflectionList>
                      </ReflectionCategory>
                    )}
                    {project.reflection.whatIdDoDifferently && (
                      <ReflectionCategory>
                        <ReflectionCategoryTitle>What I&apos;d Do Differently</ReflectionCategoryTitle>
                        <ReflectionList>
                          {project.reflection.whatIdDoDifferently.map((item, idx) => (
                            <ReflectionListItem key={idx}>{item}</ReflectionListItem>
                          ))}
                        </ReflectionList>
                      </ReflectionCategory>
                    )}
                  </ReflectionSection>
                )}
              </DetailSection>
            )}

            {/* Beyond Promotions */}
            {project.beyondPromotions && (
              <BeyondSection>{project.beyondPromotions}</BeyondSection>
            )}

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <TagsRow>
                {project.tags.map((tag, idx) => (
                  <TagPill key={idx}>{tag}</TagPill>
                ))}
              </TagsRow>
            )}
          </DetailBody>
        </div>

        <Sidebar>
          {project.role_detail && (
            <SidebarLink onClick={() => scrollToId('role')}>My Role</SidebarLink>
          )}
          {project.research && (
            <SidebarLink onClick={() => scrollToId('research')}>Understanding Users</SidebarLink>
          )}
          {project.requirements && (
            <SidebarLink onClick={() => scrollToId('requirements')}>Requirements</SidebarLink>
          )}
          {project.technicalArchitecture && (
            <SidebarLink onClick={() => scrollToId('technical-architecture')}>Technical Architecture</SidebarLink>
          )}
          {project.designProcess && (
            <SidebarLink onClick={() => scrollToId('design-process')}>Design Process</SidebarLink>
          )}
          {project.designPrinciples && (
            <SidebarLink onClick={() => scrollToId('principles')}>Design Principles</SidebarLink>
          )}
          {project.designSolutions && (
            <SidebarLink onClick={() => scrollToId('solutions')}>Design Solutions</SidebarLink>
          )}
          {project.constraints && (
            <SidebarLink onClick={() => scrollToId('constraints')}>Constraints</SidebarLink>
          )}
          {project.implementation && (
            <SidebarLink onClick={() => scrollToId('implementation')}>Implementation</SidebarLink>
          )}
          {project.iterations && (
            <SidebarLink onClick={() => scrollToId('iterations')}>Iterations</SidebarLink>
          )}
          {project.outcome && (
            <SidebarLink onClick={() => scrollToId('outcome')}>Outcome</SidebarLink>
          )}
          {project.reflection && (
            <SidebarLink onClick={() => scrollToId('reflection')}>Reflections</SidebarLink>
          )}
          {project.nextSteps && (
            <SidebarLink onClick={() => scrollToId('next-steps')}>Next Steps</SidebarLink>
          )}
        </Sidebar>
      </DetailLayout>
    </PageWrapper>
  );
}

export default function Work() {
  const { slug } = useParams();

  if (slug) {
    const project = projects.find((p) => p.slug === slug);
    if (!project) {
      return (
        <PageWrapper>
          <Header>
            <h1>Case study not found.</h1>
            <p>Try returning to the full list of work.</p>
          </Header>
        </PageWrapper>
      );
    }

    if (project.customLayout === 'syncaila') {
      return <SyncailaCaseStudy project={project} />;
    }

    return <WorkDetail project={project} />;
  }

  return <WorkGrid />;
}

