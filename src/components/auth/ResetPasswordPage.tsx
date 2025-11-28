import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff, Lock, CheckCircle2, XCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function ResetPasswordPage() {
    const navigate = useNavigate();
    const { updateUserPassword, setIsRecoveringPassword } = useAuth();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        const { length, uppercase, lowercase, symbol } = passwordValidations;
        if (!length || !uppercase || !lowercase || !symbol) {
            setError('Password does not meet all requirements.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);

        // In a real app, you'd get a token from the URL and pass it here.
        // const { error: resetError } = await resetPassword(token, password);
        const { error: resetError } = await updateUserPassword(password);

        if (resetError) {
            setError(resetError.message);
            setLoading(false);
        } else {
            toast.success('Your password has been reset successfully!');
            navigate('/login');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Set New Password</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Choose a new, strong password for your account.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            New Password
                        </label>
                        <div className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus-within:ring-2 focus-within:ring-blue-500 transition">
                            <div className='flex gap-2 items-center w-full'>
                                <Lock className='w-5 h-5 text-gray-400' />
                                <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-transparent focus:outline-none" placeholder="Enter new password" />
                            </div>
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-500">
                                {showPassword ? <Eye className='w-5 h-5' /> : <EyeOff className='w-5 h-5' />}
                            </button>
                        </div>
                        {password && <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs mt-2 px-1">
                            <ValidationItem text="At least 8 characters" valid={passwordValidations.length} />
                            <ValidationItem text="One uppercase letter" valid={passwordValidations.uppercase} />
                            <ValidationItem text="One lowercase letter" valid={passwordValidations.lowercase} />
                            <ValidationItem text="One symbol" valid={passwordValidations.symbol} />
                        </div>}
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Confirm New Password
                        </label>
                        <div className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus-within:ring-2 focus-within:ring-blue-500 transition">
                            <div className='flex gap-2 items-center w-full'>
                                <Lock className='w-5 h-5 text-gray-400' />
                                <input id="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full bg-transparent focus:outline-none" placeholder="Confirm new password" />
                            </div>
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-gray-500">
                                {showConfirmPassword ? <Eye className='w-5 h-5' /> : <EyeOff className='w-5 h-5' />}
                            </button>
                        </div>
                    </div>
                    <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 dark:disabled:bg-blue-800 disabled:cursor-not-allowed">
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
                <div className="text-center mt-6">
                    <button onClick={async () => {
                        setIsRecoveringPassword(false);
                        await supabase.auth.signOut();
                        navigate('/login')
                    }} className="font-medium text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition">
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
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