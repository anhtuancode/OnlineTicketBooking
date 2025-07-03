import { Link } from "react-router-dom";
import { useSignin } from "../../hooks/useSignin";


const Signin = () => {
  const { form, handleChange, handleSubmit, loading, error } = useSignin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-md w-full p-8">
        <h2 className="text-3xl font-bold mb-2 text-gray-800">Sign In</h2>
        <p className="text-gray-500 mb-6 text-sm">
          If you are already a member, easily sign in
        </p>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 text-white py-2 rounded font-semibold hover:bg-blue-800 transition-colors mb-4"
          >
            Sign In
          </button>
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="mx-2 text-gray-400 text-sm">OR</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>
          <button
            type="button"
            className="w-full flex items-center justify-center border border-gray-300 py-2 rounded hover:bg-gray-100 transition-colors mb-4"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Sign in with Google
          </button>
          <div className="flex justify-between text-sm">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot your password?
            </Link>
            <Link to="/signup" className="text-gray-600 hover:underline">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
