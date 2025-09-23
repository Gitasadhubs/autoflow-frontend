import { z } from 'zod';

// User types
export const UserSchema = z.object({
  id: z.string(),
  githubId: z.string(),
  username: z.string(),
  email: z.string().email().optional(),
  avatarUrl: z.string().url().optional(),
  name: z.string().optional(),
  accessToken: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type User = z.infer<typeof UserSchema>;

// Project types
export const ProjectSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  description: z.string().optional(),
  repositoryUrl: z.string().url(),
  framework: z.enum(['react', 'vue', 'angular', 'nextjs', 'nuxtjs', 'svelte', 'static', 'nodejs', 'express', 'fastify', 'other']),
  deploymentUrl: z.string().url().optional(),
  status: z.enum(['active', 'inactive', 'error']),
  lastDeployedAt: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Project = z.infer<typeof ProjectSchema>;

// Deployment types
export const DeploymentSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  commitSha: z.string(),
  commitMessage: z.string(),
  status: z.enum(['pending', 'building', 'success', 'failed']),
  deploymentUrl: z.string().url().optional(),
  buildLogs: z.string().optional(),
  createdAt: z.string(),
  completedAt: z.string().optional(),
});

export type Deployment = z.infer<typeof DeploymentSchema>;

// Activity types
export const ActivitySchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.enum(['project_created', 'deployment_started', 'deployment_completed', 'deployment_failed', 'user_login']),
  projectId: z.string().optional(),
  deploymentId: z.string().optional(),
  metadata: z.record(z.any()).optional(),
  createdAt: z.string(),
});

export type Activity = z.infer<typeof ActivitySchema>;

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// API Error types
export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}