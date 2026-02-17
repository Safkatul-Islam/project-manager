'use client'; // 1. This tells Next.js: "This creates interactivity in the browser"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTask() {
    const [title, setTitle] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch('http://localhost:5000/api/tasks', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ title })
        });

        setTitle('');
        router.refresh();
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8 flex gap-2">
            <input
                type="text"
                placeholder="Enter task title..."
                className="border p-2 rounded w-full text-black"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Add Task
            </button>
        </form>
    );
}