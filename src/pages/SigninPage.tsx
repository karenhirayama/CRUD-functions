import Signup from "../components/Signup";

interface SigninPageProps {
  onSignup: (username: string) => void;
}

const SigninPage = ({ onSignup }: SigninPageProps) => {
  return <Signup onSignup={onSignup} />;
};

export default SigninPage;
