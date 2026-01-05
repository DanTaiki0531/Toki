import { FiClock, FiTrendingUp, FiTarget } from 'react-icons/fi';

const HeroSection = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-bg-light via-secondary to-bg-light" />

            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center animate-fadeIn">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm mb-8">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-sm font-medium text-primary">無料で始められる時間管理</span>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
                        Track Your Time,
                        <br />
                        <span className="gradient-text">Boost Your Productivity</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg sm:text-xl text-text-primary/70 max-w-2xl mx-auto mb-10">
                        シンプルで美しい時間記録アプリ。
                        <br className="hidden sm:block" />
                        作業時間を可視化して、生産性を向上させましょう。
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="#timer" className="btn-primary inline-flex items-center gap-2">
                            <FiClock className="w-5 h-5" />
                            今すぐ始める
                        </a>
                        <a href="#analytics" className="btn-secondary inline-flex items-center gap-2">
                            <FiTrendingUp className="w-5 h-5" />
                            分析を見る
                        </a>
                    </div>

                    {/* Feature Icons */}
                    <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                        <div className="card bg-white/80 backdrop-blur-sm text-center group">
                            <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <FiClock className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="font-semibold text-text-primary mb-2">簡単なタイマー</h3>
                            <p className="text-sm text-text-primary/60">ワンクリックで時間計測開始</p>
                        </div>

                        <div className="card bg-white/80 backdrop-blur-sm text-center group">
                            <div className="w-14 h-14 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <FiTarget className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="font-semibold text-text-primary mb-2">タスク管理</h3>
                            <p className="text-sm text-text-primary/60">カテゴリ別に作業を整理</p>
                        </div>

                        <div className="card bg-white/80 backdrop-blur-sm text-center group">
                            <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <FiTrendingUp className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="font-semibold text-text-primary mb-2">詳細な分析</h3>
                            <p className="text-sm text-text-primary/60">グラフで作業傾向を把握</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                        fill="#FAF8F6"
                    />
                </svg>
            </div>
        </section>
    );
};

export default HeroSection;
