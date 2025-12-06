import { Folder, Search, Cloud } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
export default function ValueSnapshot() {
    const items = [
        {
            icon: <Search className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
            title: "Find snippets instantly",
            desc: "No scrolling or digging — just search and it's there",
        },
        {
            icon: <Folder className="w-6 h-6 text-green-600 dark:text-green-400" />,
            title: "Stay organized effortlessly",
            desc: "Folders & tags keep everything well structured",
        },
        {
            icon: <Cloud className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
            title: "Access anywhere",
            desc: "Snippets sync securely across devices",
        },
    ];

    return (
        <section className="max-w-6xl mx-auto py-16 px-6">
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
                aria-label="Features list"
            >
                {items.map((item, idx) => (
                    <SwiperSlide key={item.title} role="listitem">
                        <div
                            className="bg-white dark:bg-gray-800  border border-gray-200 dark:border-gray-700 shadow-sm rounded-2xl p-6 hover:shadow-lg hover:scale-[1.02] 
transition-transform duration-200 flex flex-col items-center text-center h-40 "
                        >
                            <div
                                className="
                w-12 h-12 
                rounded-xl 
                bg-gray-100 dark:bg-gray-700 
                flex items-center justify-center
                mb-4
              "
                            >
                                {item.icon}
                            </div>

                            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                                {item.title}
                            </h3>

                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section >
    );
}
