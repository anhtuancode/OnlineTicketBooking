import { Link } from "react-router-dom";
import { useForgot } from "../../hooks/useForgot";

const ForgotPassword = () => {
  const { form, handleChange, handleSubmit, loading, error } = useForgot();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-md w-full p-8">
        <h2 className="text-3xl font-bold mb-2 text-gray-800">Forgot Password</h2>
        <p className="text-gray-500 mb-6 text-sm">Fill your email here to get password</p>
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
          <div className="mb-4">
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              value={form.confirm_password}
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
            Submit
          </button>
          <div className="flex justify-between text-sm">
            <Link to="/signin" className="text-gray-600 hover:underline">Back To Signin Page</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
