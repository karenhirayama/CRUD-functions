import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '../api';

import type { Post, NewPost, UpdatePost } from '../../types';

interface PostsResponse {
  results?: Post[];
}

const postsService = {
  endpoints: {
    getPosts: {
      query: () => ({
        url: '',
        method: 'GET' as const,
      }),
      transformResponse: (response: Post[] | PostsResponse): Post[] => {
        return Array.isArray(response) ? response : response.results || [];
      },
    },
    createPost: {
      query: (post: NewPost) => ({
        url: '',
        method: 'POST' as const,
        body: post,
      }),
    },
    updatePost: {
      query: ({ id, data }: { id: string; data: UpdatePost }) => ({
        url: `${id}/`,
        method: 'PATCH' as const,
        body: data,
      }),
    },
    deletePost: {
      query: (id: string) => ({
        url: `${id}/`,
        method: 'DELETE' as const,
      }),
    },
  },
};

export const useGetPostsQuery = () => {
  const endpoint = postsService.endpoints.getPosts;
  
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await api.query<Post[] | PostsResponse>(endpoint.query());
      return endpoint.transformResponse(response);
    },
  });
};

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();
  const endpoint = postsService.endpoints.createPost;
  
  return useMutation({
    mutationFn: async (post: NewPost) => {
      return api.query<Post>(endpoint.query(post));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();
  const endpoint = postsService.endpoints.updatePost;
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdatePost }) => {
      return api.query<Post>(endpoint.query({ id, data }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();
  const endpoint = postsService.endpoints.deletePost;
  
  return useMutation({
    mutationFn: async (id: string) => {
      return api.query<void>(endpoint.query(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};