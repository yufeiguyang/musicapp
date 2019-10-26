/*const users = [
    {id:20190001,username:"feiyang yu",userpassword:"123456",picture:"",introduction:""},
    {id:20190002,username:"asd",userpassword:"123456",picture:"",introduction:""},
    {id:20190003,username:"sdau",userpassword:"123456",picture:"",introduction:""},
]

module.exports = users;*/
let mongoose = require('mongoose');

let usersSchema = new mongoose.Schema({
        id:Number,
        username:String,
        userpassword:String,
        picture:String,
        introduction:{type:String,default: " "}

    },
    { collection: 'users' });

module.exports = mongoose.model('users', usersSchema);