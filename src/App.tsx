import SigninPage from "./pages/SigninPage";
import MainPage from "./pages/MainPage";

import { useLocalStorage } from "./hooks/useLocalStorage";

const App = () => {
  const [username, setUsername] = useLocalStorage<string | null>(
    "codeleap_username",
    null
  );

  const handleSignup = (newUsername: string) => {
    setUsername(newUsername);
  };

  const handleLogout = () => {
    setUsername(null);
  };

  if (!username) {
    return <SigninPage onSignup={handleSignup} />;
  }

  return <MainPage username={username} onLogout={handleLogout} />;
};

export default App;
