import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';

export function LoginForm() {
  const navigate = useNavigate();
  const { signIn, resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        setError("Incorrect email or password. Please try again.");
      }
      else if (error.message.includes("Email not confirmed")) {
        setError("Please verify your email before signing in.");
      }
      else {
        setError("Something went wrong. Please try again.");
      }
    }


    setLoading(false);
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto p-4 sm:p-10 bg-gray-100 dark:bg-gray-800 rounded-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Sign in to access your snippets</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <div className="w-full flex gap-2 items-center justify-center pl-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-gray-300 dark:focus-within:border-blue-500 transition">
              <Mail className='w-5 h-5 sm:w-6 sm:h-6' />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent pr-4 py-3 rounded-r-lg border-gray-300 dark:border-gray-600 focus:outline-none autofill:[-webkit-box-shadow:0_0_0_1000px_white_inset] autofill:[-webkit-text-fill-color:black] dark:autofill:[-webkit-box-shadow:0_0_0_1000px_#1f2937_inset] dark:autofill:[-webkit-text-fill-color:white]"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <div className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-gray-300 dark:focus-within:border-blue-500 transition">
              <div className='flex gap-2 items-center'>
                <Lock className='w-5 h-5 sm:w-6 sm:h-6' />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-transparent focus:outline-none autofill:[-webkit-box-shadow:0_0_0_1000px_white_inset] autofill:[-webkit-text-fill-color:black] dark:autofill:[-webkit-box-shadow:0_0_0_1000px_#1f2937_inset] dark:autofill:[-webkit-text-fill-color:white]"
                  placeholder="At least 8 characters"
                />
              </div>
              {password && <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <Eye className='w-5 h-5 sm:w-6 sm:h-6' /> : <EyeOff className='w-5 h-5 sm:w-6 sm:h-6' />}
              </button>}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <User className="w-6 h-6" />
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition"
            >
              Sign up
            </button>
          </p>
        </div>

      </div>
    </>
  );
}
