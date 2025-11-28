import { Zap, ArrowRight, Star } from 'lucide-react';

interface HeroProps {
    onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
    return (
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className='px-2'>
                        <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <Zap className="w-4 h-4" />
                            Your Personal Code Library
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-6 leading-tight">
                            Organize Your Code Snippets Like a Pro
                        </h1>
                        <p className="text-md sm:text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                            Stop losing valuable code snippets. SnipRepo helps developers save, organize, and find their code faster with powerful search, smart tagging, and beautiful organization.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={onGetStarted}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition flex items-center justify-center gap-2 text-lg shadow-lg shadow-blue-600/30"
                            >
                                Start Organizing Free
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            {/* <button className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 font-semibold py-4 px-8 rounded-lg transition text-lg">
                                Watch Demo
                            </button> */}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-2xl p-8 transform rotate-2">
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