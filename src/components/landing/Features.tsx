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
    title: 'Find Code Instantly',
    description:
      'Search across every saved snippet (titles, description, AND code) — no digging through repos, old projects, or Slack chats.'
  },
  {
    icon: Folder,
    iconBg: 'bg-green-100 dark:bg-green-900/30',
    iconColor: 'text-green-600 dark:text-green-400',
    title: 'Zero-Mess Organization',
    description:
      'Organize by projects, clients, languages, or frameworks. Colored folders help you visually find what matters quickly.'
  },
  {
    icon: Tag,
    iconBg: 'bg-purple-100 dark:bg-purple-900/30',
    iconColor: 'text-purple-600 dark:text-purple-400',
    title: 'Tag & Filter Like a Pro',
    description:
      'Attach tags like “auth”, “API”, “SQL”, “hooks”, etc., and instantly filter when you need something related.'
  },
  {
    icon: Code2,
    iconBg: 'bg-yellow-100 dark:bg-yellow-900/30',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
    title: 'Any Language. Any Framework.',
    description:
      'JavaScript, Python, SQL, Tailwind snippets, React hooks, reusable utilities — keep them all under one system.'
  },
  {
    icon: TrendingUp,
    iconBg: 'bg-red-100 dark:bg-red-900/30',
    iconColor: 'text-red-600 dark:text-red-400',
    title: 'Know What You Use Most',
    description:
      'Analytics show your most-used snippets, languages, and activity patterns — so you improve coding speed over time.'
  },
  {
    icon: Lock,
    iconBg: 'bg-teal-100 dark:bg-teal-900/30',
    iconColor: 'text-teal-600 dark:text-teal-400',
    title: 'Private By Default',
    description:
      'Encrypted storage, row-level security, device-synced access — your snippets are yours only.'
  }
];


export function Features() {
    return (
        <section
          id="features"
          aria-label="Key Features of SnipRepo Code Snippet Manager"
          className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900"
        >
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                      Find your past code in seconds — and reuse it instantly
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                      Your best code shouldn’t live inside old repos, Slack history, or forgotten projects. Save it once — and reuse it forever.
                    </p>
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
                    aria-label="Features list"
                >
                    {features.map(feature => (
                        <SwiperSlide key={feature.title} role="listitem">
                            <article className="h-80 bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition">
                                <div
                                  aria-hidden="true"
                                  className={`${feature.iconBg} w-14 h-14 rounded-xl flex items-center justify-center mb-6`}
                                >
                                    <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                            </article>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
