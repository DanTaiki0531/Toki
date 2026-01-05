import { FiHeart, FiGithub } from 'react-icons/fi';

const Footer = () => {
    return (
        <footer className="bg-secondary/50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    {/* Logo */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-lg">時</span>
                        </div>
                        <span className="text-xl font-bold gradient-text">Toki</span>
                    </div>

                    {/* Tagline */}
                    <p className="text-text-primary/60 mb-6 max-w-md mx-auto">
                        シンプルで美しい時間管理アプリ。
                        あなたの生産性を向上させます。
                    </p>

                    {/* Made with love */}
                    <p className="text-sm text-text-primary/50 flex items-center justify-center gap-1">
                        Made with <FiHeart className="w-4 h-4 text-red-400" /> in Japan
                    </p>

                    {/* Copyright */}
                    <p className="text-xs text-text-primary/40 mt-4">
                        © {new Date().getFullYear()} Toki. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
