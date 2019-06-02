const express           = require('express');
const router            = express.Router();
const projectController = require('../controllers/project.controller');


// POST route => Adds a new project
router.post('/projects', projectController.create);

// GET route => Returns all the projects
router.get('/projects', projectController.list);

// GET route => Returns the specified project
router.get('/projects/:id', projectController.detail);

// PUT route => Edits the specified project
router.put('/projects/:id', projectController.update);

// DELETE route => Deletes the specified project
router.delete('/projects/:id', projectController.delete);

module.exports = router;