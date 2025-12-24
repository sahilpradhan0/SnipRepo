import React, { useState } from "react";
import { FileImage, Monitor, Layers, Zap, ChevronDown, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import LandingLayout from "../LandingLayout";
import { Link, useNavigate } from "react-router-dom";

const faqs = [
    {
        question: "How do I convert code to an image?",
        answer:
            "Simply paste your code into our editor, select your preferred language for syntax highlighting, customize the background, and click 'Download' to save it as an image.",
    },
    {
        question: "Does it support long code snippets?",
        answer:
            "Yes, the converter automatically adjusts the image height to fit your code. However, for social media readability, we recommend keeping snippets concise.",
    },
    {
        question: "Can I use these images commercially?",
        answer:
            "Yes, the images you generate are yours to use freely in presentations, commercial projects, blogs, or social media posts.",
    },
    {
        question: "Is the syntax highlighting accurate?",
        answer:
            "We use the Monaco Editor engine (the same as VS Code) to ensure industry-standard syntax highlighting for over 50+ programming languages.",
    },
];

export function CodeToImageConverter() {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
    const navigate = useNavigate();

    const toggleFaq = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    return (
        <LandingLayout>
            <Helmet>
                <title>Code to Image Converter | Convert Source Code to PNG/JPG — SnipRepo</title>
                <meta
                    name="description"
                    content="Instantly convert your source code into high-quality images. The easiest way to share code snippets on social media, blogs, and documentation."
                />
                <meta
                    name="keywords"
                    content="code to image, source code to png, code to jpg, convert code to picture, share code as image, code image converter"
                />
                <link rel="canonical" href="https://sniprepo.com/code-to-image-converter" />
            </Helmet>

            <main className="flex-grow">
                {/* HERO */}
                <section className="py-24 sm:py-32 px-6 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
                            Convert Code to Image Instantly
                        </h1>
                        <p className="text-lg sm:text-xl mb-8 text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                            The fastest way to turn text into beautiful, syntax-highlighted images. No login required.
                        </p>
                        <div className="flex items-center justify-center gap-4 flex-col sm:flex-row">
                            <button
                                onClick={() => navigate("/screenshot")}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow transition flex items-center gap-2"
                            >
                                Start Converting <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* STEPS */}
                <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900/50">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">How It Works</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="relative p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                                <div className="absolute -top-4 -left-4 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">1</div>
                                <h3 className="text-xl font-semibold mb-2 mt-2 text-slate-900 dark:text-white">Paste Code</h3>
                                <p className="text-slate-600 dark:text-slate-400">Copy your code from your IDE and paste it into our online editor.</p>
                            </div>
                            <div className="relative p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                                <div className="absolute -top-4 -left-4 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">2</div>
                                <h3 className="text-xl font-semibold mb-2 mt-2 text-slate-900 dark:text-white">Style It</h3>
                                <p className="text-slate-600 dark:text-slate-400">Adjust padding, background colors, and syntax themes to your liking.</p>
                            </div>
                            <div className="relative p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                                <div className="absolute -top-4 -left-4 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">3</div>
                                <h3 className="text-xl font-semibold mb-2 mt-2 text-slate-900 dark:text-white">Download</h3>
                                <p className="text-slate-600 dark:text-slate-400">Export as PNG or copy directly to your clipboard to share instantly.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* USE CASES */}
                <section className="py-24 px-6">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">Perfect For</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-colors">
                                <Monitor className="w-8 h-8 text-blue-500 mb-4" />
                                <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">Social Media</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Share tips and tricks on Twitter, LinkedIn, and Instagram.</p>
                            </div>
                            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-colors">
                                <FileImage className="w-8 h-8 text-purple-500 mb-4" />
                                <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">Blog Posts</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Embed readable code snippets in your technical articles.</p>
                            </div>
                            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-colors">
                                <Layers className="w-8 h-8 text-green-500 mb-4" />
                                <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">Presentations</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Add professional-looking code slides to your decks.</p>
                            </div>
                            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-colors">
                                <Zap className="w-8 h-8 text-yellow-500 mb-4" />
                                <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">Documentation</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Enhance your docs with visual examples that are easy to read.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900" aria-labelledby="faq-heading">
                    <div className="max-w-3xl mx-auto">
                        <h2 id="faq-heading" className="text-3xl font-semibold mb-10 text-center text-slate-900 dark:text-white">
                            Common Questions
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
                <section className="bg-white dark:bg-gray-950 py-24 px-6 text-center border-t border-slate-200 dark:border-slate-800">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Ready to Convert?</h2>
                        <p className="mb-8 text-slate-600 dark:text-slate-400">It takes less than 10 seconds to create your first image.</p>
                        <button
                            onClick={() => navigate("/screenshot")}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition"
                        >
                            Convert Code to Image
                        </button>
                    </div>
                </section>
            </main>
        </LandingLayout>
    );
}