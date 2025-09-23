import { Link } from 'wouter';
import { GitBranch, Zap, Shield, Globe, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { config } from '@/lib/config';

export default function HomePage() {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-github-primary" />,
      title: 'Lightning Fast Deployments',
      description: 'Deploy your GitHub repositories in seconds with our optimized CI/CD pipeline.',
    },
    {
      icon: <Shield className="h-8 w-8 text-github-primary" />,
      title: 'Secure & Reliable',
      description: 'Built with security best practices and 99.9% uptime guarantee.',
    },
    {
      icon: <Globe className="h-8 w-8 text-github-primary" />,
      title: 'Global Distribution',
      description: 'Deploy to multiple regions worldwide with automatic scaling.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-github-bg via-github-bg-secondary to-github-bg-tertiary">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzMDM2M2QiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-3">
                <GitBranch className="h-16 w-16 text-github-primary" />
                <div className="text-left">
                  <h1 className="text-5xl font-bold text-github-text">{config.APP_NAME}</h1>
                  <p className="text-xl text-github-text-secondary">CI/CD Platform</p>
                </div>
              </div>
            </div>

            {/* Hero Content */}
            <h2 className="text-4xl md:text-6xl font-bold text-github-text mb-6">
              Deploy with
              <span className="text-github-primary"> Confidence</span>
            </h2>
            
            <p className="text-xl text-github-text-secondary mb-12 max-w-3xl mx-auto">
              Streamline your development workflow with automated deployments, 
              continuous integration, and seamless GitHub integration.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={config.GITHUB_AUTH_URL} className="inline-flex">
                <Button size="lg" className="text-lg px-8 py-4">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Get Started with GitHub
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <Link href="/projects" className="inline-flex">
                <Button variant="secondary" size="lg" className="text-lg px-8 py-4">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-github-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-github-text mb-4">
              Why Choose AutoFlow?
            </h3>
            <p className="text-lg text-github-text-secondary max-w-2xl mx-auto">
              Built for developers who want to focus on code, not infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:border-github-primary transition-colors">
                <CardContent>
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-github-text mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-github-text-secondary">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-24 bg-github-bg">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-github-text mb-6">
            Ready to accelerate your development?
          </h3>
          <p className="text-xl text-github-text-secondary mb-8">
            Join thousands of developers who trust AutoFlow for their deployments.
          </p>
          <a href={config.GITHUB_AUTH_URL} className="inline-flex">
            <Button size="lg" className="text-lg px-8 py-4">
              Start Deploying Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}