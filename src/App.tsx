import { useEffect, useState } from "react";

import SigninPage from "./pages/SigninPage";
import MainPage from "./pages/MainPage";

import { authService } from "./service/auth/authService";

const App = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange((user) => {
      if (user?.displayName) {
        setUsername(user.displayName);
      } else {
        setUsername(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignup = async (newUsername: string) => {
    try {
      await authService.signInAnonymously(newUsername);
      setUsername(newUsername);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.signOut();
      setUsername(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!username) {
    return <SigninPage onSignup={handleSignup} />;
  }

  return <MainPage username={username} onLogout={handleLogout} />;
};

export default App;
