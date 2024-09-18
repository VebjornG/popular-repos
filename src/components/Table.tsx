import { useState, useEffect } from 'react';
import  { fetchRepositories, GitHubApiResponse, Repository } from '../services/githubApi';
import { Table, Skeleton, Empty } from 'antd';
import styled from 'styled-components';
import { Pagination } from './Pagination';


export const RepositoryTable = () => {
  const [repos, setRepos] = useState<GitHubApiResponse>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [noData, setNoData] = useState<boolean>(false);

  const itemsPerPage = 20;
  const y = 600; // Table height

  // Fetch repositories on component mount
  useEffect(() => {
    const getRepos = async () => {
      try {
        const repositories = await fetchRepositories();
        setRepos(repositories);
      } catch (error) {
        console.error('Error fetching repositories:', error);
        setNoData(true);
      } finally {
        setLoading(false);
      }
    };

    getRepos();
  }, []);

  // Pagination logic

  // Index of the last item on the current page
  const indexOfLastRepo = currentPage * itemsPerPage;

  // Index of the first item on the current page
  const indexOfFirstRepo = indexOfLastRepo - itemsPerPage;

  // Get current page of items by slicing the array of repositories
  const currentRepos = repos?.items.slice(indexOfFirstRepo, indexOfLastRepo);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Repository) => (
        <a href={record.html_url} target="_blank">
          {text}
        </a>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 400,
      // Cannot use record?.description because some repositories have no description and record is non-nullable
      render: (text: string | null) => (
      <StyledDescription>
        {text || 'No description available'}
      </StyledDescription>),
    },
    {
      title: 'Stars',
      dataIndex: 'stargazers_count',
      key: 'stars',
    },
    {
      title: 'Forks',
      dataIndex: 'forks_count',
      key: 'forks',
    },
    {
      title: 'Owner',
      dataIndex: ['owner', 'login'],
      key: 'owner',
      render: (text: string, record: Repository) => (
        <a href={record.owner.html_url} target="_blank">
          {text}
        </a>
      ),
    },
    {
      title: 'Last Updated',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
  ];

  if (noData) {
    return <Empty />;
  }

  return (
    <StyledDiv>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <Table
            dataSource={currentRepos}
            columns={columns}
            rowKey="id"
            pagination={false} // Disable built-in pagination
            tableLayout="auto" // Allows columns to size based on content
            scroll={{ y }} // Sets the table body height to 600px
          />
          <Pagination 
            currentPage={currentPage} 
            totalItems={repos?.items.length || 0} 
            itemsPerPage={itemsPerPage} 
            onPageChange={onPageChange}
          />
        </>
      )}
    </StyledDiv>
  )
};

const StyledDiv = styled.div`
  display: flex; 
  justify-content: center;
  padding: 20px;
  flex-direction: column;
`;

const StyledDescription = styled.p`
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;