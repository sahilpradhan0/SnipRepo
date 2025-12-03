import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import LandingLayout from '../LandingLayout';
import { useNavigate } from 'react-router-dom';

const faqs = [
  {
    q: "What is the best code snippet manager?",
    a: "The best code snippet manager is one that offers fast search, clean organization, multi-device access, and strong security—SnipRepo provides all of these with a modern and developer-friendly interface."
  },
  {
    q: "Does SnipRepo support AI search?",
    a: "Yes! SnipRepo features AI-powered search that instantly finds your code across languages, tags, folders, and metadata."
  },
  {
    q: "Is SnipRepo better than storing snippets in Notion?",
    a: "Absolutely. SnipRepo is designed specifically for code. It supports syntax highlighting, AI search, language detection, version history, and fast retrieval—things Notion can’t do efficiently for developers."
  },
  {
    q: "Is there a free plan?",
    a: "Yes. SnipRepo has a generous free plan with thousands of snippets, unlimited search, tags, folders, and more."
  }
];

export default function BestCodeSnippetManager() {
  const [open, setOpen] = useState<number | null>(null);
  const navigate = useNavigate();
  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <LandingLayout>
      <Helmet>
        <title>Best Code Snippet Manager (2025) — Fast, Secure & AI-Powered</title>
        <meta
          name="description"
          content="Looking for the best code snippet manager? SnipRepo is the top choice for developers—AI search, secure cloud storage, folders, tags, version history & more."
        />
        <meta
          name="keywords"
          content="best code snippet manager, code snippet organizer, snippet tool for developers, snippet manager 2025, snippet library"
        />
        <link rel="canonical" href="https://sniprepo.com/best-code-snippet-manager" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Best Code Snippet Manager (2025)",
            "description": "Discover the best code snippet manager for developers in 2025. Learn why SnipRepo is the #1 choice for storing, organizing, and searching code.",
            "url": "https://sniprepo.com/best-code-snippet-manager"
          })}
        </script>
      </Helmet>

      <main className="flex-grow">
        {/* HERO */}
        <section className="py-20 px-6 text-center bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto py-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              The Best Code Snippet Manager for Developers (2025)
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              After testing dozens of snippet tools, SnipRepo stands out as the most powerful, 
              fastest, and cleanest way to store, organize, and search your code.
            </p>
          </div>
        </section>

        {/* WHY SNIPREPO IS BEST */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-10 text-gray-900 dark:text-white">
              Why SnipRepo Is the Best Code Snippet Manager
            </h2>

            <ul className="space-y-6 text-gray-700 dark:text-gray-300">
              {[
                "AI-powered search that finds code instantly.",
                "Organize using folders, tags, categories, and custom metadata.",
                "Supports 15+ languages including JS, Python, TS, React, and more.",
                "Cloud-sync across devices with secure and encrypted storage.",
                "Beautiful, clean UI designed specifically for developers.",
                "Version history for every snippet to prevent accidental loss.",
                "Speed-focused architecture—no lag, no clutter, no friction."
              ].map((item, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* COMPARISON GRID */}
        <section className="py-20 px-6 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-10 text-center text-gray-900 dark:text-white">
              SnipRepo vs Other Snippet Managers
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700 dark:text-gray-300">
              {[
                {
                  title: "vs Gist",
                  text: "SnipRepo offers organization, AI search, folders, and tags—things GitHub Gist lacks."
                },
                {
                  title: "vs Notion",
                  text: "Notion is not built for code. SnipRepo has syntax highlighting, versioning, and fast retrieval."
                },
                {
                  title: "vs Local Files",
                  text: "Stop losing snippets in random files—SnipRepo gives you structured cloud storage."
                }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 text-center bg-gray-50 dark:bg-gray-800">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-gray-900 dark:text-white">
              Try the Best Code Snippet Manager Today
            </h2>
            <p className="mb-8 text-gray-700 dark:text-gray-300">
              Create your free account and organize your code like a pro.
            </p>

            <button
              onClick={() => navigate('/register')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-10 rounded-lg text-lg shadow-lg transition"
            >
              Get Started Free
            </button>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-white dark:bg-gray-900 px-6">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-10 text-center text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="p-5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex justify-between items-center text-left"
                >
                  <h3 className="font-semibold text-lg">{f.q}</h3>
                  <ChevronDown
                    className={`w-6 h-6 transition-transform ${
                      open === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {open === i && (
                  <p className="mt-3 text-gray-700 dark:text-gray-300">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </LandingLayout>
  );
}
