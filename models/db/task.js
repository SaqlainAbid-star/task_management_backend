const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  title: String,
  description: String,
  completed: Boolean
});


// model defines structure of data
// mongoose.model makes a Product class from schema
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;