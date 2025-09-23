import { Link, useLocation } from 'wouter';
import { GitBranch, Settings, User, LogOut } from 'lucide-react';
import { config } from '@/lib/config';

interface HeaderProps {
  user?: {
    username: string;
    avatarUrl?: string;
  } | null;
  onLogout?: () => void;
}

export default function Header({ user, onLogout }: HeaderProps) {
  const [location] = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Projects', href: '/projects' },
  ];

  return (
    <header className="bg-github-bg-secondary border-b border-github-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 text-github-text hover:text-github-primary transition-colors">
              <GitBranch className="h-8 w-8" />
              <span className="text-xl font-bold">{config.APP_NAME}</span>
            </Link>
          </div>

          {/* Navigation */}
          {user && (
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location === item.href
                      ? 'text-github-primary bg-github-bg-tertiary'
                      : 'text-github-text-secondary hover:text-github-text hover:bg-github-bg-tertiary'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          )}

          {/* User menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {user.avatarUrl ? (
                    <img
                      className="h-8 w-8 rounded-full border border-github-border"
                      src={user.avatarUrl}
                      alt={user.username}
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-github-bg-tertiary border border-github-border flex items-center justify-center">
                      <User className="h-4 w-4 text-github-text-secondary" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-github-text">{user.username}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    className="p-2 text-github-text-secondary hover:text-github-text hover:bg-github-bg-tertiary rounded-md transition-colors"
                    title="Settings"
                  >
                    <Settings className="h-4 w-4" />
                  </button>
                  <button
                    onClick={onLogout}
                    className="p-2 text-github-text-secondary hover:text-github-danger hover:bg-github-bg-tertiary rounded-md transition-colors"
                    title="Logout"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="btn-primary">
                Sign in with GitHub
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}