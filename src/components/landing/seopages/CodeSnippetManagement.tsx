import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import LandingLayout from "../LandingLayout";

const CodeSnippetManagement = () => {
  return (
    <LandingLayout>
      <Helmet>
        <title>Code Snippet Management — Organize, Search & Store Snippets Fast | SnipRepo</title>
        <meta
          name="description"
          content="The ultimate code snippet management system for developers. Save, organize, search, and access code faster with AI-powered tools, tags, folders, and secure storage."
        />
        <meta
          name="keywords"
          content="code snippet management, snippet organizer, save code snippets, dev productivity, code management tool, snippet search"
        />
        <link rel="canonical" href="https://sniprepo.com/code-snippet-management" />
      </Helmet>

      <div className="max-w-5xl mx-auto px-6 py-16 mt-20">

        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">
          Code Snippet Management Made Simple & Fast
        </h1>

        <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 max-w-3xl">
          SnipRepo helps developers store, organize, and search their code snippets instantly. 
          No more digging through old repos, chats, or Notion pages — keep everything in one 
          fast, searchable place built for real coding workflows.
        </p>

        {/* CTA */}
        <Link
          to="/register"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-4 rounded-xl shadow-lg transition"
        >
          Start Managing Snippets Free →
        </Link>

        {/* Section: Why snippet management matters */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Why Code Snippet Management Matters
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Developers reuse code constantly. A good snippet management system helps you:
          </p>

          <ul className="list-disc ml-6 space-y-3 text-gray-700 dark:text-gray-300">
            <li>Store frequently used functions, configs, commands, and templates</li>
            <li>Search old snippets instantly instead of rewriting code</li>
            <li>Keep your workflows consistent across projects</li>
            <li>Avoid losing snippets in random files or chats</li>
            <li>Access snippets across all your devices</li>
          </ul>
        </section>

        {/* Features */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            SnipRepo Makes Code Snippet Management Effortless
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                🔍 AI-Powered Search
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Find any snippet in milliseconds using natural language or keywords.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                🏷 Tagging & Folders
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Organize your snippets cleanly with tags and folders built for dev workflows.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                💻 20+ Language Syntax Highlighting
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Save code with perfect formatting across all major languages.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                🔐 Secure Cloud Storage
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Your snippets stay safe with role-level security and encrypted storage.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Ready to Organize Your Snippets the Right Way?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Join developers who stopped losing code and started working faster.
          </p>

          <Link
            to="/register"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-10 py-4 rounded-xl shadow-lg transition"
          >
            Create Free Account →
          </Link>
        </div>
      </div>
    </LandingLayout>
  );
};

export default CodeSnippetManagement;
