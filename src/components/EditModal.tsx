import type { Post } from "../types";

import { useEditModal } from "../hooks/useEditModal";

interface EditModalProps {
  post: Post;
  onSave: (title: string, content: string) => void;
  onCancel: () => void;
  isSaving: boolean;
}

const EditModal = ({ post, onSave, onCancel, isSaving }: EditModalProps) => {
  const { formEditPost, onChangeForm, onSubmitForm } = useEditModal(
    post.title,
    post.content,
    onSave
  );

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onCancel}
    >
      <div
        className="flex flex-col gap-4 bg-white rounded-lg p-6 w-full max-w-[600px] shadow-2xl animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg sm:text-[22px] font-bold">Edit Item</h3>
        <form onSubmit={onSubmitForm} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="edit-title" className="block text-sm font-medium">
              Title
            </label>
            <input
              id="edit-title"
              name="title"
              type="text"
              value={formEditPost.title}
              onChange={onChangeForm}
              className="w-full border border-[#777777] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="edit-content" className="block text-sm font-medium">
              Content
            </label>
            <textarea
              name="content"
              id="edit-content"
              value={formEditPost.content}
              onChange={onChangeForm}
              rows={4}
              className="w-full border border-[#777777] rounded-lg px-3 py-2 text-sm resize-y focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2">
            <button
              type="button"
              className="w-full sm:w-auto bg-white text-base font-bold px-10 py-1 border rounded-lg cursor-pointer hover:bg-gray-50 transition-all active:scale-95 disabled:opacity-50"
              onClick={onCancel}
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto bg-success text-white text-base font-bold px-10 py-1 rounded-lg disabled:bg-gray-300 cursor-pointer disabled:cursor-default hover:opacity-90 transition-all active:scale-95"
              disabled={
                !formEditPost.title.trim() ||
                !formEditPost.content.trim() ||
                isSaving
              }
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
