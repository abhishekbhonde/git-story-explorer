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
    size?: number;
    distinct_size?: number;
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
  // Calculate total stars from repos
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  
  // Calculate total forks
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
  
  // Calculate language distribution from repos
  const languageCount: Record<string, number> = {};
  repos.forEach(repo => {
    if (repo.language) {
      languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
    }
  });
  
  const totalWithLanguage = repos.filter(r => r.language).length || 1;
  const topLanguages = Object.entries(languageCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([lang, count]) => ({ 
      language: lang, 
      count, 
      percentage: Math.round((count / totalWithLanguage) * 100) 
    }));
  
  // Get top repos by stars
  const topRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5);
  
  // Count commits from PushEvents
  // Priority: payload.size (total commits) > payload.commits.length > payload.distinct_size > 1
  const pushEvents = events.filter(e => e.type === 'PushEvent');
  let totalCommits = 0;
  pushEvents.forEach(event => {
    // payload.size = total number of commits in the push (most reliable)
    // payload.commits = array of commits (may be truncated)
    // payload.distinct_size = number of distinct commits (excludes duplicates)
    if (event.payload.size !== undefined && event.payload.size !== null) {
      totalCommits += event.payload.size;
    } else if (event.payload.commits && event.payload.commits.length > 0) {
      totalCommits += event.payload.commits.length;
    } else if (event.payload.distinct_size !== undefined && event.payload.distinct_size !== null) {
      totalCommits += event.payload.distinct_size;
    } else {
      // Fallback: each push event is at least 1 commit
      totalCommits += 1;
    }
  });
  
  // Count PRs - only count opened, merged, or reopened PRs (not closed/synchronize)
  const prEvents = events.filter(e => {
    if (e.type !== 'PullRequestEvent') return false;
    const action = e.payload.action;
    // Count opened, closed (merged), reopened, but not synchronize
    return action === 'opened' || action === 'closed' || action === 'reopened';
  });
  const totalPRs = prEvents.length;
  
  // Count issues opened
  const issueEvents = events.filter(e => e.type === 'IssuesEvent' && e.payload.action === 'opened');
  const totalIssues = issueEvents.length;
  
  // Analyze activity by day of week
  const dayCount: Record<string, number> = {
    'Sunday': 0, 'Monday': 0, 'Tuesday': 0, 'Wednesday': 0, 
    'Thursday': 0, 'Friday': 0, 'Saturday': 0
  };
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  events.forEach(event => {
    const day = new Date(event.created_at).getDay();
    dayCount[days[day]]++;
  });
  
  // Find favorite day (most active)
  const sortedDays = Object.entries(dayCount).sort((a, b) => b[1] - a[1]);
  const favoriteDay = sortedDays[0]?.[1] > 0 ? sortedDays[0][0] : 'Monday';
  
  // Analyze activity by hour
  const hourCount: Record<number, number> = {};
  events.forEach(event => {
    const hour = new Date(event.created_at).getHours();
    hourCount[hour] = (hourCount[hour] || 0) + 1;
  });
  
  // Find peak hour
  const sortedHours = Object.entries(hourCount).sort((a, b) => b[1] - a[1]);
  const peakHour = sortedHours[0] ? parseInt(sortedHours[0][0]) : 12;
  
  // Determine developer archetype based on peak hour
  let archetype = 'The Steady Coder';
  if (peakHour >= 22 || peakHour < 5) archetype = 'The Night Owl';
  else if (peakHour >= 5 && peakHour < 9) archetype = 'The Early Bird';
  else if (peakHour >= 9 && peakHour < 17) archetype = 'The 9-to-5 Pro';
  else if (peakHour >= 17 && peakHour < 22) archetype = 'The Evening Hacker';
  
  // Calculate years on GitHub
  const yearsOnGitHub = new Date().getFullYear() - new Date(user.created_at).getFullYear();
  
  // Count total events by type for debugging
  const eventTypeCounts: Record<string, number> = {};
  events.forEach(event => {
    eventTypeCounts[event.type] = (eventTypeCounts[event.type] || 0) + 1;
  });
  
  console.log('GitHub Stats Debug:', {
    totalEvents: events.length,
    pushEvents: pushEvents.length,
    eventTypeCounts,
    totalCommits,
    totalPRs
  });
  
  return {
    totalStars,
    totalForks,
    totalCommits,
    totalPRs,
    totalIssues,
    topLanguages,
    topRepos,
    favoriteDay,
    peakHour,
    archetype,
    dayCount,
    yearsOnGitHub,
    totalEvents: events.length
  };
}
