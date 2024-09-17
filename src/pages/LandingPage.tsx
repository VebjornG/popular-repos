import { RepositoryTable } from '../components/Table';
import { Typography } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

export const LandingPage = () => {
  return (
    <PageWrapper>
      <StyledTitle>100 most popular JS GitHub repositories</StyledTitle>
      <ContentWrapper>
        <RepositoryTable />
      </ContentWrapper>
    </PageWrapper>
  );
}; 

const StyledTitle = styled(Title)`
  text-align: center;
  font-size: 36px;
  font-weight: 600;
  letter-spacing: 1.5px;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Inter', sans-serif;
`;

const ContentWrapper = styled.div`
  width: 100%;
  border-radius: 12px;
`;
