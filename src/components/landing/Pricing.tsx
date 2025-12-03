import { Check } from 'lucide-react'; 
import { useState } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

interface PricingProps {
    onGetStarted: () => void;
}

const proExclusiveFeatures = [
    'Usage analytics dashboard',
    'Version history with diff view',
    'Snippet embeds (iFrame, Markdown, HTML)',
    'Import/Export (JSON, Markdown)',
    'AI-powered features including code summarization and tag suggestions',
];

const freePlanBaseFeatures = [
    '50 code snippets',
    'Unlimited folders and tags',
    'Full-text snippet search',
    'Multi-language support (15+ programming languages)',
    'Secure cloud storage with row-level security',
];

interface Plan {
    name: string;
    tag?: string;
    tagline: string;
    price: {
        monthly: number;
        yearly: number;
    };
    features: string[];
    buttonText: string;
    buttonBgClass: string;
    buttonShadowClass: string;
    gradientFrom: string;
    gradientTo: string;
    borderColor: string;
    taglineTextColor: string;
    isHighlighted?: boolean;
}

const plans: Plan[] = [
    {
        name: 'Free Forever Plan',
        tag: 'LAUNCH OFFER',
        tagline: 'Organize your code snippets with essential features',
        price: { monthly: 0, yearly: 0 },
        features: freePlanBaseFeatures,
        buttonText: 'Get Started for Free',
        buttonBgClass: 'bg-blue-600 hover:bg-blue-700',
        buttonShadowClass: 'shadow-blue-600/30',
        gradientFrom: 'from-blue-600',
        gradientTo: 'to-blue-700',
        borderColor: 'border-blue-600',
        taglineTextColor: 'text-blue-100',
    },
    {
        name: 'Pro Plan',
        tagline: 'Unlock advanced code snippet management features',
        price: { monthly: 9, yearly: 90 },
        features: [
            'Unlimited code snippets',
            ...freePlanBaseFeatures.slice(1),
            ...proExclusiveFeatures
        ],
        buttonText: 'Join the Waitlist',
        buttonBgClass: 'bg-purple-600 hover:bg-purple-700',
        buttonShadowClass: 'shadow-purple-600/30',
        gradientFrom: 'from-purple-600',
        gradientTo: 'to-purple-700',
        borderColor: 'border-purple-600',
        taglineTextColor: 'text-purple-100',
        isHighlighted: true,
    },
];

export function Pricing({ onGetStarted }: PricingProps) {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    return (
        <section
          id="pricing"
          aria-label="SnipRepo pricing plans and subscription options"
          className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-slate-50 dark:from-gray-800 dark:to-gray-900"
        >
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                      Simple, Transparent Pricing for Code Snippet Management
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                      Start free and upgrade anytime to access pro features designed for developers who want more power and flexibility.
                    </p>
                </div>

                {/* Billing cycle toggle */}
                <div className="flex justify-center mb-16" role="group" aria-label="Select billing cycle for SnipRepo plans">
                    <div className="relative bg-gray-200 dark:bg-gray-700/50 p-1 rounded-full grid grid-cols-2 w-full max-w-xs">
                        <div
                            className={`absolute top-1 left-1 h-[calc(100%-8px)] w-[calc(50%-4px)] bg-white dark:bg-gray-700 rounded-full shadow-md transition-transform duration-300 ease-in-out transform ${billingCycle === 'yearly' ? 'translate-x-full' : 'translate-x-0'}`}
                        />
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            className={`relative z-10 px-6 py-2 text-sm font-medium rounded-full transition-colors duration-300 focus:outline-none ${billingCycle === 'monthly' ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}
                            aria-pressed={billingCycle === 'monthly'}
                            aria-label="Select monthly billing"
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle('yearly')}
                            className={`relative z-10 px-6 py-2 text-sm font-medium rounded-full transition-colors duration-300 focus:outline-none flex items-center justify-center gap-2 ${billingCycle === 'yearly' ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}
                            aria-pressed={billingCycle === 'yearly'}
                            aria-label="Select yearly billing"
                        >
                            Yearly
                            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">Save 17%</span>
                        </button>
                    </div>
                </div>

                {/* Plans list */}
                <div className='max-w-4xl mx-auto w-full sm:px-4 mb-14' role="list" aria-label="Pricing plans">
                    <Swiper
                        spaceBetween={30}
                        className='pb-16'
                        modules={[Pagination]}
                        pagination={{ clickable: false, dynamicBullets: true }}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            1024: { slidesPerView: 2 }
                        }}
                    >
                        {plans.map(plan => {
                            const isFree = plan.price.monthly === 0;
                            const price = billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly;
                            const priceSuffix = isFree ? '' : billingCycle === 'monthly' ? '/mo' : '/yr';
                            const priceDescription = isFree
                                ? 'Forever free, no credit card required'
                                : billingCycle === 'monthly'
                                    ? `or $${plan.price.yearly}/year`
                                    : '';

                            return (
                                <SwiperSlide key={plan.name} role="listitem" className="h-auto pb-4">
                                    <article
                                        className={`bg-white mt-8 dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-full ${plan.borderColor ? `border-4 ${plan.borderColor}` : ''} ${plan.isHighlighted ? 'transform relative z-10' : ''}`}
                                        aria-labelledby={`${plan.name.replace(/\s+/g, '-').toLowerCase()}-title`}
                                    >
                                        <div className={`bg-gradient-to-r ${plan.gradientFrom} ${plan.gradientTo} text-white px-4 sm:px-8 py-6 text-center`}>
                                            {plan.tag && (
                                                <div className="inline-block bg-white/20 px-4 py-1 rounded-full text-sm font-semibold mb-2" aria-label={`${plan.tag} label`}>
                                                    {plan.tag}
                                                </div>
                                            )}
                                            <h3 id={`${plan.name.replace(/\s+/g, '-').toLowerCase()}-title`} className="text-3xl font-bold mb-2">{plan.name}</h3>
                                            <p className={plan.taglineTextColor}>{plan.tagline}</p>
                                        </div>
                                        <div className="px-4 py-8 sm:p-8 flex flex-col flex-grow">
                                            <div className="text-center mb-6">
                                                <div className="text-6xl font-bold text-gray-900 dark:text-white mb-2">
                                                    ${price}
                                                    {priceSuffix && <span className="text-3xl">{priceSuffix}</span>}
                                                </div>
                                                <div className="text-gray-600 dark:text-gray-400">{priceDescription}</div>
                                            </div>
                                            <div className="space-y-3 mb-6 flex-grow">
                                                {plan.features.map(feature => (
                                                    <div key={feature} className="flex items-center gap-3">
                                                        <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-1" aria-hidden="true">
                                                            <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                                                        </div>
                                                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <button
                                                onClick={onGetStarted}
                                                className={`w-full text-white font-bold py-4 px-8 rounded-lg transition text-lg shadow-lg ${plan.buttonBgClass} ${plan.buttonShadowClass}`}
                                                aria-label={`Select the ${plan.name} and start organizing your code snippets`}
                                            >
                                                {plan.buttonText}
                                            </button>
                                        </div>
                                    </article>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
