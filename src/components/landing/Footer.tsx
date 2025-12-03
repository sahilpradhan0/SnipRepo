import { Link, useLocation } from 'react-router-dom';
import logo from "../../assets/logo2.png";

export function Footer() {
    const location = useLocation();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (location.pathname === "/") {
        return (
            <footer
                className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 py-12 px-4 sm:px-6 lg:px-8"
                role="contentinfo"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8 items-center justify-center">
                        <div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={scrollToTop}
                                    aria-label="Scroll to top"
                                    className="rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <img
                                        src={logo}
                                        className='w-20 h-20'
                                        alt="SnipRepo logo — personal code snippet manager"
                                    />
                                </button>
                                <span className="text-2xl font-bold text-gray-900 dark:text-white">SnipRepo</span>
                            </div>
                            <p className="text-sm -mt-2">
                                Your personal code library. Organize, search, and manage code snippets efficiently.
                            </p>
                        </div>

                        <nav aria-label="Product links">
                            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">Product</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#features" className="hover:text-gray-900 dark:hover:text-white transition">Features</a></li>
                                <li><a href="#pricing" className="hover:text-gray-900 dark:hover:text-white transition">Pricing</a></li>
                            </ul>
                        </nav>

                        <nav aria-label="Company links">
                            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link to="/about" className="hover:text-gray-900 dark:hover:text-white transition">About Us</Link></li>
                                <li><Link to="/contact" className="hover:text-gray-900 dark:hover:text-white transition">Contact</Link></li>
                            </ul>
                        </nav>

                        <nav aria-label="Legal information">
                            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link to="/privacy-policy" className="hover:text-gray-900 dark:hover:text-white transition">Privacy Policy</Link></li>
                                <li><Link to="/terms-of-service" className="hover:text-gray-900 dark:hover:text-white transition">Terms of Service</Link></li>
                                <li><Link to="/refund-cancellation" className="hover:text-gray-900 dark:hover:text-white transition">Refund & Cancellation Policy</Link></li>
                            </ul>
                        </nav>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col justify-between items-center">
                        <p className="text-sm text-center">
                            © 2025 SnipRepo. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        );
    }

    return (
        <footer className="border-t border-gray-200 dark:border-gray-700 flex flex-col justify-between items-center p-8 bg-gray-100 dark:bg-gray-900" role="contentinfo">
            <p className="text-md text-gray-600 dark:text-gray-400">© 2025 SnipRepo. All rights reserved.</p>
        </footer>
    );
}
