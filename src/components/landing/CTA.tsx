import { ArrowRight } from 'lucide-react';

interface CTAProps {
    onGetStarted: () => void;
}

export function CTA({ onGetStarted }: CTAProps) {
    return (
        <section
            className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white"
            aria-label="Call to action to start organizing your code snippets"
        >
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Ready to Transform Your Developer Workflow?
                </h2>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                    Join thousands of developers who have streamlined their coding by organizing snippets efficiently. Start free today — no credit card required.
                </p>
                <button
                    onClick={onGetStarted}
                    className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-4 px-12 rounded-lg transition text-lg shadow-xl inline-flex items-center gap-2"
                    aria-label="Start organizing your code snippets for free"
                >
                    Start Organizing Free <ArrowRight className="w-5 h-5" />
                </button>
                <p className="text-blue-100 mt-6" aria-live="polite">
                    Free forever • No credit card required
                </p>
            </div>
        </section>
    );
}
