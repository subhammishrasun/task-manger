const express = require('express');
const router = express.Router();
const Task = require('./task');

// @route   GET /api/tasks
// @desc    Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
});

// @route   POST /api/tasks
// @desc    Create a new task
router.post('/', async (req, res) => {
    const { name, completed } = req.body;

    try {
        const newTask = new Task({ name, completed });
        const task = await newTask.save();
        res.json(task);
    } catch (err) {
        res.status(400).json({ msg: 'Bad Request' });
    }
});

// @route   PUT /api/tasks/:id
// @desc    Update a task
router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) return res.status(404).json({ msg: 'Task not found' });
        res.json(task);
    } catch (err) {
        res.status(400).json({ msg: 'Bad Request' });
    }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ msg: 'Task not found' });
        res.json({ msg: 'Task removed' });
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
});

module.exports = router;
