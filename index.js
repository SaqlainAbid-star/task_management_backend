const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const tasks = require("./routes/tasks");
const users = require("./routes/users");
const groups = require("./routes/groups");
const uploadImage = require("./routes/uploadImage");
const mongoose = require("./models/connection");


// Allow requests from all origins (you can replace '*' with your specific frontend URL)
app.use(cors());


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


// sending some images large in size
// setting up the body parser to properly send our requests
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.use("/tasks", tasks);
app.use("/users", users);
app.use("/groups", groups);
app.use("/", uploadImage);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});



