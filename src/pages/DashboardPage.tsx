import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { 
  GitBranch, 
  Rocket, 
  Activity, 
  Clock, 
  TrendingUp, 
  Plus,
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { projectsApi, activitiesApi } from '@/lib/api';
import { formatRelativeTime, getFrameworkIcon } from '@/lib/utils';
import type { User } from '@/types/api';

interface DashboardPageProps {
  user: User;
}

export default function DashboardPage({ user }: DashboardPageProps) {
  // Fetch dashboard data
  const { data: projectsResponse, isLoading: projectsLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: projectsApi.getProjects,
  });

  const { data: activitiesResponse, isLoading: activitiesLoading } = useQuery({
    queryKey: ['activities'],
    queryFn: activitiesApi.getActivities,
  });

  const projects = projectsResponse?.data || [];
  const activities = activitiesResponse?.data || [];

  // Calculate stats
  const stats = {
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'active').length,
    totalDeployments: activities.filter(a => a.type === 'deployment_completed').length,
    successRate: projects.length > 0 ? 
      Math.round((projects.filter(p => p.status === 'active').length / projects.length) * 100) : 0,
  };

  const recentProjects = projects.slice(0, 3);
  const recentActivities = activities.slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-github-text mb-2">
          Welcome back, {user.username}! 👋
        </h1>
        <p className="text-github-text-secondary">
          Here's what's happening with your projects today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-github-primary/10 rounded-lg">
                <GitBranch className="h-6 w-6 text-github-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-github-text-secondary">Total Projects</p>
                <p className="text-2xl font-bold text-github-text">{stats.totalProjects}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Rocket className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-github-text-secondary">Active Projects</p>
                <p className="text-2xl font-bold text-github-text">{stats.activeProjects}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-github-text-secondary">Deployments</p>
                <p className="text-2xl font-bold text-github-text">{stats.totalDeployments}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Activity className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-github-text-secondary">Success Rate</p>
                <p className="text-2xl font-bold text-github-text">{stats.successRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Projects */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Projects</CardTitle>
            <Link href="/projects">
              <Button variant="ghost" size="sm">
                View All
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {projectsLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-github-bg-tertiary rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-github-bg-tertiary rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : recentProjects.length > 0 ? (
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-4 border border-github-border rounded-lg hover:border-github-primary transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{getFrameworkIcon(project.framework)}</span>
                      <div>
                        <h4 className="font-medium text-github-text">{project.name}</h4>
                        <p className="text-sm text-github-text-secondary">
                          {project.lastDeployedAt ? 
                            `Deployed ${formatRelativeTime(project.lastDeployedAt)}` : 
                            'Not deployed yet'
                          }
                        </p>
                      </div>
                    </div>
                    <Badge status={project.status}>
                      {project.status}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="h-12 w-12 text-github-text-secondary mx-auto mb-4" />
                <h4 className="text-lg font-medium text-github-text mb-2">No projects yet</h4>
                <p className="text-github-text-secondary mb-4">
                  Create your first project to get started
                </p>
                <Link href="/projects">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Project
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {activitiesLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-github-bg-tertiary rounded w-2/3 mb-2"></div>
                    <div className="h-3 bg-github-bg-tertiary rounded w-1/3"></div>
                  </div>
                ))}
              </div>
            ) : recentActivities.length > 0 ? (
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      <Clock className="h-4 w-4 text-github-text-secondary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-github-text">
                        {activity.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </p>
                      <p className="text-xs text-github-text-secondary">
                        {formatRelativeTime(activity.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Activity className="h-12 w-12 text-github-text-secondary mx-auto mb-4" />
                <p className="text-github-text-secondary">No recent activity</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/projects" className="block">
                <div className="p-4 border border-github-border rounded-lg hover:border-github-primary transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Plus className="h-6 w-6 text-github-primary" />
                    <div>
                      <h4 className="font-medium text-github-text">New Project</h4>
                      <p className="text-sm text-github-text-secondary">
                        Connect a repository and start deploying
                      </p>
                    </div>
                  </div>
                </div>
              </Link>

              <div className="p-4 border border-github-border rounded-lg hover:border-github-primary transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <Rocket className="h-6 w-6 text-github-primary" />
                  <div>
                    <h4 className="font-medium text-github-text">Deploy Latest</h4>
                    <p className="text-sm text-github-text-secondary">
                      Trigger deployments for active projects
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-github-border rounded-lg hover:border-github-primary transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <Activity className="h-6 w-6 text-github-primary" />
                  <div>
                    <h4 className="font-medium text-github-text">View Analytics</h4>
                    <p className="text-sm text-github-text-secondary">
                      Monitor performance and metrics
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}