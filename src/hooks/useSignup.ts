import { useState } from "react";

export const useSignup = (onSignup: (username: string) => void) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.trim()) {
      onSignup(username.trim());
      setUsername("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return {
    username,
    onChangeUsername: handleChange,
    onSubmitSignup: handleSubmit,
  };
}