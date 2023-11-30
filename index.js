const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var cors = require('cors')
const app = express()
const tasks = require("./routes/tasks");
const users = require("./routes/users");
const groups = require("./routes/groups");
const uploadImage = require("./routes/uploadImage")
const mongoose = require("./models/connection");


// sending some images large in size
// setting up the body parser to properly send our requests
app.use(bodyParser.json({limit: '30mb',extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb',extended: true}));
app.use(cors());

app.get("/", (req, res) => {
    res.send("Sever Running");
  });

app.use("/tasks", tasks);
app.use("/users", users);
app.use("/groups", groups);
app.use("/",uploadImage)

app.listen(5000);