import React, { useState, useMemo } from "react";

import {
  useGetPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} from "../service/posts/postService";

import { PostsContext, type PostsContextType } from "./PostsContext";
import type { Post } from "../types";

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

  const initialPosts = useMemo(() => {
    if (posts && posts.length > 0 && localPosts.length === 0) {
      return posts.map((post) => ({
        ...post,
        likes: post.likes ?? 0,
        likedBy: post.likedBy ?? [],
      }));
    }
    return localPosts;
  }, [posts, localPosts]);

  const handleCreatePost = (title: string, content: string) => {
    createPostMutation.mutate(
      { title, content, username },
      {
        onSuccess: (newPost) => {
          const postWithLikes = { ...newPost, likes: 0, likedBy: [] };
          setLocalPosts([postWithLikes, ...initialPosts]);
        },
      }
    );
  };

  const handleDeleteConfirm = () => {
    if (!postToDelete) return;

    deletePostMutation.mutate(postToDelete.id, {
      onSuccess: () => {
        setLocalPosts(initialPosts.filter((p) => p.id !== postToDelete.id));
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
            initialPosts.map((p) =>
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

    const updatedPosts = initialPosts.map((p) => {
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
    localPosts: initialPosts,
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
  };

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};
