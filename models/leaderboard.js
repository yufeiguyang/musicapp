/*const leaderboards = [
    {id:10001,name: "poptop10",include:["1","2","3","4","5","6","7","8","9","10"]},
    {id:10002,name: "top10-2",include:["1","2","3","4","5","6","7","8","9","10"]},
    {id:10003,name: "top10-3",include:["1","2","3","4","5","6","7","8","9","10"]}
]

module.exports = leaderboards;*/
let mongoose = require("mongoose")


let leaderboardSchema = new mongoose.Schema({
  id:Number,
  name:String,
  include:Array

},
{ collection: "leaderboard" })

module.exports = mongoose.model("leaderboard", leaderboardSchema)