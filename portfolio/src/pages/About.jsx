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
  'Co-led an agile development team of 5+ engineers in delivering Loyal Health\'s Search engine and Scheduling Appointment products, achieving a 25% boost in system responsiveness and enhancing user engagement.',
  'Defined the product roadmap for the Search engine and Scheduling Appointment products, collaborated with PM to prioritize features based on user feedback and strategic goals. Led to a 30% increase in user satisfaction and engagement, as measured through post-launch user surveys.',
  'Worked on microservices for continuous delivery environments using Azure, Docker. Involved in setting up a microservice architecture for application development on the frontend allowing for teams to independently deploy to production.',
  'Shipped features using React & Redux, Typescript in the Node environment & styled-components, along with backend architecture design & API development; heavily collaborated with the Design team when creating the design prototypes in order to communicate the engineering requirements/caveats with design.',
  'Enabled Loyal to meet internal team goals by re-architecting apps and making our product be container-responsive while removing all usage of media queries. Created custom, responsive width functions, utilized React hooks and the React Context API.',
  'Architected and owned the Search Profile Settings initiative, prioritizing critical features to ensure the Search engine product meets client needs. Broke concept into bite sized components/user stories for our team to understand, used feature flags. Successfully addressed last-minute challenges and delivered the feature 2 days ahead of schedule, enabling its installation across 134 live hospital sites.',
  'Led with full technical vision of Loyal\'s Promotions feature that allowed hospital providers to be promoted within their area of specialty. Involved in creating Redux state management/data flow diagrams, and directed conversations with teammates to connect our reusable components together.',
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
