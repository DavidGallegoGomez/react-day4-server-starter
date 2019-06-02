const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const projectSchema = new Schema({
  title: String,
  description: String,
  tasks: [{ 
    type: Schema.Types.ObjectId, ref: 'Task' }]
  // TODO: owner property
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;