import { useState } from "react";

export const useEditModal = (
  initialTitle: string,
  initialContent: string,
  onSave: (title: string, content: string) => void,
) => {
    const [formEditPost, setFormEditPost] = useState({
    title: initialTitle,
    content: initialContent,
    });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formEditPost.title.trim() && formEditPost.content.trim()) {
      onSave(formEditPost.title.trim(), formEditPost.content.trim());
    }
  };

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormEditPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    formEditPost,
    onChangeForm: handleChangeForm,
    onSubmitForm: handleSubmit,
  };
};