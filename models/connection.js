const mongoose = require('mongoose');

// const url = 'mongodb://127.0.0.1:27017/task-management'
const url = 'mongodb+srv://Saqlain:Saqlain123@cluster0.oo31c.mongodb.net/?retryWrites=true&w=majority';


mongoose.connect(url).then(()=>{
    console.log("DB Connected");
}).catch((err)=>console.log('No connection',err));

module.exports = mongoose;