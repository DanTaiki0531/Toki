// localStorage utility functions

const STORAGE_KEY = 'toki_data';

export const loadData = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
            return JSON.parse(data);
        }
    } catch (error) {
        console.error('Failed to load data from localStorage:', error);
    }
    return null;
};

export const saveData = (data) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error('Failed to save data to localStorage:', error);
    }
};

export const clearData = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Failed to clear data from localStorage:', error);
    }
};
