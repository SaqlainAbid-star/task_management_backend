const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var cors = require("cors");
const app = express();
const tasks = require("./routes/tasks");
const users = require("./routes/users");
const groups = require("./routes/groups");
const uploadImage = require("./routes/uploadImage");
const mongoose = require("./models/connection");

app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
); // use cors middleware for all routes

app.use(
  express.urlencoded({
    extended: true,
  })
);

// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

// app.use(bodyParser.json());

// sending some images large in size
// setting up the body parser to properly send our requests
// app.use(bodyParser.json({limit: '30mb',extended: true}));
// app.use(bodyParser.urlencoded({limit: '30mb',extended: true}));

app.get("/", (req, res) => {
  res.send("Sever Running");
});

app.use("/tasks", tasks);
app.use("/users", users);
app.use("/groups", groups);
app.use("/", uploadImage);

app.listen(5000, () => {
  console.log("Your server is running on 5000");
});
