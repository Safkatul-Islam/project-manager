const express = require('express');
const router = express.Router();
const { getTasks, createTask } = require('../controllers/taskController.js');

router.route('/').get(getTasks).post(createTask);

// Alternative way to write the above:
// router.get('/', getTasks);
// router.post('/', createTask);

module.exports = router;