import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Search, Layers, Repeat, Slash, Tag, Cloud } from "lucide-react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const problems = [
    {
        title: "You waste time hunting old code",
        desc: "Each week you spend 20–40 minutes searching old repos, chats, VSCode history, or rewriting code you already solved before.",
        icon: <Search className="w-8 h-8 text-red-600" />,
    },
    {
        title: "Your code is scattered everywhere",
        desc: "Bits live in Notion, screenshots, WhatsApp messages, past projects, StackOverflow drafts—none of it searchable when needed.",
        icon: <Layers className="w-8 h-8 text-red-600" />,
    },
    {
        title: "You rewrite the same code repeatedly",
        desc: "Regex patterns, utility hooks, auth flows, tailwind configs… you already wrote them once, but you end up rewriting from scratch.",
        icon: <Repeat className="w-8 h-8 text-red-600" />,
    },
    {
        title: "Search is the real bottleneck",
        desc: "Traditional file search can’t find inside comments, variations, or context—so finding working snippets is trial and error.",
        icon: <Slash className="w-8 h-8 text-red-600" />,
    },
    {
        title: "Nothing stays organized over time",
        desc: "Bookmarks, random folders, and note apps fall apart once you hit 50+ snippets, making everything harder to retrieve.",
        icon: <Tag className="w-8 h-8 text-red-600" />,
    },
    {
        title: "Your snippets are stuck on one machine",
        desc: "Laptop vs Work Machine vs Office PC = different code copies. Switching devices means losing half your saved knowledge.",
        icon: <Cloud className="w-8 h-8 text-red-600" />,
    },
];


export function Problem() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Developers lose hours every week searching for old code
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Every developer has code they've already solved that gets lost inside old projects, chats, and local folders — so they rewrite it again.
                        SnipRepo makes your past work instantly searchable and reusable.
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