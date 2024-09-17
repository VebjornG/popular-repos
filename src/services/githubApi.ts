// Interface representing the owner of a repository
export interface RepositoryOwner {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

// Interface representing a GitHub repository
export interface Repository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  owner: RepositoryOwner;
  updated_at: string;     // ISO date string
}

// Interface representing the GitHub API response
export interface GitHubApiResponse {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
}

export const fetchRepositories = async (): Promise<GitHubApiResponse> => {
  try {
    // Fetch the top 100 most popular JavaScript repositories on GitHub
    const response = await fetch(
      'https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=100'
    );

    // Check if the response is OK, if not throw an error
    if (!response.ok) {
      throw new Error(`Failed to fetch repositories: ${response.statusText}`);
    }

    // Parse the JSON response
    const data: GitHubApiResponse = await response.json();
    return data;

  } catch (error) {
    console.error(`Failed to fetch repositories: ${error}`);

    // Return an empty response in case
    return {
      total_count: 0,
      incomplete_results: true,
      items: []
    };
  }
}