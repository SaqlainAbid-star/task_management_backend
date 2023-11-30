const express = require('express');
const router = express.Router();
const Group = require('../models/db/group');

// Route to get all groups with members' userNames populated
router.get('/', async (req, res) => {
  try {
    const groups = await Group.find()
      .populate('members', 'userName') // Populate the 'userName' property of members
      .exec();

    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch groups.' });
  }
});

// Join/Create a Group for Users
router.post('/join', (req, res) => {
  const { groupName, userId } = req.body;

  // Check if the group exists in the database
  Group.findOne({ name: groupName })
  .then((group) => {
    if (group) {
      // Check if the user is already a member of the group
      if (!group.members.includes(userId)) {
        // If not a member, add user to the group
        group.members.push(userId);
        groupData = group.save();
        res.send({ message: 'Joined the group successfully', groupId: group._id });
      } else {
        // If already a member, return the group id
        res.send({ message: 'Already member of the group', groupId: group._id });
      }
    } else {
      // Group doesn't exist, create a new group with the user as the first member
      const newGroup = new Group({
        name: groupName,
        members: [userId],
        tasks: [],
      });
      groupData = newGroup.save();
      res.send({ message: 'New group created successfully', groupId: newGroup._id });
    }
  })
  .catch((err) => {
    res.status(500).send({ error: 'Error joining/creating the group' });
  });

});

// Fetch User Groups
router.get('/user/:userId', (req, res) => {
  const { userId } = req.params;

  Group.find({ members: userId })
    .then((groups) => {
      res.send(groups);
    })
    .catch((err) => {
      res.status(500).send({ error: 'Error fetching user groups' });
    });
});

// Show Group Members
router.get('/members/:groupId', (req, res) => {
  const { groupId } = req.params;

  Group.findById(groupId)
    .populate('members', 'userName') // Assuming you have a 'userName' field in the User model
    .then((group) => {
      if (!group) {
        return res.status(404).send({ error: 'Group not found' });
      }
      res.send(group.members);
    })
    .catch((err) => {
      res.status(500).send({ error: 'Error fetching group members' });
    });
});

// Adding Task to Groups (you should have a separate Task model)
router.post('/assign-task', (req, res) => {
  const { groupId, taskId } = req.body;

  Group.findById(groupId)
    .then((group) => {
      if (!group) {
        return res.status(404).send({ error: 'Group not found' });
      }
      group.tasks.push(taskId);
      group.save();
      res.send({ message: 'Task assigned successfully' });
    })
    .catch((err) => {
      res.status(500).send({ error: 'Error assigning task' });
    });
});

// Fetch and Display Group Tasks (you should have a separate Task model)
router.get('/tasks/:groupId', (req, res) => {
  const { groupId } = req.params;

  Group.findById(groupId)
    .populate('tasks') // Assuming you have a 'Task' model
    .then((group) => {
      if (!group) {
        return res.status(404).send({ error: 'Group not found' });
      }
      res.send(group.tasks);
    })
    .catch((err) => {
      // res.status(500).send({ error: 'Error fetching group tasks' });
      console.log(err);
    });
});

module.exports = router;

