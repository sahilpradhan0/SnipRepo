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
    'AI-powered features including code summarization and tag suggestions',
];

const freePlanBaseFeatures = [
    '50 code snippets',
    'Unlimited folders and tags',
    'Full-text snippet search',
    'Multi-language support (15+ programming languages)',
    'Import/Export (JSON, Markdown)',
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
        tag: 'NO CREDIT CARD',
        tagline: 'Organize your code snippets with essential features',
        price: { monthly: 0, yearly: 0 },
        features: freePlanBaseFeatures,
        buttonText: 'Start Free — Takes 10 Seconds',
        buttonBgClass: 'bg-blue-600 hover:bg-blue-700',
        buttonShadowClass: 'shadow-blue-600/30',
        gradientFrom: 'from-blue-600',
        gradientTo: 'to-blue-700',
        borderColor: 'border-blue-600',
        taglineTextColor: 'text-blue-100',
    },
    {
        name: 'Pro Plan',
        tag: 'EARLY ACCESS OFFER',
        tagline: 'Unlock AI features, unlimited saving & deep analytics',
        price: { monthly: 9, yearly: 90 },
        features: [
            'Unlimited code snippets',
            ...freePlanBaseFeatures.slice(1),
            ...proExclusiveFeatures
        ],
        buttonText: 'Claim Early Access',
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
                        Pricing that grows when you grow
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Start free. Upgrade later only if you need unlimited storage and AI features.
                    </p>
                </div>

                {/* Billing Toggle */}
                <div className="flex justify-center mb-16">
                    <div className="relative bg-gray-200 dark:bg-gray-700/60 p-1 rounded-full grid grid-cols-2 w-full max-w-xs">
                        <div
                            className={`absolute top-1 left-1 h-[calc(100%-8px)] w-[calc(50%-4px)] bg-white dark:bg-gray-600 rounded-full shadow-md transition-transform duration-300 ease-in-out transform ${billingCycle === 'yearly' ? 'translate-x-full' : 'translate-x-0'}`}
                        />
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            className={`relative z-10 px-6 py-2 text-sm font-medium rounded-full ${billingCycle === 'monthly' ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle('yearly')}
                            className={`relative z-10 px-6 py-2 text-sm font-medium rounded-full flex items-center gap-2 ${billingCycle === 'yearly' ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}
                        >
                            Yearly
                            <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs px-2 py-0.5 rounded-full">
                                Save 17%
                            </span>
                        </button>
                    </div>
                </div>

                {/* Plans */}
                {/* <div className='max-w-4xl mx-auto w-full sm:px-4 mb-14'> */}
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
                        const monthlyPrice = plan.price.monthly;
                        const yearlyPrice = plan.price.yearly;

                        const price =
                            billingCycle === 'monthly'
                                ? `$${monthlyPrice}/mo`
                                : `$${yearlyPrice}/yr ($${(yearlyPrice / 12).toFixed(2)}/mo)`;

                        return (
                            <SwiperSlide key={plan.name}>
                                <article
                                    className={`bg-white mt-8 dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col flex-grow h-full max-w-lg mx-auto w-[90%] ${plan.isHighlighted ? 'scale-[1.03] border-4 ' + plan.borderColor : ''}`}
                                >

                                    <div className={`bg-gradient-to-r ${plan.gradientFrom} ${plan.gradientTo} text-white px-6 py-8 text-center`}>
                                        <div className="inline-block bg-white/20 px-4 py-1 rounded-full text-sm font-semibold mb-2">
                                            {plan.tag}
                                        </div>
                                        <h3 className="text-3xl font-bold mb-2">{plan.name}</h3>
                                        <p className={plan.taglineTextColor}>{plan.tagline}</p>
                                    </div>

                                    <div className="px-6 py-8 flex flex-col flex-grow">
                                        <div className="text-center mb-6">
                                            <div className="text-5xl font-extrabold text-gray-900 dark:text-white mb-3">
                                                {price}
                                            </div>

                                            {!isFree && (
                                                <p className="text-green-600 dark:text-green-300 text-sm">
                                                    Early users keep this price forever ⭐
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-3 mb-6 flex-grow">
                                            {plan.features.map(feature => (
                                                <div key={feature} className="flex items-center gap-3">
                                                    <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-1">
                                                        <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                                                    </div>
                                                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                        {isFree && (<div className='flex-grow'></div>)}
                                        < button
                                            onClick={onGetStarted}
                                            className={`w-full text-white font-bold py-4 rounded-lg transition text-lg shadow-lg ${plan.buttonBgClass} ${plan.buttonShadowClass}`}
                                        >
                                            {plan.buttonText}
                                        </button>

                                        {!isFree && (
                                            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">
                                                Cancel anytime — no long-term commitment
                                            </p>
                                        )}

                                        {isFree && (
                                            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">
                                                No credit card required · Save in the cloud
                                            </p>
                                        )}
                                    </div>
                                </article>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
                {/* </div> */}

                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Developers choose Pro once they need unlimited storage, AI-assisted workflows, and analytics.
                </p>
            </div>
        </section >
    );
}
