import { Star } from 'lucide-react';

const testimonials = [
    {
        quote: `"SnipRepo has transformed how I code. I used to waste hours searching for snippets. Now everything is organized and searchable. It's like having a second brain for my code!"`,
        name: 'Sarah Chen',
        title: 'Senior Frontend Engineer',
        color: 'from-blue-400 to-blue-600'
    },
    {
        quote: `"As a full-stack developer working with multiple languages, this tool is invaluable. The tagging system and search are incredibly fast. Best investment in my workflow this year."`,
        name: 'Michael Rodriguez',
        title: 'Full Stack Developer',
        color: 'from-green-400 to-green-600'
    },
    {
        quote: `"The folder organization and analytics features are game-changers. I can see my coding patterns and quickly find solutions I've used before. Highly recommended for any developer."`,
        name: 'Emily Johnson',
        title: 'Software Architect',
        color: 'from-purple-400 to-purple-600'
    }
];

const stats = [
    { value: '10,000+', label: 'Active Developers', color: 'text-blue-600 dark:text-blue-400' },
    { value: '500K+', label: 'Snippets Saved', color: 'text-green-600 dark:text-green-400' },
    { value: '15+', label: 'Languages Supported', color: 'text-purple-600 dark:text-purple-400' },
    { value: '4.9★', label: 'Average Rating', color: 'text-yellow-600 dark:text-yellow-400' }
];

export function Testimonials() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Trusted by Developers Worldwide
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Join thousands of developers who've supercharged their productivity
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map(testimonial => (
                        <div key={testimonial.name} className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-600">
                            <div className="flex items-center gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                ))}
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                                {testimonial.quote}
                            </p>
                            <div className="flex items-center gap-3">
                                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color}`}></div>
                                <div>
                                    <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.title}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map(stat => (
                        <div key={stat.label}>
                            <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                            <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}