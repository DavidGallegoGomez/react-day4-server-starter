const mongoose = require ('mongoose');
const Project = require('../models/project-model');
const Task    = require('../models/task-model');

// GET route => Returns the specified task
module.exports.detail = (req, res, next) => {
  Task.findById(req.params.taskId)
  .then( theTask => res.json(theTask) )
  .catch( err => res.json(err) )
}

// POST route => Adds a new task
module.exports.create = (req, res, next) => {
  Task.create({
    title: req.body.title,
    description: req.body.description,  
    project: req.body.projectID
})
  .then( response => {
      Project.findByIdAndUpdate( req.body.projectID, { $push:{ tasks: response._id } } )
      .then( theResponse => res.json(theResponse) )
      .catch( err => res.json(err) )
  })
  .catch( err => res.json(err) )
}

// PUT route => Edits the specified task
module.exports.update = (req, res, next) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Task.findByIdAndUpdate(req.params.id, req.body)
    .then( () => res.json( { message: `Task with ${req.params.id} is updated successfully.` } ) )
    .catch( err => res.json(err) )
}

// DELETE route => Deletes the specified task
module.exports.delete = (req, res, next) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Task.findByIdAndRemove(req.params.id)
    .then( () => res.json({ message: `Task with ${req.params.id} is removed successfully.` }) )
    .catch( err => res.json(err) )
}