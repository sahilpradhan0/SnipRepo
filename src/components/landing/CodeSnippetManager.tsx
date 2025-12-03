import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import LandingLayout from './LandingLayout';
import { useNavigate } from 'react-router-dom';

const faqs = [
    {
        question: "What is a code snippet manager?",
        answer: "A code snippet manager helps developers save and organize reusable code in one place so they can speed up their workflow."
    },
    {
        question: "Does SnipRepo support multiple programming languages?",
        answer: "Yes! SnipRepo supports JavaScript, Python, TypeScript, HTML, CSS, React, and more — 15+ languages total."
    },
    {
        question: "Is SnipRepo free?",
        answer: "Yes. SnipRepo has a free plan with generous limits, and no credit card is required."
    },
    {
        question: "Can I search snippets using AI?",
        answer: "Absolutely. SnipRepo includes AI-powered search for fast, accurate snippet discovery."
    }
];

export function CodeSnippetManager() {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
    const navigate = useNavigate();

    const toggleFaq = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    return (
        <>
            <LandingLayout>
                <Helmet>
                    <title>Best Code Snippet Manager | Organize & Search Your Code Easily</title>
                    <meta
                        name="description"
                        content="SnipRepo is the best code snippet manager for developers. Save, organize, search, and reuse code snippets easily with AI-powered search, folders, tags, and secure cloud storage."
                    />
                    <meta
                        name="keywords"
                        content="code snippet manager, code snippets organizer, snippet tool for developers, save code snippets, ai snippet manager"
                    />
                    <link rel="canonical" href="https://sniprepo.com/code-snippet-manager" />

                    {/* FAQ Schema */}
                    <script type="application/ld+json">
                        {JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": faqs.map(f => ({
                                "@type": "Question",
                                "name": f.question,
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": f.answer
                                }
                            }))
                        })}
                    </script>
                </Helmet>

                <main className="flex-grow">
                    {/* HERO */}
                    <section className="py-24 sm:py-32 px-6 text-center">
                        <div className="max-w-4xl mx-auto">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
                                The Ultimate Code Snippet Manager
                            </h1>

                            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-4">
                                Save, organize, and instantly search your code snippets from any device.
                            </p>

                            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                                Whether you're working in JavaScript, Python, or React — SnipRepo becomes your personal code library.
                            </p>
                        </div>
                    </section>

                    {/* FEATURES */}
                    <section className="bg-gray-50 dark:bg-gray-800 py-24 sm:py-32 px-6">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-3xl sm:text-4xl font-semibold mb-8 text-center text-gray-900 dark:text-white">
                                Why Choose SnipRepo?
                            </h2>

                            <ul className="space-y-5 text-gray-700 dark:text-gray-300">
                                <li className="flex gap-3">
                                    <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
                                    AI-powered search for lightning-fast discovery.
                                </li>
                                <li className="flex gap-3">
                                    <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
                                    Organize with folders, tags, and categories.
                                </li>
                                <li className="flex gap-3">
                                    <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
                                    Supports 15+ languages including JS, Python, React.
                                </li>
                                <li className="flex gap-3">
                                    <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
                                    Secure cloud storage with encryption.
                                </li>
                                <li className="flex gap-3">
                                    <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
                                    Access anywhere — laptop, tablet, mobile.
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="bg-white dark:bg-gray-900 py-24 sm:py-32 px-6 text-center border-t border-gray-100 dark:border-gray-700">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-gray-900 dark:text-white">
                                Get Started with SnipRepo Today
                            </h2>

                            <p className="text-gray-700 dark:text-gray-300 mb-8">
                                Start free — no credit card required. Upgrade anytime.
                            </p>

                            <button
                                onClick={() => navigate('/register')}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-10 rounded-lg text-lg shadow-lg transition"
                            >
                                Start Organizing Free
                            </button>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section className="bg-gray-50 dark:bg-gray-800 py-24 sm:py-32 px-6">
                        <h2 className="text-3xl sm:text-4xl font-semibold mb-10 text-center text-gray-900 dark:text-white">
                            Frequently Asked Questions
                        </h2>

                        <div className="max-w-3xl mx-auto space-y-4">
                            {faqs.map((faq, index) => (
                                <div key={index} className="p-5 rounded-lg bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-700">
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full flex justify-between items-center text-left gap-4"
                                    >
                                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white flex-1">
                                            {faq.question}
                                        </h3>
                                        <ChevronDown
                                            className={`w-6 h-6 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                                                openFaqIndex === index ? 'rotate-180' : ''
                                            }`}
                                        />
                                    </button>

                                    {openFaqIndex === index && (
                                        <p className="mt-3 text-gray-700 dark:text-gray-300 text-left">
                                            {faq.answer}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </LandingLayout>
        </>
    );
}
