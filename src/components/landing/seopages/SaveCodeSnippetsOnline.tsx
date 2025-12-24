import React, { useState } from "react";
import { Cloud, Lock, Smartphone, History, ChevronDown, Save } from "lucide-react";
import { Helmet } from "react-helmet-async";
import LandingLayout from "../LandingLayout";
import { Link, useNavigate } from "react-router-dom";

const faqs = [
    {
        question: "Is it free to save code snippets online?",
        answer:
            "Yes! SnipRepo offers a generous free tier that allows you to save and manage a substantial library of code snippets without any cost.",
    },
    {
        question: "Are my saved snippets private?",
        answer:
            "By default, all snippets you save are private and accessible only to you. We use industry-standard encryption to ensure your code remains secure.",
    },
    {
        question: "Can I access my saved code from my phone?",
        answer:
            "Absolutely. SnipRepo is fully responsive and cloud-based, meaning you can view, copy, and edit your saved snippets from any device with a web browser.",
    },
    {
        question: "What happens if I lose my internet connection?",
        answer:
            "While SnipRepo is an online tool, we are working on offline capabilities. Currently, you need an internet connection to sync changes, but your viewed snippets are often cached by your browser.",
    },
];

export function SaveCodeSnippetsOnline() {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
    const navigate = useNavigate();

    const toggleFaq = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    return (
        <LandingLayout>
            <Helmet>
                <title>Save Code Snippets Online | Secure Cloud Code Storage — SnipRepo</title>
                <meta
                    name="description"
                    content="Save your code snippets online securely. Access your code from anywhere, on any device. The best way to store, backup, and retrieve your development snippets."
                />
                <meta
                    name="keywords"
                    content="save code snippets online, cloud code storage, store code online, online snippet manager, save code to cloud"
                />
                <link rel="canonical" href="https://sniprepo.com/save-code-snippets-online" />
            </Helmet>

            <main className="flex-grow">
                {/* HERO */}
                <section className="py-24 sm:py-32 px-6 text-center bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
                    <div className="max-w-4xl mx-auto">
                        <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
                            <Cloud className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
                            Save Code Snippets Online
                        </h1>
                        <p className="text-lg sm:text-xl mb-8 text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                            Never lose a useful function again. Save your code to the cloud instantly and access it from your laptop, tablet, or phone whenever inspiration strikes.
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={() => navigate("/register")}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow transition flex items-center gap-2"
                            >
                                <Save className="w-5 h-5" /> Save My First Snippet
                            </button>
                        </div>
                    </div>
                </section>

                {/* BENEFITS */}
                <section className="py-24 px-6">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6">
                                <Lock className="w-8 h-8 text-slate-700 dark:text-slate-300" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Secure & Private</h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Your code is your intellectual property. We encrypt your data so you can save proprietary algorithms and sensitive configurations with peace of mind.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6">
                                <Smartphone className="w-8 h-8 text-slate-700 dark:text-slate-300" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Access Anywhere</h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Moved to a new computer? Coding on the go? Your entire library travels with you. Log in and start coding where you left off.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6">
                                <History className="w-8 h-8 text-slate-700 dark:text-slate-300" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Version History</h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                (Pro) Track changes to your snippets over time. Made a mistake? Roll back to a previous version of your saved code instantly.
                            </p>
                        </div>
                    </div>
                </section>

                {/* HOW IT WORKS */}
                <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">How to Save Your Code</h2>
                        <div className="space-y-8">
                            <div className="flex gap-6 items-start">
                                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Paste Your Code</h3>
                                    <p className="text-slate-600 dark:text-slate-400">Simply paste your code into our editor. We support over 50+ languages including JavaScript, Python, and C++.</p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-start">
                                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Add Context</h3>
                                    <p className="text-slate-600 dark:text-slate-400">Give it a title, add a description, and tag it (e.g., #react, #hooks) so it's easy to find later.</p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-start">
                                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Click Save</h3>
                                    <p className="text-slate-600 dark:text-slate-400">Your snippet is instantly uploaded to your secure cloud library, ready to be used in your next project.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-24 px-6" aria-labelledby="faq-heading">
                    <div className="max-w-3xl mx-auto">
                        <h2 id="faq-heading" className="text-3xl font-semibold mb-10 text-center text-slate-900 dark:text-white">
                            Common Questions
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

                {/* CTA */}
                <section className="bg-blue-600 py-20 px-6 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold mb-4 text-white">Stop Losing Your Code</h2>
                        <p className="mb-8 text-blue-100 text-lg">Create a free account today and start building your personal code knowledge base.</p>
                        <button
                            onClick={() => navigate("/register")}
                            className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg shadow-lg transition"
                        >
                            Create Free Account
                        </button>
                    </div>
                </section>
            </main>
        </LandingLayout>
    );
}