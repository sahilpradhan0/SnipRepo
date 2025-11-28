import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-6">
      <div className="text-center max-w-lg mx-auto p-10 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">

        {/* Emoji / Icon */}
        <div className="text-7xl mb-6">🧩</div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Page Not Found
        </h1>

        <p className="text-lg opacity-80 mb-8">
          Looks like this page took a coffee break ☕  
          <br />
          Or maybe the URL is incorrect.
        </p>

        {/* Suggested Actions */}
        <div className="space-y-4">
          <Link
            to="/"
            className="block w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
          >
            Go Back Home
          </Link>

          <Link
            to="/dashboard"
            className="block w-full px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg font-semibold transition-all"
          >
            Open Dashboard
          </Link>
        </div>

        {/* Small footer */}
        <p className="mt-10 text-sm opacity-60">
          Error Code: <span className="font-mono">404</span>
        </p>
      </div>
    </div>
  );
}
