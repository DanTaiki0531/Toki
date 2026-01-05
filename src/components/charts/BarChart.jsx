import { useMemo, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import { ja } from 'date-fns/locale';
import useStore from '../../stores/useStore';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
    const { records, tasks } = useStore();
    const [range, setRange] = useState(7); // 7 days default

    const chartData = useMemo(() => {
        const today = new Date();
        const days = [];
        const dataByDay = [];

        for (let i = range - 1; i >= 0; i--) {
            const date = subDays(today, i);
            const dateStr = format(date, 'yyyy-MM-dd');
            const dayLabel = format(date, 'M/d', { locale: ja });

            // Get records for this day
            const dayRecords = records.filter((r) => r.date === dateStr);
            const totalMinutes = dayRecords.reduce((acc, r) => acc + r.duration, 0) / 1000 / 60;

            days.push(dayLabel);
            dataByDay.push(Math.round(totalMinutes));
        }

        return {
            labels: days,
            datasets: [
                {
                    label: '作業時間 (分)',
                    data: dataByDay,
                    backgroundColor: 'rgba(139, 115, 85, 0.8)',
                    borderColor: '#8B7355',
                    borderWidth: 2,
                    borderRadius: 8,
                    hoverBackgroundColor: '#D4A574',
                },
            ],
        };
    }, [records, range]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
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
                            return `${hours}時間 ${minutes}分`;
                        }
                        return `${minutes}分`;
                    },
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#2C2420',
                    font: {
                        family: 'Inter',
                        size: 11,
                    },
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(232, 221, 211, 0.5)',
                },
                ticks: {
                    color: '#2C2420',
                    font: {
                        family: 'Inter',
                        size: 11,
                    },
                    callback: (value) => {
                        if (value >= 60) {
                            return `${Math.floor(value / 60)}h`;
                        }
                        return `${value}m`;
                    },
                },
            },
        },
    };

    return (
        <div>
            {/* Range Selector */}
            <div className="flex justify-end gap-2 mb-4">
                {[7, 14, 30].map((days) => (
                    <button
                        key={days}
                        onClick={() => setRange(days)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${range === days
                                ? 'bg-primary text-white'
                                : 'bg-secondary text-primary hover:bg-accent hover:text-white'
                            }`}
                    >
                        {days}日
                    </button>
                ))}
            </div>

            <div className="h-64">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
};

export default BarChart;
