import { create } from 'zustand';
import { loadData, saveData } from '../utils/storage';

// Generate unique ID
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Default tasks
const defaultTasks = [
    { id: '1', name: '開発作業', color: '#8B7355', totalTime: 0 },
    { id: '2', name: 'ミーティング', color: '#D4A574', totalTime: 0 },
    { id: '3', name: '学習・研究', color: '#6B8E6B', totalTime: 0 },
    { id: '4', name: '休憩', color: '#A5B4C8', totalTime: 0 },
];

// Initialize state from localStorage
const getInitialState = () => {
    const savedData = loadData();
    if (savedData) {
        return {
            tasks: savedData.tasks || defaultTasks,
            records: savedData.records || [],
            currentTaskId: null,
            isRunning: false,
            startTime: null,
            elapsedTime: 0,
        };
    }
    return {
        tasks: defaultTasks,
        records: [],
        currentTaskId: null,
        isRunning: false,
        startTime: null,
        elapsedTime: 0,
    };
};

const useStore = create((set, get) => ({
    ...getInitialState(),

    // Task actions
    addTask: (name, color) => {
        const newTask = {
            id: generateId(),
            name,
            color,
            totalTime: 0,
        };
        set((state) => {
            const newTasks = [...state.tasks, newTask];
            saveData({ tasks: newTasks, records: state.records });
            return { tasks: newTasks };
        });
    },

    updateTask: (id, updates) => {
        set((state) => {
            const newTasks = state.tasks.map((task) =>
                task.id === id ? { ...task, ...updates } : task
            );
            saveData({ tasks: newTasks, records: state.records });
            return { tasks: newTasks };
        });
    },

    deleteTask: (id) => {
        set((state) => {
            const newTasks = state.tasks.filter((task) => task.id !== id);
            const newRecords = state.records.filter((record) => record.taskId !== id);
            saveData({ tasks: newTasks, records: newRecords });
            return {
                tasks: newTasks,
                records: newRecords,
                currentTaskId: state.currentTaskId === id ? null : state.currentTaskId,
            };
        });
    },

    // Timer actions
    selectTask: (taskId) => {
        set({ currentTaskId: taskId });
    },

    startTimer: () => {
        const { currentTaskId } = get();
        if (!currentTaskId) return;

        set({
            isRunning: true,
            startTime: Date.now(),
        });
    },

    stopTimer: () => {
        const { currentTaskId, startTime, elapsedTime, tasks, records } = get();
        if (!currentTaskId || !startTime) {
            set({ isRunning: false, elapsedTime: 0, startTime: null });
            return;
        }

        const duration = Date.now() - startTime + elapsedTime;

        // Create new record
        const newRecord = {
            id: generateId(),
            taskId: currentTaskId,
            duration,
            date: new Date().toISOString().split('T')[0],
            timestamp: Date.now(),
        };

        // Update task total time
        const newTasks = tasks.map((task) =>
            task.id === currentTaskId
                ? { ...task, totalTime: task.totalTime + duration }
                : task
        );

        const newRecords = [...records, newRecord];
        saveData({ tasks: newTasks, records: newRecords });

        set({
            isRunning: false,
            startTime: null,
            elapsedTime: 0,
            tasks: newTasks,
            records: newRecords,
        });
    },

    resetTimer: () => {
        set({
            isRunning: false,
            startTime: null,
            elapsedTime: 0,
        });
    },

    updateElapsedTime: () => {
        const { startTime } = get();
        if (startTime) {
            set({ elapsedTime: Date.now() - startTime });
        }
    },

    // Get total hours
    getTotalHours: () => {
        const { tasks } = get();
        const totalMs = tasks.reduce((acc, task) => acc + task.totalTime, 0);
        return Math.floor(totalMs / 1000 / 60 / 60);
    },

    // Get records by date range
    getRecordsByDateRange: (startDate, endDate) => {
        const { records } = get();
        return records.filter((record) => {
            const recordDate = new Date(record.date);
            return recordDate >= startDate && recordDate <= endDate;
        });
    },
}));

export default useStore;
