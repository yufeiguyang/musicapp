let musics = require('../models/musics');
let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();

/*mongoose.connect('mongodb://localhost:27017/musics');
let db = mongoose.connection;*/

let db = mongoose.createConnection('mongodb://localhost:27017/musics');
module.exports = db;

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});
function getByName(array,name){
    let result = array.filter(function(obj){return obj.name === name;});
    return result ? result[0] : null;
}


router.showAll = (req,res) => {
    res.setHeader('Content-Type', 'application/json');

    musics.find(function(err, musics) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(musics,null,5));
    });
}

router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    musics.find({ "name" : req.params.name },function(err, musics) {
        if (err){
            res.json({ message: 'Music NOT Found!', errmsg : err });
        }
        else{
            res.send(JSON.stringify(musics,null,5));}

    });
}

router.addMusic = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    let Music= new musics();
    Music.name = req.body.name;
    Music.singer = req.body.singer;
    Music.album = req.body.album;
    Music.introduction = req.body.introduction;

              Music.save(function(err) {
                if (err)
                {
                    res.json({ message: 'music Added failed'});
                }
                else
                {
                    res.json({ message: 'music Added Successfully!',data:Music});

                 }
              });
}

router.deleteMusic = (req,res) =>{

    musics.remove({"name":req.params.name}, function(err) {
        if (err)
            res.json({ message: 'Music NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Music Successfully Deleted!'});
    });

}

router.updateMusicInfo = (req,res) => {
    res.setHeader('Content-Type', 'application/json');
    musics.find({"name":req.params.name},function(err,Music) {
        if (err) {
            res.json({message: 'Music NOT found!', errmsg: err});
        } else {
            Music.singer = req.body.singer;
            Music.album = req.body.album;
            Music.introduction = req.body.introduction;
            if (err) {
                res.json({message: 'Music updated failed'});
            } else {
                res.json({message: 'Music Successfully update!',data:Music});
            }
        }
    });
}

router.searchAlbum = (req,res) => {
    res.setHeader('Content-Type', 'application/json');
    musics.find({"album":req.params.album},function(err,musics) {
        if(err){
            res.json({message: 'Music NOT found!', errmsg: err});
        }else{
            res.json({message: 'Music Successfully Found!',data:musics});
        }
    })

}

module.exports = router;








