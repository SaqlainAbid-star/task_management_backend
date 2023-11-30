const { createTask } = require("../models/task");


exports.createTask = async (userId,title, description) => {
    try {
        const Id = Date.now();
        const completed = false;
        return await createTask(Id,userId,title,description,completed);
    } catch (err) {
        throw err;
    }
};

