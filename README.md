# AutoFlow Frontend

A modern, GitHub-themed frontend for the AutoFlow CI/CD platform. Built with React, TypeScript, Vite, and Tailwind CSS.

## 🚀 Features

- **GitHub-themed UI**: Professional design following GitHub's visual language
- **React 18**: Modern React with hooks and functional components  
- **TypeScript**: Full type safety and better developer experience
- **Vite**: Lightning-fast development and optimized builds
- **Tailwind CSS**: Utility-first CSS with GitHub color palette
- **Wouter**: Lightweight routing optimized for Vercel deployment
- **React Query**: Powerful data fetching and state management
- **Responsive Design**: Mobile-first approach with desktop optimization

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Header, etc.)
│   └── ui/             # Base UI components (Button, Card, etc.)
├── hooks/              # Custom React hooks
├── lib/                # Utilities and configurations
│   ├── api.ts          # API client and endpoints
│   ├── config.ts       # Environment configuration
│   └── utils.ts        # Helper functions
├── pages/              # Page components
│   ├── HomePage.tsx    # Landing page (/)
│   ├── LoginPage.tsx   # Authentication (/login)
│   ├── DashboardPage.tsx # User dashboard (/dashboard)
│   ├── ProjectsPage.tsx  # Projects management (/projects)
│   └── NotFoundPage.tsx  # 404 error page
├── types/              # TypeScript type definitions
│   └── api.ts          # API response types
└── App.tsx             # Main application component
```

## 🛠️ Development Setup

### Prerequisites

- Node.js 20+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd autoflow-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your API URLs:
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_GITHUB_AUTH_URL=http://localhost:5000/api/auth/github
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:5000`

### Available Scripts

- `npm run dev` - Start development server on port 5000
- `npm run build` - Build for production
- `npm run start` - Preview production build  
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Run ESLint

## 🎨 Design System

### GitHub Color Palette

The application uses a comprehensive GitHub-inspired color system:

**Dark Theme Colors:**
- Background: `#0d1117` (github-bg)
- Secondary: `#161b22` (github-bg-secondary)  
- Tertiary: `#21262d` (github-bg-tertiary)
- Primary: `#238636` (github-primary)
- Text: `#e6edf3` (github-text)

**Components:**
- **Buttons**: Primary, secondary, danger, and ghost variants
- **Cards**: Clean borders with GitHub-style shadows
- **Badges**: Status indicators with contextual colors
- **Forms**: Consistent input styling with focus states

## 🔌 Backend Integration

### API Configuration

The frontend connects to the AutoFlow backend API:

```typescript
// Production
VITE_API_URL=https://autoflow-backend-production.up.railway.app
VITE_GITHUB_AUTH_URL=https://autoflow-backend-production.up.railway.app/api/auth/github

// Development  
VITE_API_URL=http://localhost:5000
VITE_GITHUB_AUTH_URL=http://localhost:5000/api/auth/github
```

### Authentication Flow

1. User clicks "Login with GitHub" 
2. Redirects to backend OAuth endpoint
3. GitHub handles authentication
4. Backend processes and creates session
5. User redirected back to dashboard
6. Frontend fetches user data and maintains session

### API Endpoints

- **Authentication**: `/api/auth/*`
- **Projects**: `/api/projects/*`  
- **Deployments**: `/api/deployments/*`
- **Activities**: `/api/activities/*`
- **Health Check**: `/api/health`

## 🚀 Deployment

### Vercel Deployment

The application is optimized for Vercel deployment:

1. **Connect Repository**
   - Import GitHub repository to Vercel
   - Vercel auto-detects Vite configuration

2. **Environment Variables**
   Set in Vercel dashboard:
   ```
   VITE_API_URL=https://your-backend.up.railway.app
   VITE_GITHUB_AUTH_URL=https://your-backend.up.railway.app/api/auth/github
   ```

3. **Build Configuration**
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Routing Configuration**
   `vercel.json` handles SPA routing:
   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```

### Production Checklist

- ✅ Environment variables configured
- ✅ Backend API accessible 
- ✅ GitHub OAuth configured
- ✅ Vercel routing setup
- ✅ Build process working
- ✅ TypeScript compilation clean

## 🧪 Testing

### Development Testing

1. **Start backend server** (Railway or local)
2. **Start frontend server**: `npm run dev`
3. **Test authentication flow** 
4. **Verify API connectivity**
5. **Test all page routes**

### Production Testing

1. **Deploy to Vercel**
2. **Test OAuth integration**
3. **Verify API calls work**
4. **Test responsive design**
5. **Check performance metrics**

## 🔧 Troubleshooting

### Common Issues

**Build Errors:**
- Ensure all dependencies in `dependencies` not `devDependencies`
- Check TypeScript compilation: `npm run type-check`

**API Connection:**
- Verify environment variables
- Check CORS configuration on backend
- Ensure backend is accessible from frontend domain

**Authentication Issues:**
- Verify GitHub OAuth app configuration
- Check callback URLs match backend configuration
- Ensure session cookies are working

**Routing Problems:**
- Confirm `vercel.json` is properly configured
- Test SPA routing locally with `npm run start`

## 📄 License

This project is part of the AutoFlow CI/CD platform.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes with proper TypeScript types
4. Test thoroughly
5. Submit pull request

For questions or support, please contact the AutoFlow team.