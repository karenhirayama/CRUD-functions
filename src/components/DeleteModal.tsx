interface DeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal = ({ onConfirm, onCancel }: DeleteModalProps) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onCancel}
    >
      <div
        className="flex flex-col gap-4 bg-white rounded-lg p-6 w-full max-w-[660px] shadow-2xl animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg sm:text-[22px] font-bold">
          Are you sure you want to delete this item?
        </h3>
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
          <button
            className="w-full sm:w-auto bg-white text-base font-bold px-10 py-1 border rounded-lg cursor-pointer hover:bg-gray-50 transition-all active:scale-95"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="w-full sm:w-auto bg-danger text-white text-base font-bold px-10 py-1 rounded-lg cursor-pointer hover:opacity-90 transition-all active:scale-95"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
