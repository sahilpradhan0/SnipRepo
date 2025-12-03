import React, { useState } from "react";
import { Check, Lock, Tag, Cloud, Zap, User, ChevronDown } from "lucide-react";
import { Helmet } from "react-helmet-async";
import LandingLayout from "../LandingLayout";
import { Link, useNavigate } from "react-router-dom";

const faqs = [
    {
        question: "How secure is the code snippet storage?",
        answer:
            "Your snippets are protected with industry-standard encryption both in transit and at rest. SnipRepo is built on secure cloud infrastructure to keep your data safe.",
    },
    {
        question: "Can I access my stored snippets from multiple devices?",
        answer:
            "Yes! SnipRepo provides cloud-based storage, allowing you to access your entire code library from any device with an internet connection, be it your laptop, tablet, or phone.",
    },
    {
        question: "Is there a limit to how many snippets I can store?",
        answer:
            "Our free plan offers generous storage for 50 snippets. For users with extensive libraries, our pro plans provide virtually unlimited storage capacity.",
    },
    {
        question: "Can I organize my stored snippets?",
        answer:
            "Absolutely. You can use folders, tags, and categories to structure your snippet library, making it easy to find the exact piece of code you need, when you need it.",
    },
];

export function CodeSnippetStorage() {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
    const navigate = useNavigate();

    const toggleFaq = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    return (
        <LandingLayout>
            <Helmet>
                <title>Secure Code Snippet Storage | Cloud-Based Snippet Library — SnipRepo</title>
                <meta
                    name="description"
                    content="SnipRepo offers secure, cloud-based code snippet storage. Access your code from any device, keep it organized with folders and tags, and never lose a valuable snippet again."
                />
                <meta
                    name="keywords"
                    content="code snippet storage, cloud snippet library, secure code storage, snippet database, store code snippets"
                />
                <link rel="canonical" href="https://sniprepo.com/code-snippet-storage" />

                {/* Breadcrumb JSON-LD */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://sniprepo.com/" },
                            { "@type": "ListItem", "position": 2, "name": "Features", "item": "https://sniprepo.com/#features" },
                            { "@type": "ListItem", "position": 3, "name": "Secure Code Snippet Storage", "item": "https://sniprepo.com/code-snippet-storage" }
                        ]
                    })}
                </script>

                {/* FAQ Schema */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": faqs.map((f) => ({
                            "@type": "Question",
                            "name": f.question,
                            "acceptedAnswer": { "@type": "Answer", "text": f.answer },
                        })),
                    })}
                </script>
            </Helmet>

            <main className="flex-grow">
                {/* HERO */}
                <section
                    className="py-24 sm:py-32 px-6 text-center"
                    aria-label="Secure code snippet storage hero"
                >
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
                            Secure & Centralized Code Snippet Storage
                        </h1>

                        <p className="text-lg sm:text-xl mb-4">
                            Your personal, cloud-based library for every piece of code that matters.
                        </p>

                        <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                            Stop scattering snippets across notes, files, and gists. SnipRepo gives you one secure place to store, find, and reuse your code — with encryption, version history, and cross-device sync.
                        </p>

                        <div className="mt-8 flex items-center justify-center gap-4 flex-col sm:flex-row">
                            <button
                                onClick={() => navigate("/register")}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-lg shadow transition"
                                aria-label="Create your SnipRepo account and secure your snippets"
                                title="Create your SnipRepo account to securely store code snippets"
                            >
                                Secure My Snippets — Start Free
                            </button>

                            <Link
                                to="/code-snippet-manager"
                                className="inline-block text-sm text-slate-600 dark:text-slate-300 underline hover:no-underline"
                                title="Learn about the SnipRepo code snippet manager"
                            >
                                Learn more about SnipRepo
                            </Link>
                        </div>

                    </div>
                </section>

                {/* QUICK LINKS / INTERNAL: helps SEO index other pages */}
                <nav aria-label="Related SnipRepo pages" className="bg-slate-50 dark:bg-slate-900 py-6 border-y border-slate-200 dark:border-slate-800">
                    <div className="max-w-5xl mx-auto flex flex-wrap gap-3 justify-center px-4">
                        <Link to="/code-snippet-manager" className="text-sm px-3 py-2 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                            Code Snippet Manager
                        </Link>
                        <Link to="/ai-code-snippet-search" className="text-sm px-3 py-2 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                            AI Snippet Search
                        </Link>
                        <Link to="/online-code-snippet-organizer" className="text-sm px-3 py-2 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                            Online Organizer
                        </Link>
                        <Link to="/save-code-snippets-online" className="text-sm px-3 py-2 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                            Save Snippets Online
                        </Link>
                    </div>
                </nav>

                {/* FEATURES */}
                <section className="py-24 sm:py-32 px-6" aria-labelledby="features-heading">
                    <div className="max-w-3xl mx-auto">
                        <h2 id="features-heading" className="text-3xl sm:text-4xl font-semibold mb-3 text-center text-slate-900 dark:text-white">
                            Features of Our Snippet Storage
                        </h2>
                        <p className="text-center text-slate-600 dark:text-slate-400 mb-12">
                            Everything you need to store, secure, and quickly find the code you rely on.
                        </p>

                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <li className="flex gap-4 items-start p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                                <Cloud className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                <div>
                                    <h3 className="font-semibold">Secure Cloud Storage</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">End-to-end encryption, encrypted at rest and in transit.</p>
                                </div>
                            </li>

                            <li className="flex gap-4 items-start p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                                <Lock className="w-6 h-6 text-teal-600 dark:text-teal-400 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold">Row-Level Access Control</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Fine-grained permissions for team-safe sharing and privacy.</p>
                                </div>
                            </li>

                            <li className="flex gap-4 items-start p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                                <Tag className="w-6 h-6 text-purple-600 dark:text-purple-400 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold">Flexible Organization</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Folders, tags, and metadata so you never lose context.</p>
                                </div>
                            </li>

                            <li className="flex gap-4 items-start p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                                <Zap className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold">Blazing-Fast Search</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Full-text search across titles, descriptions, and code bodies — find snippets in milliseconds.</p>
                                </div>
                            </li>
                        </ul>

                        {/* small supporting subheading (H3) for SEO */}
                        <h3 className="mt-12 text-lg font-medium text-slate-900 text-center dark:text-white">Designed for developers — built for speed</h3>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 text-center">
                            SnipRepo indexes your code with language-aware parsing so searches return accurate, context-aware results — whether you're searching for a function name, a regex, or a comment.
                        </p>
                    </div>
                </section>

                {/* CODE SNIPPET EXAMPLE — helps semantic relevance for "code snippet" */}
                <section className="bg-slate-50 dark:bg-slate-900 py-12 sm:py-24 px-6 border-y border-slate-200 dark:border-slate-800">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">Snippet Example</h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                            Save code like this and search for it later by name, tag, or code contents.
                        </p>

                        <pre className="rounded-lg overflow-auto bg-slate-950 text-left text-green-400 p-4 text-sm font-mono border border-slate-700">
                            {`// React hook to persist state to localStorage
import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
const [value, setValue] = useState(() => {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : initialValue;
});

useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
}, [key, value]);

return [value, setValue];
}`}
                        </pre>
                    </div>
                </section>

                {/* WHY DEVELOPERS PREFER SNIPREPO (trust + testimonials) */}
                <section className="bg-gray-50 dark:bg-gray-800 py-16 px-6">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white text-center">
                            Built for Real Developer Workflows
                        </h2>
                        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
                            SnipRepo is shaped by common pain points developers face daily — slow search, scattered snippets, and lack of secure storage.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-700">
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    Fast, reliable search designed for developers who manage hundreds of snippets.
                                </p>
                            </div>

                            <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-700">
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    Collaboration-ready structure for teams who share code across multiple projects.
                                </p>
                            </div>

                            <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-700">
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    Secure-by-default storage with row-level security built for sensitive code.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>


                {/* CTA */}
                <section className="bg-slate-50 dark:bg-slate-900 py-12 sm:py-24 px-6 border-y border-slate-200 dark:border-slate-800 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-slate-900 dark:text-white">Start Building Your Code Library</h2>
                        <p className="mb-6">Create your free account and centralize your team's snippets today.</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => navigate("/register")}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition"
                                aria-label="Start organizing code snippets on SnipRepo"
                            >
                                Secure My Snippets — Start Free
                            </button>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-24 sm:py-32 px-6" aria-labelledby="faq-heading">
                    <div className="max-w-3xl mx-auto">
                        <h2 id="faq-heading" className="text-3xl sm:text-4xl font-semibold mb-10 text-center text-slate-900 dark:text-white">
                            Storage Questions
                        </h2>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div key={index} className="p-5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
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
            </main>
        </LandingLayout>
    );
}
