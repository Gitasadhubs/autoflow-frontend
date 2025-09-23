import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { config } from './config';
import type { User, Project, Deployment, Activity, ApiResponse, PaginatedResponse } from '@/types/api';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: config.API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.log('🚀 API Request:', config.method?.toUpperCase(), config.url, config.data);
    }
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (import.meta.env.DEV) {
      console.log('✅ API Response:', response.status, response.data);
    }
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', error);
    if (error.response?.status === 401) {
      // Handle authentication errors
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API functions
export const authApi = {
  // Get current user
  getCurrentUser: (): Promise<ApiResponse<User>> =>
    api.get('/api/auth/user').then(res => res.data),
  
  // Logout user
  logout: (): Promise<ApiResponse<null>> =>
    api.post('/api/auth/logout').then(res => res.data),
};

export const projectsApi = {
  // Get all projects for current user
  getProjects: (): Promise<PaginatedResponse<Project>> =>
    api.get('/api/projects').then(res => res.data),
  
  // Get project by ID
  getProject: (id: string): Promise<ApiResponse<Project>> =>
    api.get(`/api/projects/${id}`).then(res => res.data),
  
  // Create new project
  createProject: (data: { repositoryUrl: string; framework: string }): Promise<ApiResponse<Project>> =>
    api.post('/api/projects', data).then(res => res.data),
  
  // Update project
  updateProject: (id: string, data: Partial<Project>): Promise<ApiResponse<Project>> =>
    api.put(`/api/projects/${id}`, data).then(res => res.data),
  
  // Delete project
  deleteProject: (id: string): Promise<ApiResponse<null>> =>
    api.delete(`/api/projects/${id}`).then(res => res.data),
  
  // Trigger deployment
  deployProject: (id: string): Promise<ApiResponse<Deployment>> =>
    api.post(`/api/projects/${id}/deploy`).then(res => res.data),
};

export const deploymentsApi = {
  // Get deployments for a project
  getDeployments: (projectId: string): Promise<PaginatedResponse<Deployment>> =>
    api.get(`/api/projects/${projectId}/deployments`).then(res => res.data),
  
  // Get deployment by ID
  getDeployment: (id: string): Promise<ApiResponse<Deployment>> =>
    api.get(`/api/deployments/${id}`).then(res => res.data),
  
  // Get deployment logs
  getDeploymentLogs: (id: string): Promise<ApiResponse<string>> =>
    api.get(`/api/deployments/${id}/logs`).then(res => res.data),
};

export const activitiesApi = {
  // Get user activities
  getActivities: (): Promise<PaginatedResponse<Activity>> =>
    api.get('/api/activities').then(res => res.data),
};

export const healthApi = {
  // Health check
  check: (): Promise<ApiResponse<{ status: string; timestamp: string }>> =>
    api.get('/api/health').then(res => res.data),
};

export default api;
