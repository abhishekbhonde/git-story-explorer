export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string;
  location: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

export interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: {
    name: string;
  };
  payload: {
    commits?: { message: string }[];
    action?: string;
  };
}

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  const response = await fetch(`https://api.github.com/users/${username}`);
  if (!response.ok) {
    throw new Error('User not found');
  }
  return response.json();
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
  if (!response.ok) {
    throw new Error('Failed to fetch repos');
  }
  return response.json();
}

export async function fetchGitHubEvents(username: string): Promise<GitHubEvent[]> {
  const response = await fetch(`https://api.github.com/users/${username}/events?per_page=100`);
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  return response.json();
}

export function calculateStats(user: GitHubUser, repos: GitHubRepo[], events: GitHubEvent[]) {
  // Calculate total stars
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  
  // Calculate language distribution
  const languageCount: Record<string, number> = {};
  repos.forEach(repo => {
    if (repo.language) {
      languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
    }
  });
  
  const topLanguages = Object.entries(languageCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([lang, count]) => ({ 
      language: lang, 
      count, 
      percentage: Math.round((count / repos.length) * 100) 
    }));
  
  // Get top repos by stars
  const topRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5);
  
  // Count commits from push events
  const pushEvents = events.filter(e => e.type === 'PushEvent');
  const totalCommits = pushEvents.reduce((sum, event) => 
    sum + (event.payload.commits?.length || 0), 0
  );
  
  // Count PRs
  const prEvents = events.filter(e => e.type === 'PullRequestEvent');
  const totalPRs = prEvents.length;
  
  // Analyze activity by day
  const dayCount: Record<string, number> = {
    'Sunday': 0, 'Monday': 0, 'Tuesday': 0, 'Wednesday': 0, 
    'Thursday': 0, 'Friday': 0, 'Saturday': 0
  };
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  events.forEach(event => {
    const day = new Date(event.created_at).getDay();
    dayCount[days[day]]++;
  });
  
  const favoriteDay = Object.entries(dayCount)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || 'Monday';
  
  // Analyze activity by hour
  const hourCount: Record<number, number> = {};
  events.forEach(event => {
    const hour = new Date(event.created_at).getHours();
    hourCount[hour] = (hourCount[hour] || 0) + 1;
  });
  
  const peakHour = Object.entries(hourCount)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || '12';
  
  // Determine developer archetype
  const hour = parseInt(peakHour);
  let archetype = 'The Steady Coder';
  if (hour >= 22 || hour < 5) archetype = 'The Night Owl';
  else if (hour >= 5 && hour < 9) archetype = 'The Early Bird';
  else if (hour >= 9 && hour < 17) archetype = 'The 9-to-5 Pro';
  else if (hour >= 17 && hour < 22) archetype = 'The Evening Hacker';
  
  // Years on GitHub
  const yearsOnGitHub = new Date().getFullYear() - new Date(user.created_at).getFullYear();
  
  return {
    totalStars,
    totalCommits,
    totalPRs,
    topLanguages,
    topRepos,
    favoriteDay,
    peakHour: parseInt(peakHour),
    archetype,
    dayCount,
    yearsOnGitHub
  };
}
