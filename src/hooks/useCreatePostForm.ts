import { useState } from "react";

export const useCreatePostForm = (
  onSubmit: (title: string, content: string) => void
) => {
    const [formCreatePost, setFormCreatePost] = useState({
    title: "",
    content: "",
  });


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formCreatePost.title.trim() && formCreatePost.content.trim()) {
      onSubmit(formCreatePost.title.trim(), formCreatePost.content.trim());
      setFormCreatePost({ title: "", content: "" });
    }
  };

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormCreatePost((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return {
    formCreatePost,
    onChangeForm: handleChangeForm,
    onSubmitForm: handleSubmit,
  };
};
