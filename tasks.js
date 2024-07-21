// routes/tasks.js

const express = require('express');
const router = express.Router();
const Task = require('../models/task.js');

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Create a task
router.post('/', async (req, res) => {
    const { title, description } = req.body;

    try {
        const newTask = new Task({
            title,
            description
        });

        const task = await newTask.save();
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update a task
router.put('/:id', async (req, res) => {
    const { title, description, status } = req.body;

    const taskFields = {};
    if (title) taskFields.title = title;
    if (description) taskFields.description = description;
    if (status) taskFields.status = status;

    try {
        let task = await Task.findById(req.params.id);

        if (!task) return res.status(404).json({ msg: 'Task not found' });

        task = await Task.findByIdAndUpdate(req.params.id,
            { $set: taskFields },
            { new: true });

        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete a task
router.delete('/:id', async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);

        if (!task) return res.status(404).json({ msg: 'Task not found' });

        await Task.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Task removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
