import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CTA() {
    const navigate = useNavigate();

    return (
        <section className="py-24 bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Save Your First Code Snippet — Instantly
            </h2>

            <p className="text-lg opacity-90 max-w-xl mx-auto mb-8">
                No signup required. Just paste your snippet, save, and search it later.
                It takes less than 10 seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto w-full">
                <button
                    onClick={() => navigate('/create-snippet')}
                    className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 transition flex items-center justify-center gap-2"
                >
                    Save a Snippet Free
                    <ArrowRight className="w-5 h-5" />
                </button>

                <button
                    onClick={() => navigate('/login')}
                    className="px-8 py-4 border border-white/70 font-medium rounded-lg hover:bg-white hover:text-blue-700 transition flex items-center justify-center gap-2"
                >
                    Login & Sync Everything
                </button>
            </div>

            <p className="text-sm opacity-80 mt-8">
                Unlimited storage, syncing across devices, history & more — once you login.
            </p>

            <p className="text-sm opacity-80 mt-2 italic">
                Early access users get future perks & discounted plans.
            </p>
        </section>
    );
}
