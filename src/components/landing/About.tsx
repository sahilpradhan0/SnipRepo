import { StaticPageLayout } from "./StaticPageLayout";

export function About() {
  return (
    <StaticPageLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-10 border border-gray-200 dark:border-gray-700">

          {/* Header */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            About SnipRepo
          </h1>
          <p className="text-lg text-center opacity-80 max-w-2xl mx-auto mb-12">
            SnipRepo is built for developers who want a faster, smarter way to
            organize and use their code. No clutter. No hunting for snippets.
            Just clean productivity.
          </p>

          {/* Mission Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="opacity-80 leading-relaxed">
              Every developer writes code, reuses code, copies code, and searches
              for code — constantly. Yet most tools for managing snippets are
              either outdated, slow, or too complicated.
              <br /><br />
              SnipRepo exists to fix that.
              Our mission is simple: <strong>make developers faster by giving
                them a clean, modern, AI-supercharged home for all their snippets.</strong>
            </p>
          </section>

          {/* Features Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">What We’re Building</h2>

            <ul className="space-y-4">
              <li className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
                ⚡ Lightning-fast snippet search with smart filters
              </li>

              <li className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
                ✨ AI-powered explanations, summaries, and improvements
              </li>

              <li className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
                🗂️ Clean structure with Folders & Tags — not chaos
              </li>

              <li className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
                📚 Full version history for every snippet
              </li>

              <li className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
                🔐 Private, secure storage powered by Supabase
              </li>
            </ul>
          </section>

          {/* Story Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-4">Why I Built SnipRepo</h2>
            <p className="opacity-80 leading-relaxed">
              SnipRepo started as a personal frustration.
              I was constantly copy-pasting the same logic across projects,
              searching old repos, scrolling through notes or Notion,
              and wasting time rewriting things that already existed.
              <br /><br />
              I wanted a tool that was:
              <br />
              — simple
              — fast
              — beautifully organized
              — and enhanced with AI
              <br /><br />
              But everything online felt bloated or outdated.
              So I built SnipRepo — and now I'm building it publicly, improving it
              every single day.
            </p>
          </section>
        </div>
      </div>
    </StaticPageLayout>
  );
}
