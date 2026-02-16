// src/pages/About.jsx
// Resume page: skills, employment, education — themed to match portfolio.

import React from 'react';
import styled, { keyframes } from 'styled-components';

const PageWrapper = styled.div`
  padding-top: ${({ theme }) => theme.spacing.xxxl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xxl};
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding-inline: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-inline: ${({ theme }) => theme.spacing.xl};
  }
`;

const ResumeHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  padding-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.weatheredSand};
`;

const Name = styled.h1`
  font-family: ${({ theme }) => theme.typography.fonts.display};
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.espressoBark};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin: 0;
`;

const Email = styled.a`
  font-family: ${({ theme }) => theme.typography.fonts.body};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.rustOchre};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.burntSiennaClay};
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.fonts.display};
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.espressoBark};
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
`;

const PillRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Pill = styled.span`
  padding: 6px ${({ theme }) => theme.spacing.sm};
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.almondWash};
  color: ${({ theme }) => theme.colors.oxbloodBrick};
  font-size: 0.82rem;
  font-weight: 500;
`;

const JobBlock = styled.article`
  padding: ${({ theme }) => theme.spacing.lg} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.weatheredSand});

  &:last-of-type {
    border-bottom: none;
  }
`;

const CompanyName = styled.h3`
  font-family: ${({ theme }) => theme.typography.fonts.display};
  font-size: 1.35rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.espressoBark};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
`;

const RoleDates = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.oxideUmber};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  font-weight: 500;
`;

const BulletList = styled.ul`
  margin: 0;
  padding-left: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const BulletItem = styled.li`
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.oxideUmber};
`;

const EducationBlock = styled.div`
  padding: ${({ theme }) => theme.spacing.lg} 0 0;
`;

const SchoolName = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.display};
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.espressoBark};
  margin: 0;
`;

const SchoolLocation = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.weatheredSand};
  margin: ${({ theme }) => theme.spacing.xs} 0 0 0;
`;

const marquee = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const ToolsStrip = styled.section`
  border-top: 1px solid ${({ theme }) => theme.colors.weatheredSand};
  border-bottom: 1px solid ${({ theme }) => theme.colors.weatheredSand};
  padding-block: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.lg};
  overflow: hidden;
`;

const MarqueeInner = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  white-space: nowrap;
  animation: ${marquee} 45s linear infinite;
`;

const ToolItem = styled.span`
  font-size: 0.78rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.weatheredSand};
`;

const SKILLS = [
  'HTML/CSS/styled-component',
  'React Native',
  'Cypress',
  'Javascript ES6',
  'Typescript',
  'SQL (PostgreSQL)',
  'CircleCI',
  'NodeJS',
  'ExpressJS',
  'Storybook',
  'AWS S3, Lambda',
  'ReactJS',
  'Redux',
  'RTK/RTK Query',
  'Figma',
  'Shopify',
];

const LOYAL_BULLETS = [
  'Designed and shipped Loyal Health\'s Search and Scheduling products — driving a 25% boost in system responsiveness and high client satisfaction.',
  'Conducted user research and synthesized survey data to surface pain points and inform product decisions — findings directly shaped feature prioritization across the Search and Scheduling products.',
  'Collaborated directly with Design to bridge engineering and UX — translating technical requirements and constraints into design prototypes, ensuring what got built matched both the vision and what was technically sound.',
  'Shipped production features across the full stack using React, Redux, TypeScript, styled-components, and Node, while contributing to backend architecture and API design.',
  'Re-architected apps for full container-responsiveness by replacing all media queries with custom responsive width functions, leveraging React Hooks and the Context API to meet internal scalability goals.',
  'Spearheaded the Search Profile Settings initiative end-to-end — breaking the concept into user stories, shipping behind feature flags, and delivering 2 days ahead of schedule across 134 live hospital sites.',
  'Drove the full technical vision for Loyal\'s Promotions feature, designing Redux state and data flow diagrams and aligning the team on how reusable components are connected to bring the feature to life.',
];

const POCAS_BULLETS = [
  'Integrated Shopify API to synchronize inventory data between the internal management system and the e-commerce storefront, streamlining order fulfillment processes.',
  'Developed a React Native mobile version of the inventory management application to enable on-the-go access for users, ensuring seamless integration with the existing backend.',
  'Initiated the utilization of Google OAuth & Passport.js services for users to sign in with Google account using cookie-based authentication; implemented Mongoose/MongoDB to store user information & validation logic to identify surveys with overlapping responses.',
];

export default function About() {
  const doubledTools = [...SKILLS, ...SKILLS];

  return (
    <PageWrapper>
      <ResumeHeader>
        <Name>Rena Hahn</Name>
        <Email href="mailto:renabhahn@gmail.com">renabhahn@gmail.com</Email>
      </ResumeHeader>

      <Section>
        <SectionTitle>Skills</SectionTitle>
        <PillRow>
          {SKILLS.map((skill) => (
            <Pill key={skill}>{skill}</Pill>
          ))}
        </PillRow>
      </Section>

      <Section>
        <SectionTitle>Employment</SectionTitle>

        <JobBlock>
          <CompanyName>Loyal Health</CompanyName>
          <RoleDates>Software Engineer, Frontend · Nov. 2021 – Apr. 2024</RoleDates>
          <BulletList>
            {LOYAL_BULLETS.map((item, i) => (
              <BulletItem key={i}>{item}</BulletItem>
            ))}
          </BulletList>
        </JobBlock>

        <JobBlock>
          <CompanyName>Pocas International</CompanyName>
          <RoleDates>Software Engineer · Jun. 2020 – Sep. 2021</RoleDates>
          <BulletList>
            {POCAS_BULLETS.map((item, i) => (
              <BulletItem key={i}>{item}</BulletItem>
            ))}
          </BulletList>
        </JobBlock>
      </Section>

      <Section>
        <SectionTitle>Education</SectionTitle>
        <EducationBlock>
          <SchoolName>Boston University</SchoolName>
          <SchoolLocation>Boston, Massachusetts</SchoolLocation>
        </EducationBlock>
      </Section>

      <ToolsStrip>
        <MarqueeInner>
          {doubledTools.map((skill, index) => (
            <ToolItem key={`${skill}-${index}`}>{skill}</ToolItem>
          ))}
        </MarqueeInner>
      </ToolsStrip>
    </PageWrapper>
  );
}
