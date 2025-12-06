import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import LandingLayout from '../LandingLayout';
import { Check, ChevronDown } from 'lucide-react';
import ScreenshotGenerator from '../ScreenshotGenerator';
import { useNavigate } from 'react-router-dom';
import { track } from '../../../lib/api/PostHogAnalytics';
const faqs = [
  {
    question: "What is a code snippet screenshot generator?",
    answer: "A code snippet screenshot generator is an online tool that lets you paste your source code and convert it into a clean, syntax-highlighted image. With SnipRepo, you can choose themes, window style, fonts, padding, and download your code as a PNG for sharing on X, LinkedIn, GitHub READMEs, blogs, or documentation pages."
  },
  {
    question: "Do I need to sign up to use the tool?",
    answer: "No signup is required to use SnipRepo’s free online screenshot maker. You can paste your code, customize styling, and download screenshots instantly. Signing up is only needed if you want advanced features such as saving screenshots, removing the watermark, using Pro-only themes, or custom branding."
  },
  {
    question: "Can I customize themes and fonts?",
    answer: "Yes, SnipRepo offers multiple themes, font styles, padding sizes, and editor window layouts so you can design your screenshot exactly how you want. You can switch between light and dark themes, change background style, update window UI, and preview different code fonts before exporting the image."
  },
  {
    question: "How do I remove the watermark?",
    answer: "You can remove the watermark by upgrading to SnipRepo Pro. Upgrading unlocks watermark-free downloads, additional premium themes, custom branding options, and the ability to save your generated screenshots for later use."
  }
];


export default function ScreenshotGeneratorPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const navigate = useNavigate();
  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      track("Viewed Screenshot Generator Page");
    });

    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <LandingLayout>
      <Helmet>
        <title>Code Snippet Screenshot Generator — Create & Share Beautiful Code Images</title>
        <meta property="og:title" content="Code Snippet Screenshot Generator — SnipRepo" />
        <meta property="og:description" content="Create beautiful, share-worthy screenshots of your code snippets instantly — no signup required." />
        <meta property="og:url" content="https://sniprepo.com/screenshot" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />

        <meta
          name="description"
          content="Create stunning, shareable screenshots of your code snippets with SnipRepo’s free Code Snippet Screenshot Generator. No signup required. Remove watermark with Pro."
        />
        <link rel="canonical" href="https://sniprepo.com/screenshot" />

        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      </Helmet>

      {/* HERO */}
      <section className="py-20 text-center px-6 mt-20">
        <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          Create Beautiful Code Screenshots in Seconds
        </h1>
        <h2 className="text-xl max-w-2xl mx-auto mb-2 text-gray-700 dark:text-gray-300">
          Paste your code → choose a theme → download instantly
          No signup, no installation.
        </h2>
        <p className="text-xl max-w-2xl mx-auto mb-10 text-gray-700 dark:text-gray-300">Perfect for sharing code on X, LinkedIn, blogs & docs.</p>
      </section>

      {/* Screenshot Generator Tool */}
      <section id="screenshot-generator">
        <ScreenshotGenerator />
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center text-gray-900 dark:text-white">
          <h2 className="text-3xl font-semibold mb-6">Why Use SnipRepo’s Screenshot Generator?</h2>
          <ul className="space-y-4 text-gray-700 dark:text-gray-300">
            <li><Check className="inline w-6 h-6 mr-2 text-green-600 dark:text-green-400" />Lightning-fast client-side screenshot generation</li>
            <li><Check className="inline w-6 h-6 mr-2 text-green-600 dark:text-green-400" />Customizable themes and fonts</li>
            <li><Check className="inline w-6 h-6 mr-2 text-green-600 dark:text-green-400" />Free to use — no signup required</li>
            <li><Check className="inline w-6 h-6 mr-2 text-green-600 dark:text-green-400" />Watermark on free version for easy sharing and branding</li>
          </ul>
        </div>
      </section>

      {/* Upgrade CTA */}
      <section className="py-20 px-6 text-center bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
          Want watermark-free screenshots and more features?
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-xl mx-auto">
          Sign up for SnipRepo Pro and unlock advanced customization, save your screenshots, and remove the watermark.
        </p>
        <button
          onClick={() => navigate('/register')}
          className="bg-blue-600 text-white px-10 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Upgrade to Pro
        </button>
      </section>

      <div className="mt-16 text-center mb-16">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Loved by developers who share code online
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-lg">
          This tool is being built for:
        </p>

        <div className="mt-6 mx-auto w-fit text-left space-y-3 text-gray-700 dark:text-gray-300 text-base">
          <p>💬 Developers posting code on X & LinkedIn</p>
          <p>📄 Technical bloggers & documentation writers</p>
          <p>📁 GitHub README creators</p>
          <p>🎓 Students sharing their learning journey</p>
        </div>
      </div>



      {/* FAQ Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-20 px-6">
        <h2 className="text-3xl font-semibold mb-10 text-center text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="p-5 rounded-lg bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-700">
              <button
                onClick={() => toggleFaq(i)}
                className="w-full flex justify-between items-center text-left gap-4"
              >
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white flex-1">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-gray-500 transition-transform duration-200 flex-shrink-0 ${openFaqIndex === i ? 'rotate-180' : ''
                    }`}
                />
              </button>
              {openFaqIndex === i && (
                <p className="mt-3 text-gray-700 dark:text-gray-300 text-left">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

    </LandingLayout>
  );
}
