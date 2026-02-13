// src/components/Footer.jsx
// Simple editorial footer on dark background

import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background: ${({ theme }) => theme.colors.oxideUmber};
  color: ${({ theme }) => theme.colors.linenCream};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md}
    ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

const FooterInner = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

const FooterLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const FooterRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  align-items: flex-start;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    align-items: flex-end;
    text-align: right;
  }
`;

const Small = styled.p`
  font-size: 0.8rem;
  opacity: 0.85;
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterInner>
        <FooterLeft>
          <Small>Currently available for select collaborations and products in bloom.</Small>
          <Small>© {new Date().getFullYear()} Rena Hahn. All rights reserved.</Small>
        </FooterLeft>
        <FooterRight>
          <Small>Made with love.</Small>
        </FooterRight>
      </FooterInner>
    </FooterWrapper>
  );
}

