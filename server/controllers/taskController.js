const Task = require('../models/Task.js');

// @desc    Get tasks
// @route   GET /api/tasks
// @access  Private (Changed from Public)
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Please add a text field!' });
        }

        const task = await Task.create({
            title,
            user: req.user.id
            // isCompleted is false by default (from Model)
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // 1. Check for user (Did the middleware successfully pass the user?)
        if (!req.user) {
            return res.status(401).json({ message: 'User not Found!' });
        }

        // 2. AUTHORIZATION CHECK: Does the logged-in user own this specific task?
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized to modify this task' });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedTask);
    } catch (error) {
        res.send(400).json({ message: error.message });
    }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.send(404).json({ message: 'Task not found' });
        }

        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // 2. AUTHORIZATION CHECK: Make sure the logged in user matches the task user
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized to delete this task' });
        }

        await task.deleteOne();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};