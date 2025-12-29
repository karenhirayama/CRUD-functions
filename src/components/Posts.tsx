import PostItem from "./PostItem";

import type { Post } from "../types";
import { usePostsContext } from "../contexts/usePostsContext";

interface PostsProps {
  posts: Post[];
  currentUsername: string;
}

const Posts = ({ posts, currentUsername }: PostsProps) => {
  const { isLoading, setPostToEdit, setPostToDelete, handleLike } =
    usePostsContext();

  if (isLoading) {
    return (
      <div className="text-center py-10 text-gray-500">Loading posts...</div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No posts yet. Be the first to post!
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {posts.map((post, index) => (
        <div
          key={post.id}
          className="animate-fadeIn"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <PostItem
            post={post}
            currentUsername={currentUsername}
            onEdit={setPostToEdit}
            onDelete={setPostToDelete}
            onLike={handleLike}
          />
        </div>
      ))}
    </div>
  );
};

export default Posts;
