import styled from 'styled-components';
import { Button } from 'antd';

export interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ 
  currentPage, 
  totalItems, 
  itemsPerPage, 
  onPageChange 
}: PaginationProps) => {

  // Calculate the total number of pages with Math.ceil() 
  // as the totalItems may not be divisible by itemsPerPage in general
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Create an array of page numbers to render the pagination buttons
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <StyledDiv>
      <StyledButton
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </StyledButton>
      {pageNumbers.map((page) => (
        <StyledButton
          key={page}
          type={currentPage === page ? 'primary' : 'default'}
          onClick={() => onPageChange(page)}
        >
          {page}
        </StyledButton>
      ))}
      <StyledButton
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </StyledButton>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: flex; 
  justify-content: center;
  margin-top: 16px;
`;

const StyledButton = styled(Button)`
  margin: 0 4px;
`;