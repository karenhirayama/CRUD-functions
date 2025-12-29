import { getTimeAgo } from "../helpers/timeFormat";

import type { Post } from "../types";

interface PostItemProps {
  post: Post;
  currentUsername: string;
  onEdit: (post: Post) => void;
  onDelete: (post: Post) => void;
  onLike: (post: Post) => void;
}

const PostItem = ({
  post,
  currentUsername,
  onEdit,
  onDelete,
  onLike,
}: PostItemProps) => {
  const isOwnPost = post.username === currentUsername;
  const date = new Date(post.created_datetime);
  const timeAgo = getTimeAgo(date);
  const isLiked = post.likedBy?.includes(currentUsername) ?? false;
  const likesCount = post.likes ?? 0;

  return (
    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="bg-primary text-white px-6 py-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold flex-1">{post.title}</h3>
        {isOwnPost && (
          <div className="flex gap-3">
            <button
              className="p-1.5 hover:bg-white/10 rounded transition-colors"
              onClick={() => onDelete(post)}
              title="Delete"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M15.8333 5L14.6667 16.6667H5.33333L4.16667 5M8.33333 8.33333V13.3333M11.6667 8.33333V13.3333M12.5 5V3.33333C12.5 2.8731 12.1269 2.5 11.6667 2.5H8.33333C7.8731 2.5 7.5 2.8731 7.5 3.33333V5M3.33333 5H16.6667"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className="p-1.5 hover:bg-white/10 rounded transition-colors"
              onClick={() => onEdit(post)}
              title="Edit"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M14.1667 2.5C14.3856 2.28113 14.6454 2.10752 14.9314 1.98906C15.2173 1.87061 15.5238 1.80957 15.8333 1.80957C16.1428 1.80957 16.4493 1.87061 16.7353 1.98906C17.0212 2.10752 17.281 2.28113 17.5 2.5C17.7189 2.71887 17.8925 2.97864 18.0109 3.26461C18.1294 3.55057 18.1904 3.85706 18.1904 4.16667C18.1904 4.47627 18.1294 4.78276 18.0109 5.06872C17.8925 5.35469 17.7189 5.61446 17.5 5.83333L6.25 17.0833L1.66667 18.3333L2.91667 13.75L14.1667 2.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
      <div className="px-6 py-3 flex justify-between items-center text-sm text-gray-500 border-b border-gray-300">
        <span className="font-semibold text-gray-900">@{post.username}</span>
        <span>{timeAgo}</span>
      </div>
      <p className="px-6 py-4 text-sm leading-relaxed whitespace-pre-wrap">
        {post.content}
      </p>
      <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
        <button
          onClick={() => onLike(post)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-200 ${
            isLiked
              ? "bg-danger/10 text-danger hover:bg-danger/20"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={isLiked ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            className="transition-transform duration-200 hover:scale-110"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span className="text-sm font-medium">{likesCount}</span>
        </button>
      </div>
    </div>
  );
};

export default PostItem;
