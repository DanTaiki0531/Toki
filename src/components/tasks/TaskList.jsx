import { useState } from 'react';
import { FiPlus, FiTrash2, FiEdit2, FiCheck, FiX } from 'react-icons/fi';
import useStore from '../../stores/useStore';

const PRESET_COLORS = [
    '#8B7355', '#D4A574', '#6B8E6B', '#A5B4C8',
    '#C4786C', '#7B9E89', '#9B8AA5', '#B8A07E',
];

const TaskList = () => {
    const { tasks, addTask, updateTask, deleteTask } = useStore();
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [newTaskName, setNewTaskName] = useState('');
    const [newTaskColor, setNewTaskColor] = useState(PRESET_COLORS[0]);
    const [editName, setEditName] = useState('');
    const [editColor, setEditColor] = useState('');

    const handleAddTask = () => {
        if (newTaskName.trim()) {
            addTask(newTaskName.trim(), newTaskColor);
            setNewTaskName('');
            setNewTaskColor(PRESET_COLORS[0]);
            setIsAdding(false);
        }
    };

    const handleEdit = (task) => {
        setEditingId(task.id);
        setEditName(task.name);
        setEditColor(task.color);
    };

    const handleSaveEdit = () => {
        if (editName.trim()) {
            updateTask(editingId, { name: editName.trim(), color: editColor });
            setEditingId(null);
        }
    };

    const formatTime = (ms) => {
        const hours = Math.floor(ms / 1000 / 60 / 60);
        const minutes = Math.floor((ms / 1000 / 60) % 60);
        if (hours > 0) {
            return `${hours}時間 ${minutes}分`;
        }
        return `${minutes}分`;
    };

    return (
        <section id="tasks" className="py-16 bg-secondary/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
                        タスク管理
                    </h2>
                    <p className="text-text-primary/60 max-w-2xl mx-auto">
                        作業カテゴリを追加・編集して、時間を効率的に管理しましょう
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    {/* Task List */}
                    <div className="space-y-4 mb-6">
                        {tasks.map((task, index) => (
                            <div
                                key={task.id}
                                className="card bg-white animate-fadeIn"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {editingId === task.id ? (
                                    // Edit Mode
                                    <div className="space-y-4">
                                        <input
                                            type="text"
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                            className="input"
                                            placeholder="タスク名"
                                            autoFocus
                                        />
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-text-primary/60">色:</span>
                                            <div className="flex gap-2">
                                                {PRESET_COLORS.map((color) => (
                                                    <button
                                                        key={color}
                                                        onClick={() => setEditColor(color)}
                                                        className={`w-8 h-8 rounded-full transition-transform ${editColor === color ? 'ring-2 ring-primary ring-offset-2 scale-110' : ''
                                                            }`}
                                                        style={{ backgroundColor: color }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleSaveEdit}
                                                className="btn-primary flex items-center gap-2"
                                            >
                                                <FiCheck className="w-4 h-4" />
                                                保存
                                            </button>
                                            <button
                                                onClick={() => setEditingId(null)}
                                                className="btn-secondary flex items-center gap-2"
                                            >
                                                <FiX className="w-4 h-4" />
                                                キャンセル
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    // Display Mode
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <span
                                                className="w-5 h-5 rounded-full flex-shrink-0"
                                                style={{ backgroundColor: task.color }}
                                            />
                                            <div>
                                                <h3 className="font-semibold text-text-primary">{task.name}</h3>
                                                <p className="text-sm text-text-primary/60">
                                                    合計: {formatTime(task.totalTime)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleEdit(task)}
                                                className="p-2 rounded-lg hover:bg-secondary transition-colors"
                                            >
                                                <FiEdit2 className="w-5 h-5 text-primary" />
                                            </button>
                                            <button
                                                onClick={() => deleteTask(task.id)}
                                                className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                                            >
                                                <FiTrash2 className="w-5 h-5 text-red-500" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Add Task Form */}
                    {isAdding ? (
                        <div className="card bg-white animate-fadeIn">
                            <h3 className="text-lg font-semibold text-text-primary mb-4">新しいタスクを追加</h3>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    value={newTaskName}
                                    onChange={(e) => setNewTaskName(e.target.value)}
                                    className="input"
                                    placeholder="タスク名を入力"
                                    autoFocus
                                />
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-text-primary/60">色:</span>
                                    <div className="flex gap-2">
                                        {PRESET_COLORS.map((color) => (
                                            <button
                                                key={color}
                                                onClick={() => setNewTaskColor(color)}
                                                className={`w-8 h-8 rounded-full transition-transform ${newTaskColor === color ? 'ring-2 ring-primary ring-offset-2 scale-110' : ''
                                                    }`}
                                                style={{ backgroundColor: color }}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={handleAddTask} className="btn-primary">
                                        追加
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsAdding(false);
                                            setNewTaskName('');
                                        }}
                                        className="btn-secondary"
                                    >
                                        キャンセル
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsAdding(true)}
                            className="w-full card bg-white border-2 border-dashed border-secondary hover:border-primary transition-colors flex items-center justify-center gap-2 text-primary font-medium"
                        >
                            <FiPlus className="w-5 h-5" />
                            新しいタスクを追加
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TaskList;
