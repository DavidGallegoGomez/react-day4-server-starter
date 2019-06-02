const express           = require('express');
const router            = express.Router();
const taskController = require('../controllers/project.controller');

// GET route => Returns the specified task
router.get('/projects/:projectId/tasks/:taskId', taskController.detail);

// POST route => Adds a new task
router.post('/tasks', taskController.create);

// PUT route => Edits the specified task
router.put('/tasks/:id', taskController.update);

// DELETE route => Deletes the specified task
router.delete('/tasks/:id', taskController.delete);

module.exports = router;
