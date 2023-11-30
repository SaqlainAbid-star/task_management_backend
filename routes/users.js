const express = require("express");
const { createTask } = require("../controllers/action");
const User = require("../models/db/user");

const router = express.Router();

router.post('/add', async (req, res) => {
  try {
    const { userName } = req.body;

    // Check if a user with the given userName already exists
    const existingUser = await User.findOne({ userName });

    if (existingUser) {
      // If user exists, return their _id
      res.status(200).send({ _id: existingUser._id });
    } else {
      // If user does not exist, create a new user
      const user = new User({ userName });

      // Save the new user to the database
      const newUser = await user.save();

      // Return the _id of the newly created user
      res.status(201).send({ _id: newUser._id });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
