import React, { useState } from 'react'; // Added useState to import
import styled from 'styled-components';
import { Section, SubmitButton } from './style';
import { useNavigate } from 'react-router-dom'; // Added for navigation

const PrivacySection = styled(Section)`
  margin-top: 20px;
`;

const SectionTitle = styled.h2`  // Added missing SectionTitle component
  margin-bottom: 20px;
`;

const ConsentCheckbox = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 15px 0;
  
  input {
    margin-right: 10px;
    margin-top: 4px;
  }
`;

const ConsentText = styled.label`
  font-size: 14px;
  line-height: 1.4;
  color: #666;
`;

const Link = styled.a`
  color: #007bff;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const SecondaryButton = styled(SubmitButton)`
  background: white;
  color: #007bff;
  border: 2px solid #007bff;
  
  &:hover {
    background: #f8f9fa;
  }
`;

const Privacy = ({handleSubmit, hasConsent, setHasConsent}) => {
  
  
 

  return (
    <>
      <PrivacySection>
        <SectionTitle>Privacy and Data Consent</SectionTitle>
        <ConsentCheckbox>
          <input
            type="checkbox"
            id="consent"
            checked={hasConsent}
            onChange={(e) => setHasConsent(e.target.checked)}
          />
          <ConsentText htmlFor="consent">
            I agree to the <Link href="/privacy-policy" target="_blank">Privacy Policy</Link> and{' '}
            <Link href="/terms-of-service" target="_blank">Terms of Service</Link>. I understand that my learning data 
            will be collected to personalize my experience and track my progress.
          </ConsentText>
        </ConsentCheckbox>
      </PrivacySection>
      
      <ButtonGroup>
        <SubmitButton type="submit" disabled={!hasConsent} onClick={handleSubmit}>
          Start Learning
        </SubmitButton>
        {/* <SecondaryButton type="button" onClick={() => navigate('/courses')} disabled={!hasConsent}>
          Explore Courses
        </SecondaryButton> */}
      </ButtonGroup>
    </>
  );
};

export default Privacy;