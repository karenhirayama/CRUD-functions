interface FilterPostsProps {
  sortBy: "newest" | "oldest" | "likes";
  onSortChange: (value: "newest" | "oldest" | "likes") => void;
  postCount: number;
}

const FilterPosts = ({ sortBy, onSortChange, postCount }: FilterPostsProps) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Sort by:</span>
        <select
          value={sortBy}
          onChange={(e) =>
            onSortChange(e.target.value as "newest" | "oldest" | "likes")
          }
          className="px-3 py-1.5 border border-[#777777] rounded-lg text-sm bg-white focus:outline-none focus:border-primary"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="likes">Most Liked</option>
        </select>
      </div>
      <span className="text-sm text-gray-500">{postCount} posts</span>
    </div>
  );
};

export default FilterPosts;
