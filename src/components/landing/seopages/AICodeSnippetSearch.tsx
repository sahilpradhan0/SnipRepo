import React from "react";
import { Helmet } from "react-helmet-async";
import { Sparkles, Check } from "lucide-react";
import LandingLayout from "../LandingLayout";
import { Link } from "react-router-dom";

export default function AiCodeSnippetSearchPage() {
  return (
    <LandingLayout>
      <Helmet>
        <title>AI Code Snippet Search — Instantly Find Any Snippet | SnipRepo</title>
        <meta
          name="description"
          content="Experience lightning-fast AI-powered code snippet search with SnipRepo. Find any code snippet instantly using natural language or keyword search."
        />
        <meta
          name="keywords"
          content="AI code snippet search, code search tool, developer search engine, find code snippets, AI snippet manager"
        />
        <link
          rel="canonical"
          href="https://yourdomain.com/ai-code-snippet-search"
        />
      </Helmet>

      {/* HERO */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center py-10">
          <Sparkles className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            AI Code Snippet Search — Find Any Snippet Instantly
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            SnipRepo's AI-powered search helps developers instantly find code
            using natural language. No more digging through files — just type
            what you need and get results in milliseconds.
          </p>
        </div>
      </section>

      {/* WHY AI SEARCH */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
          Why AI Search Is a Game Changer for Developers
        </h2>

        <ul className="space-y-5 text-gray-700 dark:text-gray-300">
          <li className="flex gap-3">
            <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
            Search using natural language — even if you forget file names or tags.
          </li>
          <li className="flex gap-3">
            <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
            AI understands code context, patterns, and purpose.
          </li>
          <li className="flex gap-3">
            <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
            Faster than traditional text search or manual browsing.
          </li>
          <li className="flex gap-3">
            <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
            Works across multiple languages & frameworks automatically.
          </li>
          <li className="flex gap-3">
            <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
            Learns from your snippet usage for more accurate results.
          </li>
        </ul>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-white">
            How SnipRepo's AI Search Works
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            SnipRepo uses embeddings and vector search to match your query with
            the meaning of your code snippets — not just the text.
          </p>

          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li>AI converts your snippets into vector representations</li>
            <li>Queries are processed using semantic understanding</li>
            <li>SnipRepo retrieves the most relevant snippet instantly</li>
            <li>Results improve over time based on your usage patterns</li>
          </ul>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
          AI Search vs Traditional Keyword Search
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
              Traditional Search
            </h3>
            <ul className="text-gray-600 dark:text-gray-400 space-y-2">
              <li>❌ Only matches exact keywords</li>
              <li>❌ Fails when you forget function names</li>
              <li>❌ Can't understand code intent</li>
              <li>❌ Slow when browsing large collections</li>
            </ul>
          </div>

          <div className="p-6 bg-blue-50 dark:bg-blue-900/40 rounded-xl shadow border border-blue-300 dark:border-blue-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
              SnipRepo AI Search
            </h3>
            <ul className="text-gray-700 dark:text-gray-300 space-y-2">
              <li>✅ Semantic search understands meaning</li>
              <li>✅ Works with natural language queries</li>
              <li>✅ Orders results by contextual relevance</li>
              <li>✅ Instantly finds code across all languages</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-20 px-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Try AI Code Snippet Search Today
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Experience a smarter, faster way to find and reuse your code. Start free and upgrade anytime.
        </p>

        <Link
          to="/register"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-4 px-10 rounded-lg font-semibold shadow transition"
        >
          Create Your Free Account
        </Link>
      </section>
    </LandingLayout>
  );
}
