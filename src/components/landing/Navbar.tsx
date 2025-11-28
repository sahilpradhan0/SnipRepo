import { useState } from 'react';
import { Moon, Palette, Sun } from 'lucide-react';
import logo from "../../assets/logo2.png";
import { useTheme } from '../../contexts/ThemeContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
    onGetStarted: () => void;
}

export function Navbar({ onGetStarted }: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const isLandingPage = location.pathname === "/";
    const nav = useNavigate();
    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <>
            <nav className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center cursor-pointer" onClick={() => {
                            nav("/");
                            window.scrollTo(0, 0);
                        }}>
                            <div className=" rounded-lg" >
                                <img src={logo} className='w-20 h-20' alt="SnipRepo logo" />
                            </div>
                            <span className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">SnipRepo</span>
                        </div>
                        <div className="hidden md:flex items-center gap-4">
                            {/* <Link to="/" className="text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition">
                                Home
                            </Link> */}
                            <Link to="/about" className="text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition">
                                About
                            </Link>
                            <Link to="/contact" className="text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition">
                                Contact
                            </Link>
                            {isLandingPage && <a href="#features" className="text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition">
                                Features
                            </a>}
                            {isLandingPage && <a href="#pricing" className="text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition">
                                Pricing
                            </a>}
                            <button
                                onClick={toggleTheme}
                                className="relative w-14 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center transition-colors duration-300 hover:scale-105 active:scale-95"
                            >
                                <span
                                    className={`absolute left-1 top-1 w-6 h-6 rounded-full flex items-center justify-center bg-white dark:bg-gray-900 shadow-md transform transition-transform duration-300 ${theme === "dark" ? "translate-x-6" : "translate-x-0"}`}
                                >
                                    {theme === "light" ? <Sun size={14} className="text-yellow-500" /> : <Moon size={14} className="text-blue-400" />}
                                </span>
                            </button>
                            <button
                                onClick={onGetStarted}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
                            >
                                Get Started Free
                            </button>
                        </div>
                        <button onClick={toggleMenu} className="md:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                            {!isMenuOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            )}
                        </button>
                    </div>
                </div>
            </nav>
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="fixed inset-0 flex z-40">
                        <div className="fixed inset-0 bg-black bg-opacity-25" aria-hidden="true"></div>
                        <div className="relative w-full bg-white dark:bg-gray-900 h-screen">
                            <div className="pt-20 pb-6 px-4 space-y-6">
                                <Link to="/" onClick={() => setIsMenuOpen(false)} className="block text-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-lg transition">Home</Link>
                                <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block text-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-lg transition">About</Link>
                                <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block text-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-lg transition">Contact</Link>
                                {isLandingPage && <a href="#features" onClick={() => setIsMenuOpen(false)} className="block text-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-lg transition">Features</a>}
                                {isLandingPage && <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="block text-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-lg transition">Pricing</a>}
                                <div className="flex items-center justify-between px-3 py-2 max-w-lg mx-auto">
                                    <div className='flex gap-3 items-center'>
                                        <Palette className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                        <span className="text-base font-medium text-gray-700 dark:text-gray-300">Theme</span>
                                    </div>
                                    <button
                                        onClick={toggleTheme}
                                        className="relative w-14 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center transition-colors duration-300 hover:scale-105 active:scale-95"
                                    >
                                        <span
                                            className={`absolute left-1 top-1 w-6 h-6 rounded-full flex items-center justify-center bg-white dark:bg-gray-900 shadow-md transform transition-transform duration-300 ${theme === "dark" ? "translate-x-6" : "translate-x-0"}`}
                                        >
                                            {theme === "light" ? <Sun size={14} className="text-yellow-500" /> : <Moon size={14} className="text-blue-400" />}
                                        </span>
                                    </button>
                                </div>
                                <button onClick={onGetStarted} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition">Get Started Free</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}