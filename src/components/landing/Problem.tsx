import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Clock, Copy, BrainCircuit } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
const problems = [
    {
        icon: <Clock className="w-12 h-12 text-red-500" />,
        title: "Time Wasted",
        desc: "Searching through old projects and files for that one snippet you wrote months ago"
    },
    {
        icon: <Copy className="w-12 h-12 text-red-500" />,
        title: "Duplicated Work",
        desc: "Rewriting the same code because you can't find the original implementation"
    },
    {
        icon: <BrainCircuit className="w-12 h-12 text-red-500" />,
        title: "Lost Knowledge",
        desc: "Valuable solutions and patterns forgotten over time"
    },
]
export function Problem() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Stop Wasting Time Searching
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Every developer faces the same problem: losing track of useful code snippets scattered across files, notes, and forgotten projects.
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
                                <div className="h-56 text-center p-4 md:p-8 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-800/30 flex flex-col items-center">
                                    <div className="w-16 h-16 mb-4 flex items-center justify-center bg-red-100 dark:bg-red-900/30 rounded-full">
                                        {problem.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{problem.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{problem.desc}</p>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </section >
    );
}