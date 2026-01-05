import { useEffect, useState, useRef } from 'react';
import { FiPlay, FiSquare, FiRefreshCw } from 'react-icons/fi';
import useStore from '../../stores/useStore';

const Timer = () => {
    const {
        tasks,
        currentTaskId,
        isRunning,
        startTime,
        elapsedTime,
        selectTask,
        startTimer,
        stopTimer,
        resetTimer,
        updateElapsedTime,
    } = useStore();

    const [displayTime, setDisplayTime] = useState(0);
    const intervalRef = useRef(null);

    // Update display time
    useEffect(() => {
        if (isRunning && startTime) {
            intervalRef.current = setInterval(() => {
                setDisplayTime(Date.now() - startTime);
            }, 100);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            setDisplayTime(elapsedTime);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning, startTime, elapsedTime]);

    // Format time display
    const formatTime = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return {
            hours: hours.toString().padStart(2, '0'),
            minutes: minutes.toString().padStart(2, '0'),
            seconds: seconds.toString().padStart(2, '0'),
        };
    };

    const time = formatTime(displayTime);
    const currentTask = tasks.find((t) => t.id === currentTaskId);

    return (
        <section id="timer" className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
                        タイマー
                    </h2>
                    <p className="text-text-primary/60 max-w-2xl mx-auto">
                        タスクを選択して、作業時間を記録しましょう
                    </p>
                </div>

                <div className="max-w-xl mx-auto">
                    {/* Timer Display */}
                    <div className={`card bg-white text-center mb-8 ${isRunning ? 'animate-timer-pulse' : ''}`}>
                        {/* Timer Ring */}
                        <div className="relative w-64 h-64 mx-auto mb-6">
                            {/* Background Ring */}
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="128"
                                    cy="128"
                                    r="120"
                                    stroke="#E8DDD3"
                                    strokeWidth="8"
                                    fill="none"
                                />
                                {isRunning && (
                                    <circle
                                        cx="128"
                                        cy="128"
                                        r="120"
                                        stroke="url(#timerGradient)"
                                        strokeWidth="8"
                                        fill="none"
                                        strokeLinecap="round"
                                        className="animate-pulse-ring"
                                        style={{
                                            strokeDasharray: '754',
                                            strokeDashoffset: '0',
                                        }}
                                    />
                                )}
                                <defs>
                                    <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#8B7355" />
                                        <stop offset="100%" stopColor="#D4A574" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            {/* Timer Text */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-bold text-text-primary">{time.hours}</span>
                                    <span className="text-2xl text-text-primary/50">:</span>
                                    <span className="text-5xl font-bold text-text-primary">{time.minutes}</span>
                                    <span className="text-2xl text-text-primary/50">:</span>
                                    <span className="text-5xl font-bold text-text-primary">{time.seconds}</span>
                                </div>
                                {currentTask && (
                                    <div className="mt-2 flex items-center gap-2">
                                        <span
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: currentTask.color }}
                                        />
                                        <span className="text-sm text-text-primary/60">{currentTask.name}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Control Buttons */}
                        <div className="flex items-center justify-center gap-4">
                            {!isRunning ? (
                                <button
                                    onClick={startTimer}
                                    disabled={!currentTaskId}
                                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${currentTaskId
                                            ? 'bg-gradient-to-br from-primary to-accent text-white shadow-lg hover:shadow-xl hover:scale-105'
                                            : 'bg-secondary text-text-primary/40 cursor-not-allowed'
                                        }`}
                                >
                                    <FiPlay className="w-7 h-7 ml-1" />
                                </button>
                            ) : (
                                <button
                                    onClick={stopTimer}
                                    className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                                >
                                    <FiSquare className="w-6 h-6" />
                                </button>
                            )}

                            <button
                                onClick={resetTimer}
                                disabled={!displayTime && !isRunning}
                                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${displayTime || isRunning
                                        ? 'bg-secondary text-primary hover:bg-accent hover:text-white'
                                        : 'bg-secondary/50 text-text-primary/30 cursor-not-allowed'
                                    }`}
                            >
                                <FiRefreshCw className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Task Selection */}
                    <div className="card bg-white">
                        <h3 className="text-lg font-semibold text-text-primary mb-4">タスクを選択</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {tasks.map((task) => (
                                <button
                                    key={task.id}
                                    onClick={() => selectTask(task.id)}
                                    disabled={isRunning}
                                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${currentTaskId === task.id
                                            ? 'border-primary bg-primary/5'
                                            : 'border-secondary hover:border-accent'
                                        } ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span
                                            className="w-4 h-4 rounded-full flex-shrink-0"
                                            style={{ backgroundColor: task.color }}
                                        />
                                        <span className="font-medium text-text-primary truncate">{task.name}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Timer;
