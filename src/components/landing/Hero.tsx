import { Zap, ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
    onGetStarted: () => void;
    onTryScreenshot: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
    const nav = useNavigate();
    return (
        <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="px-2">
                        <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <Zap className="w-4 h-4" />
                            For developers tired of rewriting the same code twice
                        </div>

                        {/* Pain-first headline */}
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                            Stop Rewriting code you already wrote
                        </h1>

                        {/* Strong subheadline that explains the pain + outcome */}
                        <p className="text-md sm:text-lg text-gray-600 dark:text-gray-400 mb-4 leading-relaxed max-w-2xl">
                            You already wrote that code once. SnipRepo remembers your previous snippets so you never waste time searching through old repos, chats, or projects again.
                        </p>


                        {/* Micro-benefits (short) */}
                        <div className="flex flex-wrap gap-1 mb-6 dark:text-gray-300">
                            <span className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-sm text-sm font-medium">
                                <Star className="w-4 h-4 text-yellow-500" /> Find any snippet in under 1 second
                            </span>
                            <span className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-sm text-sm font-medium">
                                {/* <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 12h18" /></svg> */}
                                🔁 Use across repos & machines


                            </span>
                        </div>
                        <p className="text-sm text-rose-600 dark:text-rose-400 mb-2 font-medium">
                            Most developers lose 4 – 6 hours/month rewriting the same code.
                        </p>

                        {/* Primary + Secondary CTAs */}
                        <div className="flex flex-col gap-3 max-w-sm mt-6">

                            <button
                                onClick={onGetStarted}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition text-lg shadow-lg shadow-blue-600/30 w-full"
                            >
                                Save your first snippet in seconds →
                            </button>

                            <button
                                onClick={() => nav("/screenshot")}
                                className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 font-medium py-3 px-6 rounded-lg transition text-sm w-full"
                            >
                                Try Screenshot Generator — No Signup
                            </button>


                        </div>


                        {/* Micro-trust */}
                        {/* <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-4">
                            ⭐ Save 1 snippet without logging in
                            • Free forever • No credit card required

                        </p> */}
                    </div>

                    {/* Visual card (keep your nice mock) */}
                    <div className="relative">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-2xl p-6 transform rotate-2">
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl transform -rotate-2 overflow-hidden">
                                <div className="bg-gray-900 px-4 py-3 flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-semibold text-gray-900 dark:text-white">React Custom Hook</span>
                                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">JavaScript</span>
                                        </div>
                                        <div className="bg-gray-900 rounded p-3 font-mono text-xs text-green-400">
                                            <div>const useLocalStorage = (key) =&gt; &#123;</div>
                                            <div className="ml-4">const [value, setValue] = useState();</div>
                                            <div className="ml-4">// ... hook logic</div>
                                            <div>&#125;;</div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 opacity-75">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-semibold text-gray-900 dark:text-white">Python Data Parser</span>
                                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">Python</span>
                                        </div>
                                        <div className="bg-gray-900 rounded p-3 font-mono text-xs text-green-400">
                                            <div>def parse_data(data):</div>
                                            <div className="ml-4">return json.loads(data)</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -top-4 -right-2 md:-right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg font-semibold">
                            Free Forever
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
