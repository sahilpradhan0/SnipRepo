import React, { useState } from "react";
import { FolderOpen, Tag, Search, Layers, ChevronDown, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import LandingLayout from "../LandingLayout";
import { Link, useNavigate } from "react-router-dom";

const faqs = [
    {
        question: "How can I organize my code snippets effectively?",
        answer:
            "SnipRepo allows you to organize snippets using a flexible hierarchy of folders and subfolders, combined with a powerful tagging system. This dual approach ensures you can find code by project structure or by technology/topic.",
    },
    {
        question: "Can I search through my organized snippets?",
        answer:
            "Yes, our advanced search engine indexes your titles, descriptions, tags, and the actual code content. You can filter results by language or folder to narrow down exactly what you're looking for.",
    },
    {
        question: "Is there a limit to how many folders or tags I can create?",
        answer:
            "We believe in unrestricted organization. You can create unlimited folders and tags to structure your library exactly how you want it, ensuring your workflow remains unhindered.",
    },
    {
        question: "Does the organizer support syntax highlighting?",
        answer:
            "Absolutely. The organizer automatically detects the language of your snippet and applies beautiful syntax highlighting, making it easy to read and review your code at a glance.",
    },
];

export function OnlineCodeSnippetOrganizer() {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
    const navigate = useNavigate();

    const toggleFaq = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    return (
        <LandingLayout>
            <Helmet>
                <title>Online Code Snippet Organizer | Organize Code with Folders & Tags — SnipRepo</title>
                <meta
                    name="description"
                    content="The ultimate online code snippet organizer. Structure your code library with folders, tags, and smart search. Keep your development workflow clean and efficient."
                />
                <meta
                    name="keywords"
                    content="online code snippet organizer, organize code snippets, code library manager, snippet organization tool, code tagging system"
                />
                <link rel="canonical" href="https://sniprepo.com/online-code-snippet-organizer" />
            </Helmet>

            <main className="flex-grow">
                {/* HERO */}
                <section className="py-24 sm:py-32 px-6 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
                            The Best Way to Organize Code Snippets Online
                        </h1>
                        <p className="text-lg sm:text-xl mb-8 text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                            Stop digging through old projects or messy text files. SnipRepo provides a structured, searchable, and beautiful home for your entire code collection.
                        </p>
                        <div className="flex items-center justify-center gap-4 flex-col sm:flex-row">
                            <button
                                onClick={() => navigate("/register")}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-lg shadow transition flex items-center gap-2"
                            >
                                Start Organizing Free <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* FEATURES GRID */}
                <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900/50">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                                    <FolderOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Smart Folders</h3>
                                <p className="text-slate-600 dark:text-slate-400">Create nested folders to mirror your project structure or categorize by language and framework.</p>
                            </div>

                            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                                    <Tag className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Flexible Tagging</h3>
                                <p className="text-slate-600 dark:text-slate-400">Add multiple tags to snippets for cross-referencing. Find "auth" logic whether it's in Python or JS.</p>
                            </div>

                            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                                    <Search className="w-6 h-6 text-green-600 dark:text-green-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Instant Search</h3>
                                <p className="text-slate-600 dark:text-slate-400">Don't remember the filename? Search by code content, description, or variable names instantly.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* VISUAL SECTION */}
                <section className="py-24 px-6">
                    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 space-y-6">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                                A Tidy Library for Your Digital Brain
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400">
                                Developers waste hours searching for code they wrote months ago. SnipRepo acts as your external memory, keeping every function, class, and configuration accessible in seconds.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                    <Layers className="w-5 h-5 text-blue-500" />
                                    <span>Drag-and-drop organization</span>
                                </li>
                                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                    <Layers className="w-5 h-5 text-blue-500" />
                                    <span>Multi-language syntax support</span>
                                </li>
                                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                    <Layers className="w-5 h-5 text-blue-500" />
                                    <span>Private and secure by default</span>
                                </li>
                            </ul>
                        </div>
                        <div className="flex-1 bg-slate-900 rounded-xl p-6 shadow-2xl border border-slate-800">
                            {/* Abstract UI representation */}
                            <div className="flex gap-4 mb-4 border-b border-slate-700 pb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-slate-400 text-sm">
                                    <FolderOpen className="w-4 h-4" /> <span>/backend/utils</span>
                                </div>
                                <div className="pl-6 space-y-2">
                                    <div className="bg-slate-800 p-2 rounded text-xs text-blue-300 font-mono">auth-middleware.ts</div>
                                    <div className="bg-slate-800 p-2 rounded text-xs text-yellow-300 font-mono">db-connection.js</div>
                                    <div className="bg-slate-800 p-2 rounded text-xs text-purple-300 font-mono">logger.py</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900" aria-labelledby="faq-heading">
                    <div className="max-w-3xl mx-auto">
                        <h2 id="faq-heading" className="text-3xl font-semibold mb-10 text-center text-slate-900 dark:text-white">
                            Organization FAQs
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
                        <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Get Your Code Under Control</h2>
                        <p className="mb-8 text-slate-600 dark:text-slate-400">Join thousands of developers who trust SnipRepo to keep their code organized and accessible.</p>
                        <button
                            onClick={() => navigate("/register")}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition"
                        >
                            Organize My Snippets Now
                        </button>
                    </div>
                </section>
            </main>
        </LandingLayout>
    );
}