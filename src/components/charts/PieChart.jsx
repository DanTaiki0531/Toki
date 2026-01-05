import { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import useStore from '../../stores/useStore';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
    const { tasks } = useStore();

    const chartData = useMemo(() => {
        const tasksWithTime = tasks.filter((task) => task.totalTime > 0);

        if (tasksWithTime.length === 0) {
            return null;
        }

        return {
            labels: tasksWithTime.map((task) => task.name),
            datasets: [
                {
                    data: tasksWithTime.map((task) => Math.round(task.totalTime / 1000 / 60)),
                    backgroundColor: tasksWithTime.map((task) => task.color),
                    borderColor: tasksWithTime.map((task) => task.color),
                    borderWidth: 2,
                    hoverOffset: 10,
                },
            ],
        };
    }, [tasks]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    usePointStyle: true,
                    pointStyle: 'circle',
                    font: {
                        family: 'Inter',
                        size: 12,
                    },
                    color: '#2C2420',
                },
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#2C2420',
                bodyColor: '#2C2420',
                borderColor: '#E8DDD3',
                borderWidth: 1,
                cornerRadius: 12,
                padding: 12,
                callbacks: {
                    label: (context) => {
                        const value = context.raw;
                        const hours = Math.floor(value / 60);
                        const minutes = value % 60;
                        if (hours > 0) {
                            return ` ${hours}時間 ${minutes}分`;
                        }
                        return ` ${minutes}分`;
                    },
                },
            },
        },
    };

    if (!chartData) {
        return (
            <div className="h-64 flex items-center justify-center text-text-primary/50">
                <p>データがありません。タイマーで時間を記録してください。</p>
            </div>
        );
    }

    return (
        <div className="h-64">
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default PieChart;
