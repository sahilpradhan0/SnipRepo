import { Code2, Users, Briefcase, Sparkles } from "lucide-react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
export default function TrustSection() {
    const personas = [
        {
            icon: <Code2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
            title: "Solo Developers",
            desc: "Keep reusable functions, hooks, regex, and snippets always accessible across projects.",
        },
        {
            icon: <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
            title: "Small Teams",
            desc: "Share common scripts, configs, and utilities without Slack messages or multiple repos.",
        },
        {
            icon: <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
            title: "Freelancers & Agencies",
            desc: "Reuse code for multiple clients efficiently without rewriting everything.",
        },
    ];

    return (
        <section className="max-w-7xl mx-auto px-6 py-20">

            {/* Who is this for */}
            <div className="mb-16">
                <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-10">
                    Who is SnipRepo for?
                </h2>
            </div>

            <Swiper
                spaceBetween={30}
                className='pb-10'
                modules={[Pagination]}
                pagination={{ clickable: false, dynamicBullets: true }}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 }
                }}
                role="list"
                aria-label="Features list">
                {personas.map((p, i) => (
                    <SwiperSlide key={p.title}>
                        <div
                            key={i}
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-md transition"
                        >
                            <div className="flex justify-center mb-3">{p.icon}</div>
                            <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-white">
                                {p.title}
                            </h3>
                            <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-2">
                                {p.desc}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>


            {/* Testimonials */}
            <div className="text-center border border-gray-200 dark:border-gray-700 rounded-xl p-10 bg-gray-50 dark:bg-gray-800/40 mt-10">
                <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">
                    🚀 Real developer testimonials coming soon
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                    Currently onboarding early users. Want to be among the first?
                </p>

                <button className="mt-4 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm">
                    Try SnipRepo early
                </button>
            </div>
        </section>
    );
}
