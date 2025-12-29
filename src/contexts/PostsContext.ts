import { createContext } from "react";

import type {
  useCreatePostMutation,
  useUpdatePostMutation,
} from "../service/posts/postService";

import type { Post } from "../types";

export interface PostsContextType {
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
}

export const PostsContext = createContext<PostsContextType | undefined>(
  undefined
);
