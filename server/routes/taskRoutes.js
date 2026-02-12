const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController.js');

router.route('/').get(getTasks).post(createTask);

router.route('/:id').put(updateTask).delete(deleteTask);

// Alternative way to write the above:
// router.get('/', getTasks);
// router.post('/', createTask);

module.exports = router;