import { FiClock, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-secondary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                            <FiClock className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold gradient-text">Toki</span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <a href="#timer" className="text-text-primary hover:text-primary transition-colors font-medium">
                            タイマー
                        </a>
                        <a href="#tasks" className="text-text-primary hover:text-primary transition-colors font-medium">
                            タスク
                        </a>
                        <a href="#analytics" className="text-text-primary hover:text-primary transition-colors font-medium">
                            分析
                        </a>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
                    >
                        {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <nav className="md:hidden bg-white border-t border-secondary animate-fadeIn">
                    <div className="px-4 py-4 space-y-3">
                        <a
                            href="#timer"
                            onClick={() => setIsMenuOpen(false)}
                            className="block py-2 text-text-primary hover:text-primary transition-colors font-medium"
                        >
                            タイマー
                        </a>
                        <a
                            href="#tasks"
                            onClick={() => setIsMenuOpen(false)}
                            className="block py-2 text-text-primary hover:text-primary transition-colors font-medium"
                        >
                            タスク
                        </a>
                        <a
                            href="#analytics"
                            onClick={() => setIsMenuOpen(false)}
                            className="block py-2 text-text-primary hover:text-primary transition-colors font-medium"
                        >
                            分析
                        </a>
                    </div>
                </nav>
            )}
        </header>
    );
};

export default Header;
