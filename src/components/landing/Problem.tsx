import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Search, Layers, Repeat, Slash, Tag, Cloud } from "lucide-react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const problems = [
    {
        title: "Hard to Find Old Code",
        desc: "Your best snippets get buried in old projects, VSCode history, GitHub repos, or random folders — impossible to find when you need them.",
        icon: <Search className="w-8 h-8 text-red-600" />,
    },
    {
        title: "Snippets Scattered Everywhere",
        desc: "Code lives across notes, chats, Notion pages, StackOverflow drafts, and screenshots. There’s no single place to store and organize it.",
        icon: <Layers className="w-8 h-8 text-red-600" />,
    },
    {
        title: "Rewriting the Same Code Repeatedly",
        desc: "Without a proper code snippet manager, you end up rewriting the same functions, regex patterns, hooks, and utilities over and over.",
        icon: <Repeat className="w-8 h-8 text-red-600" />,
    },
    {
        title: "Poor or No Search",
        desc: "Searching through files or projects is slow and unreliable. Traditional editors don’t help you instantly search your saved code snippets.",
        icon: <Slash className="w-8 h-8 text-red-600" />,
    },
    {
        title: "No Tags or Organization System",
        desc: "Folders, bookmarks, and random notes fall apart at scale. Developers need structured tags and categories to keep snippets organized.",
        icon: <Tag className="w-8 h-8 text-red-600" />,
    },
    {
        title: "Code Lost Between Devices",
        desc: "Snippets saved on one machine never sync properly. Switching between laptop, work machine, and desktop leads to missing code.",
        icon: <Cloud className="w-8 h-8 text-red-600" />,
    },
];

export function Problem() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Why Developers Lose Code Snippets — And How SnipRepo Fixes It
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Developers waste hours searching for old code snippets scattered across folders, notes, chats, and forgotten projects. SnipRepo keeps your snippets organized, searchable, and always within reach.
                    </p>

                </div>
                <Swiper
                    spaceBetween={30}
                    className='pb-10'
                    modules={[Pagination]}
                    pagination={{ clickable: false, dynamicBullets: true }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1
                        },
                        640: {
                            slidesPerView: 2
                        },
                        1024: {
                            slidesPerView: 3
                        }
                    }}
                >
                    {
                        problems.map((problem) => (
                            <SwiperSlide key={problem.title}>
                                <div className="h-64 sm:h-58 text-center p-3 md:p-6 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-800/30 flex flex-col items-center">
                                    <div className="w-16 h-16 mb-4 flex items-center justify-center bg-red-100 dark:bg-red-900/30 rounded-full">
                                        {problem.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{problem.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-2">{problem.desc}</p>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </section >
    );
}