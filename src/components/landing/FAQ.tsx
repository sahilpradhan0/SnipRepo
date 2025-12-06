import React from 'react';

const faqs = [
  {
    question: 'Is my code secure in SnippetVault?',
    answer:
      'Absolutely. We use industry-standard encryption for your data both in transit and at rest. Your code snippets are your intellectual property, and we treat their security as our highest priority.',
  },
  {
    question: 'Can I share snippets with my team?',
    answer:
      'Yes! Team collaboration is a core part of SnippetVault. You can create shared vaults for your team to ensure everyone is using the same approved, up-to-date code snippets, which is perfect for onboarding and maintaining consistency.',
  },
  {
    question: 'How is this better than just using a text file or a Gist?',
    answer:
      'SnippetVault is built for speed and organization. Unlike a messy text file or scattered Gists, it offers powerful search, tagging, and team-sharing capabilities. It turns your snippets from a disorganized collection into a powerful, searchable knowledge base.',
  },
  {
    question: 'What integrations do you support?',
    answer:
      "We are actively developing integrations for popular IDEs like VS Code, JetBrains, and more. Our goal is to bring your snippets directly into the workflow where you need them most. Stay tuned for announcements!",
  },
];

export function FAQ() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
        <h2 className="mb-8 text-center text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="mx-auto mt-8 max-w-3xl divide-y divide-gray-200 dark:divide-gray-700">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group py-5"
              // Open the first FAQ by default
              open={index === 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-gray-900 dark:text-white">
                {faq.question}
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="group-open:animate-fadeIn mt-3 text-gray-500 dark:text-gray-400">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}