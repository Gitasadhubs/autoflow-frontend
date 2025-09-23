import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/lib/api';
import type { User } from '@/types/api';

export function useAuth() {
  const queryClient = useQueryClient();

  // Get current user
  const {
    data: userResponse,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['user'],
    queryFn: authApi.getCurrentUser,
    retry: false,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  const user: User | null = userResponse?.data || null;
  const isAuthenticated = !!user;

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.clear();
      window.location.href = '/';
    },
    onError: (error) => {
      console.error('Logout failed:', error);
      // Force redirect even if logout request fails
      queryClient.clear();
      window.location.href = '/';
    },
  });

  const logout = () => {
    logoutMutation.mutate();
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    logout,
    refetch,
    isLoggingOut: logoutMutation.isPending,
  };
}

export default useAuth;