'use client';

import { useRouter } from "next/navigation";

export default function TaskItem({ task }) {
    const router = useRouter();

    const toggleStatus = async () => {
        await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ isCompleted: !task.isCompleted }),
        });
        router.refresh();
    };

    const deleteTask = async () => {
        await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
            method: 'DELETE',
        });
        router.refresh();
    };

    return (
        <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex justify-between items-center mb-4">
            {/* LEFT SIDE: Text */}
            <div className="flex flex-col gap-1">
                <h2 className={`text-lg font-semibold ${task.isCompleted ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {task.title}
                </h2>
                <p className="text-xs text-gray-400">
                    {new Date(task.createdAt).toLocaleDateString()}
                </p>
            </div>

            {/* RIGHT SIDE: Actions */}
            <div className="flex gap-3">
                {/* Toggle Button */}
                <button
                    onClick={toggleStatus}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${task.isCompleted
                            ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200'
                            : 'bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200'
                        }`}
                >
                    {task.isCompleted ? 'Done' : 'Pending'}
                </button>

                {/* Delete Button */}
                <button
                    onClick={deleteTask}
                    className="text-red-500 hover:text-red-700 text-sm font-bold px-2"
                >
                    X
                </button>
            </div>
        </div>
    );
}