import { Search, Folder, Tag, Code2, TrendingUp, Lock, Sparkles, History, Link, Download } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
const features = [
    {
        icon: Search,
        iconBg: 'bg-blue-100 dark:bg-blue-900/30',
        iconColor: 'text-blue-600 dark:text-blue-400',
        title: 'Lightning-Fast Search',
        description: 'Find any snippet in milliseconds with full-text search across titles, descriptions, and code content. Never lose a snippet again.'
    },
    {
        icon: Folder,
        iconBg: 'bg-green-100 dark:bg-green-900/30',
        iconColor: 'text-green-600 dark:text-green-400',
        title: 'Smart Organization',
        description: 'Create custom folders with color coding to organize snippets by project, language, or any system that works for you.'
    },
    {
        icon: Tag,
        iconBg: 'bg-purple-100 dark:bg-purple-900/30',
        iconColor: 'text-purple-600 dark:text-purple-400',
        title: 'Flexible Tagging',
        description: 'Tag snippets with multiple labels for easy filtering and discovery. Perfect for cross-project patterns and reusable code.'
    },
    {
        icon: Code2,
        iconBg: 'bg-yellow-100 dark:bg-yellow-900/30',
        iconColor: 'text-yellow-600 dark:text-yellow-400',
        title: 'Multi-Language Support',
        description: 'Support for 15+ programming languages including JavaScript, Python, Java, C++, and more. All your code in one place.'
    },
    {
        icon: TrendingUp,
        iconBg: 'bg-red-100 dark:bg-red-900/30',
        iconColor: 'text-red-600 dark:text-red-400',
        title: 'Usage Analytics',
        description: 'Track your coding patterns with insights on most-used languages, favorite snippets, and activity trends over time.'
    },
    {
        icon: Lock,
        iconBg: 'bg-teal-100 dark:bg-teal-900/30',
        iconColor: 'text-teal-600 dark:text-teal-400',
        title: 'Secure & Private',
        description: 'Your code is encrypted and protected with industry-standard security. Row-level security ensures complete data privacy.'
    }
];

const extraFeatures = [
    { icon: History, iconColor: 'text-blue-600 dark:text-blue-400', title: 'Version History', description: 'Track every edit with diff view and restore previous versions' },
    { icon: Link, iconColor: 'text-green-600 dark:text-green-400', title: 'Snippet Embeds', description: 'Share snippets in blogs, docs, or Notion with embed codes' },
    { icon: Download, iconColor: 'text-orange-600 dark:text-orange-400', title: 'Import/Export', description: 'Backup and transfer snippets in JSON or Markdown format' },
    { icon: Sparkles, iconColor: 'text-purple-600 dark:text-purple-400', title: 'AI-Powered Tools', description: 'Auto-explain code, generate tags, and optimize snippets' },
];

export function Features() {
    return (
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Everything You Need to Master Your Code</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">Built by developers, for developers. Every feature designed to make your workflow faster and more efficient.</p>
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
                    {features.map(feature => (
                        <SwiperSlide key={feature.title}>
                            <div key={feature.title} className="h-80 bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition">
                                <div className={`${feature.iconBg} w-14 h-14 rounded-xl flex items-center justify-center mb-6`}>
                                    <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {/* <div className="mt-12 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-3xl p-5 md:p-8 border-2 border-purple-200 dark:border-purple-800">
                <div className="text-center mb-8">
                    <span className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <Sparkles className="w-4 h-4" />NEW FEATURES</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Even More Power at Your Fingertips</h3>
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
                            slidesPerView: 4
                        }
                    }}
                >
                    {extraFeatures.map(feature => (
                        <SwiperSlide key={feature.title}>
                            <div key={feature.title} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                                <feature.icon className={`w-8 h-8 ${feature.iconColor} mb-3`} />
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div> */}
        </section >
    );
}