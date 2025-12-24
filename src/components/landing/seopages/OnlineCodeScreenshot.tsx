import React, { useState } from "react";
import { Image, Palette, Download, Share2, ChevronDown, Camera } from "lucide-react";
import { Helmet } from "react-helmet-async";
import LandingLayout from "../LandingLayout";
import { Link, useNavigate } from "react-router-dom";

const faqs = [
    {
        question: "Is this code screenshot tool free?",
        answer:
            "Yes, SnipRepo's code screenshot generator is completely free to use. You can create unlimited high-quality images of your code without any watermarks.",
    },
    {
        question: "Can I customize the background and theme?",
        answer:
            "Absolutely. You can choose from various syntax highlighting themes, adjust the background gradient or color, and toggle window controls (macOS style) to match your aesthetic.",
    },
    {
        question: "What image formats are supported?",
        answer:
            "You can export your code screenshots as high-resolution PNG files, perfect for sharing on Twitter, LinkedIn, or embedding in documentation.",
    },
    {
        question: "Do I need to install anything?",
        answer:
            "No installation is required. This is a fully web-based tool that runs directly in your browser, compatible with Windows, Mac, and Linux.",
    },
];

export function OnlineCodeScreenshot() {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
    const navigate = useNavigate();

    const toggleFaq = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    return (
        <LandingLayout>
            <Helmet>
                <title>Online Code Screenshot Tool | Create Beautiful Code Images — SnipRepo</title>
                <meta
                    name="description"
                    content="Create stunning code screenshots online. Customize themes, backgrounds, and fonts. The best free tool to share your code on social media and documentation."
                />
                <meta
                    name="keywords"
                    content="online code screenshot, code snapshot tool, code to image, beautiful code screenshots, carbon alternative, code image generator"
                />
                <link rel="canonical" href="https://sniprepo.com/online-code-screenshot" />
            </Helmet>

            <main className="flex-grow">
                {/* HERO */}
                <section className="py-24 sm:py-32 px-6 text-center bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
                    <div className="max-w-4xl mx-auto">
                        <div className="inline-flex items-center justify-center p-3 bg-pink-100 dark:bg-pink-900/30 rounded-full mb-6">
                            <Camera className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
                            Create Beautiful Code Screenshots Online
                        </h1>
                        <p className="text-lg sm:text-xl mb-8 text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                            Turn your source code into stunning, shareable images in seconds. Perfect for Twitter, LinkedIn, blogs, and presentations.
                        </p>
                        <div className="flex items-center justify-center gap-4 flex-col sm:flex-row">
                            <button
                                onClick={() => navigate("/screenshot")}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow transition flex items-center gap-2"
                            >
                                <Image className="w-5 h-5" /> Create Screenshot Now
                            </button>
                            <Link
                                to="/register"
                                className="inline-block text-sm text-slate-600 dark:text-slate-300 underline hover:no-underline"
                            >
                                Sign up to save snippets
                            </Link>
                        </div>
                    </div>
                </section>

                {/* FEATURES GRID */}
                <section className="py-20 px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
                                <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                                    <Palette className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Custom Themes</h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Choose from popular syntax highlighting themes like Dracula, Monokai, and GitHub Dark to match your style.
                                </p>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
                                <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                                    <Download className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">High-Res Export</h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Download crystal clear PNG images that look great on retina displays and social media feeds.
                                </p>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
                                <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                                    <Share2 className="w-7 h-7 text-green-600 dark:text-green-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Ready to Share</h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Optimized padding and backgrounds make your code pop on platforms like Twitter/X and Instagram.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* VISUAL DEMO SECTION */}
                <section className="py-24 px-6 bg-slate-100 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
                    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1">
                            <div className="relative rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-8 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                                <div className="bg-[#1e1e1e] rounded-lg shadow-lg overflow-hidden">
                                    <div className="flex items-center gap-2 px-4 py-3 bg-[#252526]">
                                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                        <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                                    </div>
                                    <div className="p-4 font-mono text-sm text-gray-300">
                                        <span className="text-purple-400">const</span>{" "}
                                        <span className="text-blue-400">shareCode</span> = (){" "}
                                        <span className="text-purple-400">=&gt;</span> {"{"}
                                        <br />
                                        &nbsp;&nbsp;
                                        <span className="text-purple-400">const</span> tool ={" "}
                                        <span className="text-green-400">"SnipRepo"</span>;
                                        <br />
                                        &nbsp;&nbsp;console.
                                        <span className="text-yellow-400">log</span>(
                                        <span className="text-green-400">
                                            {`Create beautiful images with \${tool}`}
                                        </span>
                                        );
                                        <br />
                                        {"}"}
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="flex-1 space-y-6">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                                Why Developers Love Our Tool
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400">
                                Sharing raw text is boring. Sharing screenshots from your IDE includes unnecessary UI clutter. SnipRepo gives you a clean, focused, and artistic way to present your code.
                            </p>
                            <button
                                onClick={() => navigate("/screenshot")}
                                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-2"
                            >
                                Try it yourself <ChevronDown className="w-4 h-4 -rotate-90" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-24 px-6" aria-labelledby="faq-heading">
                    <div className="max-w-3xl mx-auto">
                        <h2 id="faq-heading" className="text-3xl font-semibold mb-10 text-center text-slate-900 dark:text-white">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div key={index} className="p-5 rounded-lg bg-white dark:bg-gray-950 border border-slate-200 dark:border-slate-800">
                                    <button onClick={() => toggleFaq(index)} className="w-full flex justify-between items-center text-left gap-4">
                                        <h3 className="font-semibold text-lg text-slate-900 dark:text-white">{faq.question}</h3>
                                        <ChevronDown className={`w-6 h-6 text-slate-500 transition-transform duration-200 flex-shrink-0 ${openFaqIndex === index ? "rotate-180" : ""}`} />
                                    </button>
                                    {openFaqIndex === index && <p className="mt-3 text-slate-600 dark:text-slate-400">{faq.answer}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-slate-900 py-20 px-6 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold mb-4 text-white">Make Your Code Stand Out</h2>
                        <p className="mb-8 text-slate-300 text-lg">Join thousands of developers sharing beautiful code snippets every day.</p>
                        <button
                            onClick={() => navigate("/screenshot")}
                            className="bg-white text-slate-900 hover:bg-slate-100 font-bold py-3 px-8 rounded-lg shadow-lg transition"
                        >
                            Generate Screenshot
                        </button>
                    </div>
                </section>
            </main>
        </LandingLayout>
    );
}