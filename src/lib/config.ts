// Environment configuration
export const config = {
  // API URLs - will be set via environment variables
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  GITHUB_AUTH_URL: import.meta.env.VITE_GITHUB_AUTH_URL || 'http://localhost:5000/api/auth/github',
  
  // App settings
  APP_NAME: 'AutoFlow',
  APP_DESCRIPTION: 'GitHub CI/CD Platform',
  
  // Development settings
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
} as const;