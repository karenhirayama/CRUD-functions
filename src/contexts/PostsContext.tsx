import React, { createContext, useState, useEffect, useContext } from "react";

import {
  useGetPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} from "../service/posts/services";

import type { Post } from "../types";

interface PostsContextType {
  posts: Post[];
  localPosts: Post[];
  isLoading: boolean;
  postToDelete: Post | null;
  postToEdit: Post | null;
  setPostToDelete: (post: Post | null) => void;
  setPostToEdit: (post: Post | null) => void;
  handleCreatePost: (title: string, content: string) => void;
  handleDeleteConfirm: () => void;
  handleEditSave: (title: string, content: string) => void;
  handleLike: (post: Post) => void;
  createPostMutation: ReturnType<typeof useCreatePostMutation>;
  updatePostMutation: ReturnType<typeof useUpdatePostMutation>;
  deletePostMutation: ReturnType<typeof useDeletePostMutation>;
}

export const PostsContext = createContext<PostsContextType | undefined>(
  undefined
);

interface PostsProviderProps {
  children: React.ReactNode;
  username: string;
}

export const PostsProvider = ({ children, username }: PostsProviderProps) => {
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);
  const [localPosts, setLocalPosts] = useState<Post[]>([]);

  const { data: posts = [], isLoading } = useGetPostsQuery();
  const createPostMutation = useCreatePostMutation();
  const updatePostMutation = useUpdatePostMutation();
  const deletePostMutation = useDeletePostMutation();

  useEffect(() => {
    if (posts && posts.length > 0) {
      const postsWithLikes = posts.map((post) => ({
        ...post,
        likes: post.likes ?? 0,
        likedBy: post.likedBy ?? [],
      }));
      setLocalPosts(postsWithLikes);
    }
  }, [posts]);

  const handleCreatePost = (title: string, content: string) => {
    createPostMutation.mutate(
      { title, content, username },
      {
        onSuccess: (newPost) => {
          const postWithLikes = { ...newPost, likes: 0, likedBy: [] };
          setLocalPosts([postWithLikes, ...localPosts]);
        },
      }
    );
  };

  const handleDeleteConfirm = () => {
    if (!postToDelete) return;

    deletePostMutation.mutate(postToDelete.id, {
      onSuccess: () => {
        setLocalPosts(localPosts.filter((p) => p.id !== postToDelete.id));
        setPostToDelete(null);
      },
    });
  };

  const handleEditSave = (title: string, content: string) => {
    if (!postToEdit) return;

    updatePostMutation.mutate(
      { id: postToEdit.id, data: { title, content } },
      {
        onSuccess: (updatedPost) => {
          setLocalPosts(
            localPosts.map((p) =>
              p.id === updatedPost.id
                ? { ...updatedPost, likes: p.likes, likedBy: p.likedBy }
                : p
            )
          );
          setPostToEdit(null);
        },
      }
    );
  };

  const handleLike = (post: Post) => {
    const isLiked = post.likedBy?.includes(username);

    const updatedPosts = localPosts.map((p) => {
      if (p.id === post.id) {
        if (isLiked) {
          return {
            ...p,
            likes: (p.likes ?? 0) - 1,
            likedBy: p.likedBy?.filter((u) => u !== username) ?? [],
          };
        } else {
          return {
            ...p,
            likes: (p.likes ?? 0) + 1,
            likedBy: [...(p.likedBy ?? []), username],
          };
        }
      }
      return p;
    });
    setLocalPosts(updatedPosts);
  };

  const value: PostsContextType = {
    posts,
    localPosts,
    isLoading,
    postToDelete,
    postToEdit,
    setPostToDelete,
    setPostToEdit,
    handleCreatePost,
    handleDeleteConfirm,
    handleEditSave,
    handleLike,
    createPostMutation,
    updatePostMutation,
    deletePostMutation,
  };

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};

export const usePostsContext = () => {
  const context = useContext(PostsContext);

  if (!context) {
    throw new Error("usePostsContext must be used within a PostsProvider");
  }

  return context;
};
