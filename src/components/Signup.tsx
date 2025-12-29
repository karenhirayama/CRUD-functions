import { useSignup } from "../hooks/useSignup";

interface SignupProps {
  onSignup: (username: string) => void;
}

const Signup = ({ onSignup }: SignupProps) => {
  const { username, onChangeUsername, onSubmitSignup } = useSignup(onSignup);

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="flex flex-col gap-4 bg-white rounded-lg p-6 w-full max-w-[500px] shadow-xl animate-fadeIn">
        <h2 className="text-xl sm:text-[22px] font-semibold">
          Welcome to CodeLeap network!
        </h2>
        <form onSubmit={onSubmitSignup} className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="block text-sm font-medium">
              Please enter your username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={onChangeUsername}
              className="w-full border border-[#777777] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={!username.trim()}
            className="bg-primary text-white px-8 py-1 rounded-lg font-medium text-sm uppercase tracking-wide self-end disabled:bg-gray-300 hover:opacity-90 transition-all active:scale-95"
          >
            ENTER
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
