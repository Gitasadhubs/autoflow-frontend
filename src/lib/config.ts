// Environment configuration
export const config = {
  // API URLs - using relative URLs for Vercel proxy (first-party calls)
  API_URL: import.meta.env.VITE_API_URL || '',
  GITHUB_AUTH_URL: import.meta.env.VITE_GITHUB_AUTH_URL || '/api/auth/github',
  
  // App settings
  APP_NAME: 'AutoFlow',
  APP_DESCRIPTION: 'GitHub CI/CD Platform',
  
  // Development settings
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
} as const;
