const mongoose = require ('mongoose');
const Project = require('../models/project-model');
const Task    = require('../models/task-model');

// POST route => Adds a new project
module.exports.create = (req, res, next) => {
  Project.create({
    title: req.body.title,
    description: req.body.description,
    tasks : []
  })
    .then( response => res.json(response) )
    .catch( error => res.json(error) )
}

// GET route => Returns all the projects
module.exports.list = (req, res, next) => {
  Project.find().populate('tasks')
    .then( allTheProjects => res.json(allTheProjects) )
    .catch( error => res.json(error) )
}

// GET route => Returns the specified project
module.exports.detail = (req, res, next) => {
  if ( !mongoose.Types.ObjectId.isValid( req.params.id ) ) {
    res.status(400).json( { message: 'Specified id is not valid' } );
    return;
  }

  Project.findById( req.params.id ).populate('tasks')
    .then( response => res.status(200).json(response) )
    .catch( error => res.json(error) )
}

// PUT route => Edits the specified project
module.exports.update = (req, res, next) => {
  if ( !mongoose.Types.ObjectId.isValid( req.params.id ) ) {
    res.status(400).json( { message: 'Specified id is not valid' } );
    return;
  }

  Project.findByIdAndUpdate( req.params.id, req.body )
    .then( () => res.json( { message: `Project with ${req.params.id} is updated successfully.` } ) )
    .catch( error => res.json(error) )
}

// DELETE route => Deletes the specified project
module.exports.delete = (req, res, next) => {
  if ( !mongoose.Types.ObjectId.isValid( req.params.id ) ) {
    res.status(400).json( { message: 'Specified id is not valid' } );
    return;
  }

  Project.findByIdAndRemove( req.params.id )
    .then( () => res.json( { message: `Project with ${req.params.id} is removed successfully.` } ) )
    .catch( error => res.json(error) )
}