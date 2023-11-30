const fs = require("fs");
const path = require("path");

const jsonFilePath = path.join(process.cwd(), "data", "tasks.json");

const readData = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(jsonFilePath, (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(JSON.parse(data.toString()));
        });
    });
};
const writeData = (data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(jsonFilePath, JSON.stringify(data), (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};

exports.createTask = async (Id,userId,title,description,completed) => {
    try {
            const tasks = await readData()
            await writeData([...tasks, {Id,userId,title, description,completed}]);
            return "Task Succesfully Created";
         

    } catch (err) {
        throw err;
    }
};




