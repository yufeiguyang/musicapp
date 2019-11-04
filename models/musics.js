
let mongoose = require("mongoose")

let musicsSchema = new mongoose.Schema({
  Mid: Number,
  name:String,
  singer:String,
  album:String,
  introduction:{type:String,default: " "}

},
{ collection: "musics" })

module.exports = mongoose.model("musics", musicsSchema)