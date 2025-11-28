import { Check, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { useSubscription } from '../contexts/SubscriptionContext';
import { JoinWaitlist } from './JoinWaitlist';

interface DashboardPricingProps {
    currentPlan: string;
    showPricing: boolean;
    setShowPricing: (show: boolean) => void;
}

const proExclusiveFeatures = [
    'Usage analytics dashboard',
    'Version history with diff view',
    'Snippet embeds (iFrame, Markdown, HTML)',
    'Import/Export (JSON, Markdown)',
    'AI-powered code insights',
];

const freePlanBaseFeatures = [
    '50 snippets',
    'Unlimited folders and tags',
    'Full-text search',
    'Multi-language support (15+)',
    'Secure cloud storage with RLS',
];

interface Plan {
    name: string;
    tag?: string; // Optional tag like "LAUNCH OFFER"
    tagline: string;
    price: {
        monthly: number;
        yearly: number;
    };
    features: string[];
    buttonText: string;
    buttonBgClass: string; // Tailwind classes for background and hover
    buttonShadowClass: string; // Tailwind classes for shadow
    gradientFrom: string;
    gradientTo: string;
    borderColor: string;
    taglineTextColor: string; // e.g., "text-blue-100"
    isHighlighted?: boolean;
    isActive?: boolean;
}


export function DashboardPricing({ currentPlan, showPricing, setShowPricing }: DashboardPricingProps) {
    const { subscription } = useSubscription();
    const [showWaitlist, setShowWaitlist] = useState(false);
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    useEffect(() => {
        // Prevent background scrolling when the modal is open
        document.body.style.overflow = 'hidden';

        // Re-enable scrolling when the modal is closed
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleWaitlistClick = () => {
        setShowWaitlist(true);
    };

    if (showWaitlist) {
        return <JoinWaitlist setShowWaitlist={setShowWaitlist} setShowPricing={setShowPricing} />;
    }

    const plans: Plan[] = [
        {
            name: 'Free Forever Plan',
            tagline: 'For individuals and hobbyists getting started',
            price: { monthly: 0, yearly: 0 },
            features: freePlanBaseFeatures,
            buttonText: 'Get Started for Free',
            buttonBgClass: 'bg-blue-600 hover:bg-blue-700',
            buttonShadowClass: 'shadow-blue-600/30',
            gradientFrom: 'from-blue-600',
            gradientTo: 'to-blue-700',
            borderColor: 'border-blue-600',
            taglineTextColor: 'text-blue-100',
            isActive: subscription?.plan === 'free',
        },
        {
            name: 'Pro Plan',
            tagline: 'Unlock advanced features for power users',
            price: { monthly: 9, yearly: 90 },
            features: [
                'Everything in Free, plus:',
                'Unlimited snippets', ...proExclusiveFeatures],
            buttonText: 'Join the Waitlist',
            buttonBgClass: 'bg-purple-600 hover:bg-purple-700',
            buttonShadowClass: 'shadow-purple-600/30',
            gradientFrom: 'from-purple-600',
            gradientTo: 'to-purple-700',
            borderColor: 'border-purple-600',
            taglineTextColor: 'text-purple-100',
            isHighlighted: true, // Highlight the Pro plan
            isActive: subscription?.plan === 'pro',
        },
    ];


    return (
        <div className="fixed inset-0 bg-black/50 z-50 p-4 flex items-start sm:items-center justify-center" data-lenis-prevent-wheel>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-7xl w-[95%] sm:w-full mx-auto flex flex-col max-h-[95vh] overflow-y-auto">
                <div className="flex-shrink-0 flex items-center justify-between p-4 sm:p-6">
                    <div />
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition" onClick={() => setShowPricing(false)}>
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="text-center px-4">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">Upgrade Your Plan</h2>
                    <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">Unlock more power and take your productivity to the next level.</p>
                </div>
                <div className="flex justify-center my-6 sm:my-8">
                    <div className="relative bg-gray-200 dark:bg-gray-700/50 p-1 rounded-full grid grid-cols-2 w-full max-w-xs">
                        <div
                            className={`absolute top-1 left-1 h-[calc(100%-8px)] w-[calc(50%-4px)] bg-white dark:bg-gray-700 rounded-full shadow-md transition-transform duration-300 ease-in-out transform ${billingCycle === 'yearly' ? 'translate-x-full' : 'translate-x-0'
                                }`}
                        />
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            className={`relative z-10 px-6 py-2 text-sm font-medium rounded-full transition-colors duration-300 focus:outline-none ${billingCycle === 'monthly'
                                ? 'text-gray-900 dark:text-white'
                                : 'text-gray-600 dark:text-gray-400'
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle('yearly')}
                            className={`relative z-10 px-6 py-2 text-sm font-medium rounded-full transition-colors duration-300 focus:outline-none flex items-center justify-center gap-2 ${billingCycle === 'yearly'
                                ? 'text-gray-900 dark:text-white'
                                : 'text-gray-600 dark:text-gray-400'
                                }`}
                        >
                            Yearly
                            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">Save 17%</span>
                        </button>
                    </div>
                </div>
                <div className='max-w-4xl mx-auto w-full px-4 mb-8 sm:mb-14'>
                    <Swiper
                        spaceBetween={30}
                        className='pb-16'
                        modules={[Pagination]}
                        pagination={{ clickable: false, dynamicBullets: true }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1
                            },
                            1024: {
                                slidesPerView: 2
                            }
                        }}
                    >
                        {plans.map((plan) => (
                            <SwiperSlide key={plan.name} className="h-auto">
                                {(() => {
                                    const isFree = plan.price.monthly === 0;
                                    const price = billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly;
                                    const priceSuffix = isFree ? '' : billingCycle === 'monthly' ? '/mo' : '/yr';
                                    const priceDescription = isFree
                                        ? 'Forever free, no credit card required'
                                        : billingCycle === 'monthly'
                                            ? `or $${plan.price.yearly}/year`
                                            : ``;

                                    return (
                                        <div
                                            key={plan.name}
                                            className={`bg-white mt-8 dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-full ${plan.borderColor ? `border-4 ${plan.borderColor}` : ''} ${plan.isHighlighted ? 'transform relative z-10' : ''}`}
                                        >
                                            <div className={`bg-gradient-to-r ${plan.gradientFrom} ${plan.gradientTo} text-white px-4 sm:px-8 py-6 text-center`}>
                                                {plan.tag && (
                                                    <div className="inline-block bg-white/20 px-4 py-1 rounded-full text-sm font-semibold mb-2">{plan.tag}</div>
                                                )}
                                                <h3 className="text-3xl font-bold mb-2">{plan.name}</h3>
                                                <p className={plan.taglineTextColor}>{plan.tagline}</p>
                                            </div>
                                            <div className="p-4 sm:p-8 flex flex-col flex-grow">
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
                                                            <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-1"><Check className="w-5 h-5 text-green-600 dark:text-green-400" /></div>
                                                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <button
                                                    disabled={plan.isActive}
                                                    onClick={plan.buttonText === 'Join the Waitlist' ? handleWaitlistClick : undefined}
                                                    className={`w-full text-white ${plan.isActive ? 'opacity-50 cursor-not-allowed' : ''} font-bold py-4 px-8 rounded-lg transition text-lg shadow-lg ${plan.buttonBgClass} ${plan.buttonShadowClass}`}>
                                                    {plan.isActive ? 'Current Plan' : plan.buttonText}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })()}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

            </div>
        </div>
    );
}