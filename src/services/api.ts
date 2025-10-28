// API configuration for Hangman game
// Frontend on Vercel, Backend on Railway
export const API_URL = import.meta.env.VITE_API_URL || 'https://the-8bits-hangman-api-production.up.railway.app';

// Default headers for API requests
export const headers = {
  'Content-Type': 'application/json',
};

// Add auth token to headers if available
export function getAuthHeaders() {
  const token = localStorage.getItem('auth_token');
  return token
    ? { ...headers, 'Authorization': `Bearer ${token}` }
    : headers;
}

// Store authentication token
export function setAuthToken(token: string) {
  localStorage.setItem('auth_token', token);
}

// Remove authentication token
export function removeAuthToken() {
  localStorage.removeItem('auth_token');
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return localStorage.getItem('auth_token') !== null;
}

// Standard response handler with error management
export async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'An unknown error occurred'
    }));
    throw new Error(error.message || `Error ${response.status}`);
  }
  return response.json();
}

// API endpoints based on backend routes
export const API_ENDPOINTS = {
  // Game endpoints
  GAMES: `${API_URL}/api/games`,
  GAME: (id: string) => `${API_URL}/api/games/${id}`,
  GUESS: (id: string) => `${API_URL}/api/games/${id}/guess`,
  HINT: (id: string) => `${API_URL}/api/games/${id}/hint`,
  
  // User endpoints
  REGISTER: `${API_URL}/api/users/register`,
  LOGIN: `${API_URL}/api/users/login`,
  
  // Leaderboard endpoints
  LEADERBOARD: `${API_URL}/api/leaderboard`,
};