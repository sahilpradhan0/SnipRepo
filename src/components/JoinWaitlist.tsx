import { CheckCircle, X } from 'lucide-react';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { track } from '../lib/api/PostHogAnalytics';
interface JoinWaitlistProps {
    setShowWaitlist: (show: boolean) => void;
    setShowPricing?: (show: boolean) => void;
}

export function JoinWaitlist({ setShowWaitlist, setShowPricing }: JoinWaitlistProps) {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("https://ahkpwcszyshvluomingr.functions.supabase.co/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    product: "SnipRepo",
                }),
            });
            track('joined_waitlist', { email });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Something went wrong.");
            }

            setIsSubmitted(true);

        } catch (err: any) {
            console.error(err);
            toast.error(err.message || "Something went wrong");
        }
    };


    return (
        <div className="fixed inset-0 bg-black/60 z-50 p-4 flex items-center justify-center" data-lenis-prevent="true">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full mx-auto flex flex-col relative">
                <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition" onClick={() => setShowWaitlist(false)}>
                    <X className="w-6 h-6" />
                </button>
                <div className="p-8 text-center">
                    {isSubmitted ? (
                        <div className='flex flex-col gap-2'>
                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">You're on the list!</h2>
                            <p className="text-gray-600 dark:text-gray-400">We'll notify you as soon as the Pro plan is available. Thanks for your interest!</p>
                            <button onClick={() => {
                                setShowPricing?.(false);
                                setShowWaitlist(false);
                            }} className="w-full text-white font-bold py-3 px-8 rounded-lg transition text-lg shadow-lg bg-purple-600 hover:bg-purple-700 shadow-purple-600/30">
                                Go to Dashboard
                            </button>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Join the Pro Waitlist</h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">Be the first to know when our Pro plan launches and get exclusive early access.</p>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
                                />
                                <button type="submit" className="w-full text-white font-bold py-3 px-8 rounded-lg transition text-lg shadow-lg bg-purple-600 hover:bg-purple-700 shadow-purple-600/30">
                                    Notify Me
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}