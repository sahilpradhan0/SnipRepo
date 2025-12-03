import React from "react";
import { Helmet } from "react-helmet-async";
import { Check, X, GitBranch } from "lucide-react";
import { Link } from "react-router-dom";
import LandingLayout from "../LandingLayout";

export default function SnipRepoVsGist() {
  return (
    <LandingLayout>
      <Helmet>
        <title>SnipRepo vs GitHub Gist — Best Tool for Code Snippet Management</title>
        <meta
          name="description"
          content="SnipRepo vs GitHub Gist — Compare features, search, organization, security, and team collaboration. See which snippet tool is best for developers in 2025."
        />
        <meta
          name="keywords"
          content="SnipRepo vs Gist, GitHub Gist alternative, best snippet manager, code snippet tool comparison, snippet manager vs gist"
        />
        <link rel="canonical" href="https://sniprepo.com/sniprepo-vs-gist" />
      </Helmet>

      {/* HERO */}
      <section className="py-32 px-6 max-w-5xl mx-auto text-center">
        <GitBranch className="w-14 h-14 text-blue-600 dark:text-blue-400 mx-auto mb-5" />

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          SnipRepo vs GitHub Gist
        </h1>

        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          GitHub Gist is great for sharing public snippets.
          <br />
          SnipRepo is built for storing, organizing, and searching your private code efficiently.
        </p>
      </section>

      {/* INTRO */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
          Developers often rely on GitHub Gist to store quick code samples. But as your snippet
          collection grows, Gist becomes hard to maintain — lacking organization, search power,
          privacy controls, and developer-focused workflow tools.
          <br />
          <br />
          SnipRepo solves this by offering a dedicated snippet manager designed for personal coding,
          team sharing, and AI-powered discovery.
        </p>
      </section>

      {/* COMPARISON TABLE */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8">
            SnipRepo vs GitHub Gist — Feature Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-gray-200 dark:border-gray-700">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="p-4 font-semibold text-gray-900 dark:text-gray-200">Feature</th>
                  <th className="p-4 font-semibold text-gray-900 dark:text-gray-200">SnipRepo</th>
                  <th className="p-4 font-semibold text-gray-900 dark:text-gray-200">GitHub Gist</th>
                </tr>
              </thead>

              <tbody className="text-gray-700 dark:text-gray-300">
                <tr>
                  <td className="p-4">AI-Powered Search</td>
                  <td className="p-4"><Check className="text-green-500" /></td>
                  <td className="p-4"><X className="text-red-500" /></td>
                </tr>

                <tr>
                  <td className="p-4">Folders & Tag Organization</td>
                  <td className="p-4"><Check className="text-green-500" /></td>
                  <td className="p-4"><X className="text-red-500" /></td>
                </tr>

                <tr>
                  <td className="p-4">Private Snippet Storage</td>
                  <td className="p-4"><Check className="text-green-500" /></td>
                  <td className="p-4"><Check className="text-green-500" /></td>
                </tr>

                <tr>
                  <td className="p-4">Syntax-Highlighted Editor</td>
                  <td className="p-4"><Check className="text-green-500" /></td>
                  <td className="p-4"><X className="text-red-500" /></td>
                </tr>

                <tr>
                  <td className="p-4">Team Sharing & Permissions</td>
                  <td className="p-4"><Check className="text-green-500" /></td>
                  <td className="p-4"><X className="text-red-500" /></td>
                </tr>

                <tr>
                  <td className="p-4">Version History</td>
                  <td className="p-4"><Check className="text-green-500" /></td>
                  <td className="p-4">Limited</td>
                </tr>

                <tr>
                  <td className="p-4">Save Terminal Commands</td>
                  <td className="p-4"><Check className="text-green-500" /></td>
                  <td className="p-4"><X className="text-red-500" /></td>
                </tr>

                <tr>
                  <td className="p-4">Snippet Enrichment (Notes, AI Tags)</td>
                  <td className="p-4"><Check className="text-green-500" /></td>
                  <td className="p-4"><X className="text-red-500" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE SNIPREPO */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
          Why Developers Switch from Gist to SnipRepo
        </h2>

        <ul className="space-y-4 text-gray-700 dark:text-gray-300">
          <li className="flex gap-3">
            <Check className="text-green-500" />
            Manage hundreds of snippets without chaos or scrolling endlessly.
          </li>
          <li className="flex gap-3">
            <Check className="text-green-500" />
            AI retrieves the exact snippet you’re thinking of — even if you forget the name.
          </li>
          <li className="flex gap-3">
            <Check className="text-green-500" />
            Keep personal code fully private, not tied to GitHub accounts or repos.
          </li>
          <li className="flex gap-3">
            <Check className="text-green-500" />
            Team collaboration works out of the box, with permissions and shared folders.
          </li>
        </ul>
      </section>

      {/* CTA */}
      <section className="text-center py-20 px-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Ready to Upgrade from Gist?
        </h2>

        <p className="text-gray-700 dark:text-gray-300 mb-8">
          Import your existing snippets easily and start organizing them the smart way.
        </p>

        <Link
          to="/register"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-4 px-10 rounded-lg font-semibold shadow transition"
        >
          Get Started Free
        </Link>
      </section>
    </LandingLayout>
  );
}
