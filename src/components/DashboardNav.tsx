import { Moon, Sun, BarChart3, Upload, Keyboard, Power, Gem, Menu, X, Database, Palette } from 'lucide-react';
import logo from "../assets/logo2.png";
import { useSubscription } from '../contexts/SubscriptionContext';
import { useEffect, useState } from 'react';
import { DashboardPricing } from './DashboardPricing';
import { snippetApi } from '../lib/api/snippets';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
interface DashboardNavProps {
    userEmail: string | undefined;
    onSignOut: () => void;
    onShowImportExport: () => void;
    onShowAnalytics: () => void;
    onShowKeyboardShortcuts: () => void;
    onUpgrade: () => void;
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
    snippetCount: number;
    hideImportExport?: boolean;
}

export function DashboardNav({
    userEmail,
    onSignOut,
    onShowImportExport,
    onShowAnalytics,
    onShowKeyboardShortcuts,
    theme,
    onUpgrade,
    onToggleTheme,
    hideImportExport = false,
}: DashboardNavProps) {
    const { getCount } = snippetApi;
    const { subscription, loading: isSubscriptionLoading } = useSubscription();
    const currentPlan = subscription?.plan || "Free";
    const [showPricing, setShowPricing] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [snippetCount, setSnippetCount] = useState<number | null>(null);
    const { user } = useAuth();
    const nav = useNavigate();
    useEffect(() => {
        async function load() {
            const count = await getCount(user?.id);
            setSnippetCount(count);
        }

        load(); // initial load

        const channel = supabase
            .channel("snippets-count")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "snippets" },
                (payload) => {
                    load(); // refresh count whenever snippet inserted/updated/deleted
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const freePlanLimit = 50;
    const usagePercentage = snippetCount !== null ? (snippetCount / freePlanLimit) * 100 : 0;

    const getBadgeColors = () => {
        if (usagePercentage >= 90) {
            return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'; // Red
        }
        if (usagePercentage >= 60) {
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'; // Yellow
        }
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'; // Green
    };
    const badgeColors = getBadgeColors();

    const isFreeUser = currentPlan.toLowerCase() === 'free';
    const proFeatureTooltip = 'Upgrade to Pro to use this feature';

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 py-2">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className={`flex items-center ${isMenuOpen ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500 ease-in-out`}>
                        <div className="rounded-lg flex-shrink-0 cursor-pointer" onClick={() => nav("/dashboard")}>
                            <img src={logo} className='w-20 h-20 sm:w-20 sm:h-20' alt="SnipRepo logo" />
                        </div>
                        <div className='flex flex-col sm:flex-row gap-1 sm:gap-4'>
                            <div className='flex flex-col gap-[0.5]'>
                                <h1 className="sm:text-xl font-bold text-gray-900 dark:text-white">
                                    SnipRepo
                                </h1>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {userEmail}
                                </p>
                            </div>
                            <div className="flex gap-2  sm:justify-end sm:items-end">
                                {user && <span className="capitalize text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full">
                                    {currentPlan}
                                </span>}
                                {user && isFreeUser && snippetCount !== null && (
                                    <span className={`flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full ${badgeColors}`}>
                                        <Database className="w-3 h-3" />
                                        {snippetCount} / {freePlanLimit}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-2">
                            {user && <div className="relative group">
                                <button onClick={() => setShowPricing(true)} className="flex items-center gap-2 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                                    <Gem className="w-5 h-5 text-blue-500" />
                                </button>
                                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-800 text-sm rounded py-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">Upgrade Plan</span>
                            </div>}
                            {user && <div className="relative group">
                                <button onClick={onShowImportExport} disabled={hideImportExport} className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed">
                                    <Upload className="w-5 h-5" />
                                </button>
                                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-800 text-sm rounded py-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">Import/Export</span>
                            </div>}
                            {user && <div className="relative group">
                                <button onClick={() => nav("/dashboard/analytics")} disabled={isFreeUser || isSubscriptionLoading} className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed">
                                    <BarChart3 className="w-5 h-5" />
                                </button>
                                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-800 text-sm rounded py-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">{isFreeUser ? proFeatureTooltip : 'Analytics'}</span>
                            </div>}
                            {user && <div className="relative group">
                                <button onClick={onShowKeyboardShortcuts} className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                                    <Keyboard className="w-5 h-5" />
                                </button>
                                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-800 text-sm rounded py-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">Keyboard Shortcuts</span>
                            </div>}

                            <button
                                onClick={onToggleTheme}
                                className="relative w-14 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center transition-colors duration-300 hover:scale-105 active:scale-95"
                            >
                                <span
                                    className={`absolute left-1 top-1 w-6 h-6 rounded-full flex items-center justify-center bg-white dark:bg-gray-900 shadow-md transform transition-transform duration-300 ${theme === "dark" ? "translate-x-6" : "translate-x-0"}`}
                                >
                                    {theme === "light" ? <Sun size={14} className="text-yellow-500" /> : <Moon size={14} className="text-blue-400" />}
                                </span>
                            </button>
                            <div className="relative group">
                                <button onClick={onSignOut} className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                                    <Power className="w-5 h-5" />
                                </button>
                                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-800 text-sm rounded py-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">Sign out</span>
                            </div>
                        </div>
                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg">
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {user && <button onClick={() => { setShowPricing(true); setIsMenuOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                <Gem className="w-5 h-5 text-blue-500" /> Upgrade Plan
                            </button>}
                            {user && <button onClick={() => { onShowImportExport(); setIsMenuOpen(false); }} disabled={hideImportExport} className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
                                <Upload className="w-5 h-5" /> Import/Export
                            </button>}

                            {/* )} */}
                            {user && <button onClick={() => { onShowAnalytics(); setIsMenuOpen(false); }} disabled={isFreeUser || isSubscriptionLoading} className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
                                <BarChart3 className="w-5 h-5" /> Analytics
                            </button>}
                            {user && <button onClick={() => { onShowKeyboardShortcuts(); setIsMenuOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                <Keyboard className="w-5 h-5" /> Keyboard Shortcuts
                            </button>}
                            <div className="flex items-center justify-between px-3 py-2">
                                <div className='flex gap-3 items-center'>
                                    <Palette className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                    <span className="text-base font-medium text-gray-700 dark:text-gray-300">Theme</span>
                                </div>
                                <button
                                    onClick={onToggleTheme}
                                    className="relative w-14 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center transition-colors duration-300 hover:scale-105 active:scale-95"
                                >
                                    <span
                                        className={`absolute left-1 top-1 w-6 h-6 rounded-full flex items-center justify-center bg-white dark:bg-gray-900 shadow-md transform transition-transform duration-300 ${theme === "dark" ? "translate-x-6" : "translate-x-0"}`}
                                    >
                                        {theme === "light" ? <Sun size={14} className="text-yellow-500" /> : <Moon size={14} className="text-blue-400" />}
                                    </span>
                                </button>
                            </div>
                            <button onClick={() => { onSignOut(); setIsMenuOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                                <Power className="w-5 h-5" /> Sign out
                            </button>
                        </div>
                    </div>
                )}

                {/* <div className={` bg-white dark:bg-gray-800 border-t  border-gray-200 dark:border-gray-700 ${isMenuOpen ? "opacity-100 " : "opacity-0 h-1"} transition-opacity delay-100 duration-200 ease-in`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <button onClick={() => { setShowPricing(true); setIsMenuOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <Gem className="w-5 h-5 text-blue-500" /> Upgrade Plan
                        </button>
                        <button onClick={() => { onShowImportExport(); setIsMenuOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <Upload className="w-5 h-5" /> Import/Export
                        </button>
                        <button onClick={() => { onShowAnalytics(); setIsMenuOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <BarChart3 className="w-5 h-5" /> Analytics
                        </button>
                        <button onClick={() => { onShowKeyboardShortcuts(); setIsMenuOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <Keyboard className="w-5 h-5" /> Keyboard Shortcuts
                        </button>
                        <div className="flex items-center justify-between px-3 py-2">
                            <div className='flex gap-3 items-center'>
                                <Palette className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                <span className="text-base font-medium text-gray-700 dark:text-gray-300">Theme</span>
                            </div>
                            <button
                                onClick={onToggleTheme}
                                className="relative w-14 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center transition-colors duration-300 hover:scale-105 active:scale-95"
                            >
                                <span
                                    className={`absolute left-1 top-1 w-6 h-6 rounded-full flex items-center justify-center bg-white dark:bg-gray-900 shadow-md transform transition-transform duration-300 ${theme === "dark" ? "translate-x-6" : "translate-x-0"}`}
                                >
                                    {theme === "light" ? <Sun size={14} className="text-yellow-500" /> : <Moon size={14} className="text-blue-400" />}
                                </span>
                            </button>
                        </div>
                        <button onClick={() => { onSignOut(); setIsMenuOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <Power className="w-5 h-5" /> Sign out
                        </button>
                    </div>
                </div> */}

                {showPricing && <DashboardPricing currentPlan={currentPlan} showPricing={showPricing} setShowPricing={setShowPricing} />}
            </div>
        </nav>
    );
}