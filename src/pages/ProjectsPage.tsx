import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Plus, 
  GitBranch, 
  ExternalLink, 
  Trash2, 
  Rocket, 
  Settings,
  Search,
  Filter,
  AlertCircle
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { projectsApi } from '@/lib/api';
import { formatRelativeTime, getFrameworkIcon, getRepoNameFromUrl } from '@/lib/utils';
import type { User, Project } from '@/types/api';

interface ProjectsPageProps {
  user: User;
}

export default function ProjectsPage({ }: ProjectsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFramework, setSelectedFramework] = useState<string>('all');
  const queryClient = useQueryClient();

  // Fetch projects
  const { data: projectsResponse, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: projectsApi.getProjects,
  });

  // Create project mutation
  const createProjectMutation = useMutation({
    mutationFn: projectsApi.createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  // Deploy project mutation
  const deployProjectMutation = useMutation({
    mutationFn: projectsApi.deployProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  // Delete project mutation
  const deleteProjectMutation = useMutation({
    mutationFn: projectsApi.deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const projects = projectsResponse?.data || [];

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         getRepoNameFromUrl(project.repositoryUrl).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFramework = selectedFramework === 'all' || project.framework === selectedFramework;
    return matchesSearch && matchesFramework;
  });

  const frameworks = ['all', ...Array.from(new Set(projects.map(p => p.framework)))];

  const handleDeploy = (projectId: string) => {
    deployProjectMutation.mutate(projectId);
  };

  const handleDelete = (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProjectMutation.mutate(projectId);
    }
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-github-text mb-2">Failed to load projects</h3>
          <p className="text-github-text-secondary">Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-github-text mb-2">Projects</h1>
          <p className="text-github-text-secondary">
            Manage your repositories and deployments
          </p>
        </div>
        <Button
          onClick={() => {
            const repoUrl = prompt('Enter GitHub repository URL:');
            if (repoUrl) {
              const framework = prompt('Enter framework (react, vue, angular, nextjs, nodejs, static, etc.):') || 'static';
              createProjectMutation.mutate({ repositoryUrl: repoUrl, framework });
            }
          }}
          loading={createProjectMutation.isPending}
          className="mt-4 sm:mt-0"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-github-text-secondary" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10 w-full"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-github-text-secondary" />
          <select
            value={selectedFramework}
            onChange={(e) => setSelectedFramework(e.target.value)}
            className="input pl-10 pr-8 appearance-none bg-github-bg"
          >
            {frameworks.map(framework => (
              <option key={framework} value={framework}>
                {framework === 'all' ? 'All Frameworks' : framework}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-github-bg-tertiary rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-github-bg-tertiary rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-github-bg-tertiary rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDeploy={handleDeploy}
              onDelete={handleDelete}
              isDeploying={deployProjectMutation.isPending}
              isDeleting={deleteProjectMutation.isPending}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <GitBranch className="h-24 w-24 text-github-text-secondary mx-auto mb-6" />
          <h3 className="text-xl font-medium text-github-text mb-4">
            {projects.length === 0 ? 'No projects yet' : 'No projects match your search'}
          </h3>
          <p className="text-github-text-secondary mb-6 max-w-md mx-auto">
            {projects.length === 0 
              ? 'Connect your first GitHub repository to start deploying with AutoFlow.'
              : 'Try adjusting your search terms or filters to find what you\'re looking for.'
            }
          </p>
          {projects.length === 0 && (
            <Button
              onClick={() => {
                const repoUrl = prompt('Enter GitHub repository URL:');
                if (repoUrl) {
                  const framework = prompt('Enter framework (react, vue, angular, nextjs, nodejs, static, etc.):') || 'static';
                  createProjectMutation.mutate({ repositoryUrl: repoUrl, framework });
                }
              }}
              loading={createProjectMutation.isPending}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Project
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  onDeploy: (id: string) => void;
  onDelete: (id: string) => void;
  isDeploying: boolean;
  isDeleting: boolean;
}

function ProjectCard({ project, onDeploy, onDelete, isDeploying, isDeleting }: ProjectCardProps) {
  return (
    <Card className="hover:border-github-primary transition-colors">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl">{getFrameworkIcon(project.framework)}</span>
            <div>
              <CardTitle className="text-lg">{project.name}</CardTitle>
              <p className="text-sm text-github-text-secondary">
                {getRepoNameFromUrl(project.repositoryUrl)}
              </p>
            </div>
          </div>
          <Badge status={project.status}>
            {project.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        {project.description && (
          <p className="text-github-text-secondary text-sm mb-4">
            {project.description}
          </p>
        )}

        <div className="space-y-3">
          {/* Deployment info */}
          <div className="text-sm">
            <span className="text-github-text-secondary">Last deployed: </span>
            <span className="text-github-text">
              {project.lastDeployedAt 
                ? formatRelativeTime(project.lastDeployedAt)
                : 'Never'
              }
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              onClick={() => onDeploy(project.id)}
              loading={isDeploying}
              className="flex-1"
            >
              <Rocket className="h-4 w-4 mr-1" />
              Deploy
            </Button>

            {project.deploymentUrl && (
              <a
                href={project.deploymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-github-text-secondary hover:text-github-primary transition-colors"
                title="View Deployment"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}

            <button
              className="p-2 text-github-text-secondary hover:text-github-primary transition-colors"
              title="Settings"
            >
              <Settings className="h-4 w-4" />
            </button>

            <button
              onClick={() => onDelete(project.id)}
              disabled={isDeleting}
              className="p-2 text-github-text-secondary hover:text-github-danger transition-colors"
              title="Delete Project"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}