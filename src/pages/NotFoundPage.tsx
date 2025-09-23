import { Link } from 'wouter';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-github-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="text-center">
          <CardContent className="py-12">
            {/* 404 Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <AlertTriangle className="h-24 w-24 text-github-danger" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-github-danger">404</span>
                </div>
              </div>
            </div>

            {/* Error Message */}
            <h1 className="text-3xl font-bold text-github-text mb-4">
              Page Not Found
            </h1>
            <p className="text-github-text-secondary mb-8 leading-relaxed">
              The page you're looking for doesn't exist or has been moved to a new location.
              Please check the URL or return to the homepage.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => window.history.back()} variant="secondary">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
              <Link href="/">
                <Button>
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Additional Help */}
        <div className="mt-8 text-center">
          <p className="text-sm text-github-text-secondary mb-4">
            Still having trouble? Here are some helpful links:
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center text-sm">
            <Link href="/dashboard" className="text-github-primary hover:underline">
              Dashboard
            </Link>
            <span className="hidden sm:inline text-github-text-secondary">•</span>
            <Link href="/projects" className="text-github-primary hover:underline">
              Projects
            </Link>
            <span className="hidden sm:inline text-github-text-secondary">•</span>
            <a 
              href="mailto:support@autoflow.com" 
              className="text-github-primary hover:underline"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}