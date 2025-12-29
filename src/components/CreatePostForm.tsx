import { useCreatePostForm } from "../hooks/useCreatePostForm";

interface CreatePostFormProps {
  onSubmit: (title: string, content: string) => void;
  isSubmitting: boolean;
}

const CreatePostForm = ({ onSubmit, isSubmitting }: CreatePostFormProps) => {
  const { formCreatePost, onChangeForm, onSubmitForm } =
    useCreatePostForm(onSubmit);

  return (
    <form
      className="flex flex-col gap-4 bg-white border border-gray-300 rounded-lg p-4 sm:p-6 mb-8 transition-shadow hover:shadow-md"
      onSubmit={onSubmitForm}
    >
      <h3 className="text-lg sm:text-[22px] font-bold">What's on your mind?</h3>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className="block text-sm font-medium">
          Title
        </label>
        <input
          name="title"
          id="title"
          type="text"
          value={formCreatePost.title}
          onChange={onChangeForm}
          className="w-full border border-[#777777] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="content" className="block text-sm font-medium">
          Content
        </label>
        <textarea
          name="content"
          id="content"
          value={formCreatePost.content}
          onChange={onChangeForm}
          rows={4}
          className="w-full border border-[#777777] rounded-lg px-3 py-2 text-sm resize-y focus:outline-none focus:border-primary transition-colors"
        />
      </div>
      <div className="flex justify-end self-end">
        <button
          type="submit"
          className="bg-primary text-white px-6 py-1 rounded-lg font-medium text-sm tracking-wide disabled:bg-gray-300 hover:opacity-90 transition-all active:scale-95"
          disabled={
            !formCreatePost.title.trim() ||
            !formCreatePost.content.trim() ||
            isSubmitting
          }
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default CreatePostForm;
