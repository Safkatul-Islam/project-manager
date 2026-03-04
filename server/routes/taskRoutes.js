const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController.js');

const { protect } = require('../middleware/authMiddleware.js');

router.route('/').get(protect, getTasks).post(protect, createTask);

router.route('/:id').put(protect, updateTask).delete(protect, deleteTask);

// Alternative way to write the above:
// router.get('/', getTasks);
// router.post('/', createTask);

module.exports = router;