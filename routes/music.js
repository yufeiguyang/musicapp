let musics = require("../models/musics")
let mongoose = require("mongoose")
let express = require("express")
let router = express.Router()


mongoose.connect("mongodb://yufeiyang:yu717235460@ds239858.mlab.com:39858/heroku_24v850ch")
let db = mongoose.connection

db.on("error", function (err) {
  console.log("Unable to Connect to [ " + db.name + " ]", err)
})

db.once("open", function () {
  console.log("Successfully Connected to [ " + db.name + " ]")
})



router.showAll = (req,res) => {
  res.setHeader("Content-Type", "application/json")

  musics.find(function(err, musics) {
    if (err)
      res.send(err)

    res.send(JSON.stringify(musics,null,5))
  })
}

router.findOne = (req, res) => {

  res.setHeader("Content-Type", "application/json")
  musics.find({ "name" : req.params.name },function(err, musics) {
    if (err){
      res.send({ message: "Music NOT Found!", errmsg : err })
    }
    else{
      res.send(JSON.stringify(musics,null,5))}

  })
}

router.addMusic = (req, res) => {
  res.setHeader("Content-Type", "application/json")

  let Music= new musics()
  Music.name = req.body.name
  Music.singer = req.body.singer
  Music.album = req.body.album
  Music.introduction = req.body.introduction

  Music.save(function(err) {
    if (err)
    {
      res.send({ message: "music Added failed"})
    }
    else
    {
      res.send({ message: "music Added Successfully!",data:Music})

    }
  })
}

router.deleteMusic = (req,res) =>{

  musics.remove({"name":req.params.name}, function(err) {
    if (err){
      res.send({ message: "Music NOT DELETED!", errmsg : err } )
    }
        
    else{
      res.send({ message: "Music Successfully Deleted!"})
    }
            
        
  })

}

router.updateMusicInfo = (req,res) => {
  res.setHeader("Content-Type", "application/json")
  musics.update({"name":req.params.name},{$set:{"introduction":req.body.introduction}},function(err)
  {
    if (err) {
      res.send({message: "Music NOT found!", errmsg: err})
    } else {
      res.send({message: "Music Successfully update!"})
    }

  })

}


router.searchAlbum = (req,res) => {
  res.setHeader("Content-Type", "application/json")
  musics.find({"album":req.params.album},function(err,musics) {
    if(err){
      res.send({message: "Music NOT found!", errmsg: err})
    }else{
      res.send({message: "Music Successfully Found!",data:musics})
    }
  })

}

module.exports = router








