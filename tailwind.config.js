/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // GitHub color palette
        github: {
          bg: '#0d1117',
          'bg-secondary': '#161b22',
          'bg-tertiary': '#21262d',
          border: '#30363d',
          'border-muted': '#21262d',
          text: '#e6edf3',
          'text-secondary': '#7d8590',
          'text-muted': '#656d76',
          primary: '#238636',
          'primary-hover': '#2ea043',
          blue: '#1f6feb',
          'blue-hover': '#388bfd',
          danger: '#da3633',
          'danger-hover': '#f85149',
          warning: '#9e6a03',
          'warning-hover': '#bf8700',
        },
        // Light mode colors
        'github-light': {
          bg: '#ffffff',
          'bg-secondary': '#f6f8fa',
          'bg-tertiary': '#f1f3f4',
          border: '#d0d7de',
          'border-muted': '#d8dee4',
          text: '#1f2328',
          'text-secondary': '#656d76',
          'text-muted': '#848d97',
          primary: '#1f883d',
          'primary-hover': '#1a7f37',
          blue: '#0969da',
          'blue-hover': '#0550ae',
          danger: '#cf222e',
          'danger-hover': '#a40e26',
          warning: '#9a6700',
          'warning-hover': '#7d5600',
        }
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace'],
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif']
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem'
      }
    },
  },
  plugins: [],
}