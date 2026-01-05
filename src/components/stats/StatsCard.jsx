import { FiClock, FiCheckCircle, FiTrendingUp } from 'react-icons/fi';
import useStore from '../../stores/useStore';

const StatsCard = () => {
    const { tasks, records } = useStore();

    // Calculate statistics
    const totalHours = tasks.reduce((acc, task) => acc + task.totalTime, 0) / 1000 / 60 / 60;
    const totalTasks = records.length;
    const activeTasks = tasks.length;

    const stats = [
        {
            icon: FiClock,
            value: totalHours.toFixed(1),
            label: '時間',
            suffix: 'Hours Tracked',
            color: 'from-primary to-accent',
        },
        {
            icon: FiCheckCircle,
            value: totalTasks,
            label: '記録',
            suffix: 'Sessions Completed',
            color: 'from-accent to-primary',
        },
        {
            icon: FiTrendingUp,
            value: activeTasks,
            label: 'タスク',
            suffix: 'Active Tasks',
            color: 'from-primary to-accent',
        },
    ];

    return (
        <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="card bg-white group animate-fadeIn"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                                    <stat.icon className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-bold text-text-primary">{stat.value}</span>
                                        <span className="text-lg text-text-primary/60">{stat.label}</span>
                                    </div>
                                    <p className="text-sm text-text-primary/50">{stat.suffix}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsCard;
