
let mongoose = require("mongoose")

let usersSchema = new mongoose.Schema({
  id:Number,
  username:String,
  userpassword:String,
  picture:String,
  introduction:{type:String,default: " "}

},
{ collection: "users" })

module.exports = mongoose.model("users", usersSchema)