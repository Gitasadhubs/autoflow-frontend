import { Router, Route, Switch } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/layout/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProjectsPage from './pages/ProjectsPage';
import NotFoundPage from './pages/NotFoundPage';
import { authApi } from '@/lib/api';
import type { User } from '@/types/api';

function App() {
  // Fetch current user
  const { data: userResponse, isLoading } = useQuery<User>({
    queryKey: ['user'],
    queryFn: authApi.getCurrentUser,
    retry: false,
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const user: User | null = userResponse || null;

  const handleLogout = async () => {
    try {
      await authApi.logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-github-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-github-primary mx-auto"></div>
          <p className="mt-4 text-github-text-secondary">Loading AutoFlow...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-github-bg">
        <Header user={user} onLogout={handleLogout} />
        
        <main className="flex-1">
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/dashboard">
              {user ? <DashboardPage user={user} /> : <LoginPage />}
            </Route>
            <Route path="/projects">
              {user ? <ProjectsPage user={user} /> : <LoginPage />}
            </Route>
            <Route component={NotFoundPage} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
