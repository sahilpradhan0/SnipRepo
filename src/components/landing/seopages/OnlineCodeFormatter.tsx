import React, { useState } from "react";
import { Check, Code2, Zap, FileJson, Layout as LayoutIcon, ChevronDown } from "lucide-react";
import { Helmet } from "react-helmet-async";
import LandingLayout from "../LandingLayout";
import { Link, useNavigate } from "react-router-dom";

const faqs = [
    {
        question: "What languages does the code formatter support?",
        answer:
            "SnipRepo's code formatter supports popular languages including JavaScript, TypeScript, JSON, HTML, and CSS. We are constantly adding support for more languages to help developers maintain clean codebases.",
    },
    {
        question: "Is the code formatting performed locally?",
        answer:
            "Yes, for many operations, we utilize browser-based formatting to ensure speed and privacy. Your code is processed securely, and we don't store it unless you explicitly choose to save it to your SnipRepo library.",
    },
    {
        question: "Can I save my formatted code?",
        answer:
            "Absolutely. After formatting your code, you can copy it to your clipboard instantly or create a free account to save the snippet permanently to your personal cloud library.",
    },
    {
        question: "Is this code beautifier free to use?",
        answer:
            "Yes, the online code formatter is 100% free to use without any limits. You don't even need to create an account to format and beautify your code.",
    },
];

export function OnlineCodeFormatter() {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
    const navigate = useNavigate();

    const toggleFaq = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    return (
        <LandingLayout>
            <Helmet>
                <title>Free Online Code Formatter & Beautifier | JS, JSON, HTML, CSS — SnipRepo</title>
                <meta
                    name="description"
                    content="Instantly format and beautify your code with SnipRepo's free online tool. Supports JavaScript, TypeScript, JSON, HTML, CSS. Clean syntax, fix indentation, and improve readability."
                />
                <meta
                    name="keywords"
                    content="online code formatter, code beautifier, json formatter, javascript beautifier, html formatter, css formatter, typescript formatter, clean code tool"
                />
                <link rel="canonical" href="https://sniprepo.com/online-code-formatter" />

                {/* Breadcrumb JSON-LD */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://sniprepo.com/" },
                            { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://sniprepo.com/#tools" },
                            { "@type": "ListItem", "position": 3, "name": "Online Code Formatter", "item": "https://sniprepo.com/online-code-formatter" }
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
                    aria-label="Online code formatter hero"
                >
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
                            Free Online Code Formatter & Beautifier
                        </h1>

                        <p className="text-lg sm:text-xl mb-4">
                            Clean, format, and standardize your code in seconds.
                        </p>

                        <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                            Stop struggling with messy indentation and unreadable syntax. Paste your code, select your language, and let SnipRepo's intelligent formatter make it pristine. Supports JS, TS, JSON, HTML, and CSS.
                        </p>

                        <div className="mt-8 flex items-center justify-center gap-4 flex-col sm:flex-row">
                            <button
                                onClick={() => navigate("/free-code-formatter")}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-lg shadow transition"
                                aria-label="Go to code formatter tool"
                            >
                                Format Code Now
                            </button>

                            <Link
                                to="/register"
                                className="inline-block text-sm text-slate-600 dark:text-slate-300 underline hover:no-underline"
                            >
                                Create Free Account
                            </Link>
                        </div>

                    </div>
                </section>

                {/* QUICK LINKS */}
                <nav aria-label="Related SnipRepo tools" className="bg-slate-50 dark:bg-slate-900 py-6 border-y border-slate-200 dark:border-slate-800">
                    <div className="max-w-5xl mx-auto flex flex-wrap gap-3 justify-center px-4">
                        <Link to="/code-snippet-storage" className="text-sm px-3 py-2 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                            Snippet Storage
                        </Link>
                        <Link to="/screenshot" className="text-sm px-3 py-2 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                            Screenshot Generator
                        </Link>
                        <Link to="/ai-code-snippet-search" className="text-sm px-3 py-2 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                            AI Search
                        </Link>
                    </div>
                </nav>

                {/* FEATURES */}
                <section className="py-24 sm:py-32 px-6" aria-labelledby="features-heading">
                    <div className="max-w-3xl mx-auto">
                        <h2 id="features-heading" className="text-3xl sm:text-4xl font-semibold mb-3 text-center text-slate-900 dark:text-white">
                            Why Use Our Code Beautifier?
                        </h2>
                        <p className="text-center text-slate-600 dark:text-slate-400 mb-12">
                            A simple, powerful tool designed to improve code readability and maintainability.
                        </p>

                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <li className="flex gap-4 items-start p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                                <Code2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                <div>
                                    <h3 className="font-semibold">Multi-Language Support</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Expertly formats JavaScript, TypeScript, JSON, HTML, and CSS with language-specific rules.</p>
                                </div>
                            </li>

                            <li className="flex gap-4 items-start p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                                <Zap className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold">Instant Processing</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">No waiting queues. Code is formatted instantly in your browser or via our high-speed edge functions.</p>
                                </div>
                            </li>

                            <li className="flex gap-4 items-start p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                                <FileJson className="w-6 h-6 text-purple-600 dark:text-purple-400 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold">JSON Validation</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Validate and prettify JSON data. Easily spot syntax errors in complex JSON structures.</p>
                                </div>
                            </li>

                            <li className="flex gap-4 items-start p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                                <LayoutIcon className="w-6 h-6 text-teal-600 dark:text-teal-400 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold">Save & Share</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Don't just format it—save it. One click to store your formatted snippet in your SnipRepo library.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* EXAMPLE */}
                <section className="bg-slate-50 dark:bg-slate-900 py-12 sm:py-24 px-6 border-y border-slate-200 dark:border-slate-800">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-semibold mb-8 text-center text-slate-900 dark:text-white">See the Difference</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-red-500 mb-2 text-center">Before (Minified/Messy)</p>
                                <pre className="rounded-lg overflow-auto bg-slate-950 text-slate-400 p-4 text-xs font-mono border border-slate-700 h-48">
                                    {`function fetchUser(id){return fetch('/api/users/'+id).then(r=>r.json()).then(d=>{console.log(d);return d;}).catch(e=>console.error(e));}`}
                                </pre>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-green-500 mb-2 text-center">After (Beautified)</p>
                                <pre className="rounded-lg overflow-auto bg-slate-950 text-green-400 p-4 text-xs font-mono border border-slate-700 h-48">
                                    {`function fetchUser(id) {
  return fetch('/api/users/' + id)
    .then(r => r.json())
    .then(d => {
      console.log(d);
      return d;
    })
    .catch(e => console.error(e));
}`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-white dark:bg-gray-950 py-12 sm:py-24 px-6 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-slate-900 dark:text-white">Ready to Clean Up Your Code?</h2>
                        <p className="mb-6 text-slate-600 dark:text-slate-400">Use the formatter now or create an account to save your snippets forever.</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => navigate("/free-code-formatter")}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition"
                            >
                                Go to Formatter
                            </button>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-24 sm:py-32 px-6 bg-slate-50 dark:bg-slate-900" aria-labelledby="faq-heading">
                    <div className="max-w-3xl mx-auto">
                        <h2 id="faq-heading" className="text-3xl sm:text-4xl font-semibold mb-10 text-center text-slate-900 dark:text-white">
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
            </main>
        </LandingLayout>
    );
}