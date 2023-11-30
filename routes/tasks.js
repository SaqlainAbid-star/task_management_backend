const express = require("express");
const { createTask } = require("../controllers/action");
const Task = require("../models/db/task");
const Group = require("../models/db/group");


const router = express.Router();

router.post('/add', async(req, res) => {

    // try {
    //     const resp = await createTask(req.body.userId,req.body.title, req.body.description);
    //     res.status(200).send(resp);
    // } catch (err) {
    //     res.send(err);
    // }


    // create new Instance from Task class
      const task = new Task({
        userId: req.body.userId,
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed,
    });

    // access builtin mongoose methods...save(),update() 
    const resp = await task.save();
    res.send(resp);
});


router.put('/update/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    // Toggle the 'completed' field
    task.completed = !task.completed;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task status.' });
  }
});

// Route to delete a task by ID
router.post('/delete', async (req, res) => {
  try {
    const { taskId,groupId } = req.body;
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    // Find the group by ID
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    // Remove the task ID from the tasks array
    group.tasks.pull(taskId);

    // Save the updated group
    await group.save();
    res.status(200).json({ message: 'Task deleted successfully.' });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});




module.exports = router;