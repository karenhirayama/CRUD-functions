import CreatePostForm from "../components/CreatePostForm";
import Posts from "../components/Posts";
import FilterPosts from "../components/FilterPosts";
import DeleteModal from "../components/DeleteModal";
import EditModal from "../components/EditModal";

import { PostsProvider } from "../contexts/PostsContext";
import { usePostsContext } from "../contexts/usePostsContext";

import { useFilterPosts } from "../hooks/useFilterPosts";

interface MainPageProps {
  username: string;
  onLogout: () => void;
}

const MainPageContent = ({ username, onLogout }: MainPageProps) => {
  const {
    localPosts,
    postToDelete,
    postToEdit,
    setPostToDelete,
    setPostToEdit,
    handleCreatePost,
    handleDeleteConfirm,
    handleEditSave,
    createPostMutation,
    updatePostMutation,
  } = usePostsContext();

  const { sortBy, setSortBy, sortedPosts } = useFilterPosts(localPosts);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-primary text-white px-4 sm:px-8 py-6 shadow-md">
        <div className="max-w-[800px] mx-auto flex justify-between items-center">
          <h1 className="text-[22px] font-semibold">CodeLeap Network</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm hidden sm:inline">@{username}</span>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[800px] mx-auto px-4 py-8">
        <CreatePostForm
          onSubmit={handleCreatePost}
          isSubmitting={createPostMutation.isPending}
        />

        <FilterPosts
          sortBy={sortBy}
          onSortChange={setSortBy}
          postCount={sortedPosts.length}
        />

        <Posts posts={sortedPosts} currentUsername={username} />
      </main>

      {postToDelete && (
        <DeleteModal
          onConfirm={handleDeleteConfirm}
          onCancel={() => setPostToDelete(null)}
        />
      )}

      {postToEdit && (
        <EditModal
          post={postToEdit}
          onSave={handleEditSave}
          onCancel={() => setPostToEdit(null)}
          isSaving={updatePostMutation.isPending}
        />
      )}
    </div>
  );
};

const MainPage = ({ username, onLogout }: MainPageProps) => {
  return (
    <PostsProvider username={username}>
      <MainPageContent username={username} onLogout={onLogout} />
    </PostsProvider>
  );
};

export default MainPage;
