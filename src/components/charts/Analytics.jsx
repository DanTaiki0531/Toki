import PieChart from './PieChart';
import BarChart from './BarChart';

const Analytics = () => {
    return (
        <section id="analytics" className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
                        分析
                    </h2>
                    <p className="text-text-primary/60 max-w-2xl mx-auto">
                        作業時間を可視化して、生産性を把握しましょう
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Pie Chart */}
                    <div className="card bg-white">
                        <h3 className="text-lg font-semibold text-text-primary mb-6">
                            タスク別時間配分
                        </h3>
                        <PieChart />
                    </div>

                    {/* Bar Chart */}
                    <div className="card bg-white">
                        <h3 className="text-lg font-semibold text-text-primary mb-6">
                            日別作業時間
                        </h3>
                        <BarChart />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Analytics;
