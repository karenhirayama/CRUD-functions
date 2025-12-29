import { useState, useMemo } from "react";

import type { Post } from "../types";

type SortOption = "newest" | "oldest" | "likes";

export const useFilterPosts = (posts: Post[]) => {
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      if (sortBy === "newest") {
        return (
          new Date(b.created_datetime).getTime() -
          new Date(a.created_datetime).getTime()
        );
      } else if (sortBy === "oldest") {
        return (
          new Date(a.created_datetime).getTime() -
          new Date(b.created_datetime).getTime()
        );
      } else {
        return (b.likes ?? 0) - (a.likes ?? 0);
      }
    });
  }, [posts, sortBy]);

  return {
    sortBy,
    setSortBy,
    sortedPosts,
  };
};
