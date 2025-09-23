import { GitBranch, Lock, Shield, Zap } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { config } from '@/lib/config';

export default function LoginPage() {
  const benefits = [
    {
      icon: <Shield className="h-6 w-6 text-github-primary" />,
      title: 'Secure Authentication',
      description: 'OAuth integration with GitHub for secure access',
    },
    {
      icon: <Zap className="h-6 w-6 text-github-primary" />,
      title: 'Instant Setup',
      description: 'Start deploying in under 60 seconds',
    },
    {
      icon: <Lock className="h-6 w-6 text-github-primary" />,
      title: 'Privacy First',
      description: 'We only access what you authorize',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-github-bg via-github-bg-secondary to-github-bg-tertiary flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <GitBranch className="h-16 w-16 text-github-primary" />
          </div>
          <h1 className="text-3xl font-bold text-github-text mb-2">
            Welcome to {config.APP_NAME}
          </h1>
          <p className="text-github-text-secondary">
            Sign in with your GitHub account to get started
          </p>
        </div>

        {/* Login Card */}
        <Card className="bg-github-bg-secondary border-github-border">
          <CardHeader>
            <CardTitle className="text-center">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <a href={config.GITHUB_AUTH_URL} className="block w-full">
              <Button size="lg" className="w-full text-base">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                Continue with GitHub
              </Button>
            </a>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-github-text-secondary">
                By signing in, you agree to our terms of service and privacy policy.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <div className="space-y-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {benefit.icon}
              </div>
              <div>
                <h4 className="text-sm font-medium text-github-text">
                  {benefit.title}
                </h4>
                <p className="text-sm text-github-text-secondary">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-github-text-muted">
            Trusted by developers worldwide
          </p>
        </div>
      </div>
    </div>
  );
}