import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CheckCircle2, Eye, EyeOff, Lock, Mail, User, XCircle } from 'lucide-react';

export default function RegisterForm() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    symbol: false,
  });

  useEffect(() => {
    setPasswordValidations({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      symbol: /[^A-Za-z0-9]/.test(password),
    });
  }, [password]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const { length, uppercase, lowercase, symbol } = passwordValidations;
    if (!length || !uppercase || !lowercase || !symbol) {
      setError('Password does not meet all requirements.');
      return;
    }

    setLoading(true);

    const { data, error } = await signUp(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // IMPORTANT CHECK → email already exists
    if (data?.user && data.user.identities?.length === 0) {
      setError("An account with this email already exists. Try logging in.");
      setLoading(false);
      return;
    }

    if (!data?.user) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    toast.success("Check your email for the verification link!");
    setLoading(false);
  };

  const areAllRequirementsMet = Object.values(passwordValidations).every(Boolean);


  return (
    <>
      <div className="w-full max-w-md mx-auto p-4 sm:p-10 bg-gray-100 dark:bg-gray-800 rounded-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Create an Account</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Start organizing your code snippets</p>
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
                className="w-full bg-transparent pr-4 py-3 rounded-r-lg border-gray-300 dark:border-gray-600 focus:outline-none autofill:[-webkit-box-shadow:0_0_0_1000px_#1f2937_inset] dark:autofill:[-webkit-box-shadow:0_0_0_1000px_#1f2937_inset] autofill:[-webkit-text-fill-color:#fff] dark:autofill:[-webkit-text-fill-color:#fff]"

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
                  className="w-full bg-transparent focus:outline-none"
                  placeholder="At least 8 characters"
                />
              </div>
              {password && <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <Eye className='w-5 h-5 sm:w-6 sm:h-6' /> : <EyeOff className='w-5 h-5 sm:w-6 sm:h-6' />}
              </button>}
            </div>
            {password && <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs mt-2 px-1">
              <ValidationItem text="At least 8 characters" valid={passwordValidations.length} />
              <ValidationItem text="One uppercase letter" valid={passwordValidations.uppercase} />
              <ValidationItem text="One lowercase letter" valid={passwordValidations.lowercase} />
              <ValidationItem text="One symbol" valid={passwordValidations.symbol} />
            </div>}
          </div>

          <button
            type="submit"
            disabled={loading || email.length === 0 || (password.length > 0 && !areAllRequirementsMet)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-blue-400 dark:disabled:bg-blue-800"
          >
            <User className="w-6 h-6" />
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition"
            >
              Sign in
            </button>
          </p>
        </div>

      </div>
    </>
  );
}

function ValidationItem({ text, valid }: { text: string; valid: boolean }) {
  return (
    <div className={`flex items-center gap-2 transition-colors ${valid ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
      {valid ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
      <span>{text}</span>
    </div>
  );
}