let musics = require('../models/musics');
let express = require('express');
let router = express.Router();

function getByName(array,name){
    var result = array.filter(function(obj){return obj.name === name;});
    return result ? result[0] : null;
}


router.showAll = (req,res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(musics,null,5));
}

router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var donation = getByValue(musics,req.params.name);

    if (donation != null)
        res.send(JSON.stringify(musics,null,5));
    else
        res.send('Music NOT Found!!');

}

router.addMusic = (req, res) => {
    let currentSize = musics.length;
    musics.push({"Mid":currentSize+1,"name": req.body.name,"singer": req.body.singer,"album":req.body.album,"introduction":req.body.introduction});
    if((currentSize +1) === musics.length){
        res.json({ message: 'music Added Successfully!'});
        res.send(req.body.name);
    }

};

router.deleteMusic = (req,res) =>{
    let music = getByName(musics,req.params.name);
    let index = musics.indexOf(music);

    let currentSize = musics.length;
    musics.splice(index,1);

    if((currentSize - 1) === musics.length)
        res.json({ message: music.name + ' Deleted!'});
    else
        res.json({ message: music.name + ' NOT Deleted!'});
}

router.updateMusicInfo = (req,res) => {
    let music = getByName(musics,req.params.name);

    music.singer = req.params.singer;
    music.album = req.params.album;
    music.introduction = req.params.introduction;

    res.json({message: 'music information has updated!'})
}

router.searchAlbum = (req,res) => {
    res.setHeader('Content-Type', 'application/json');
    let album = req.params.album;
    let  array = [];
    let currentSize = musics.length;

    for(let i =0 ;i<currentSize;i+=1){
        if(musics[i].album === album){
            array.push(musics[i]);
        }
    }

    if(array.length === 0) {
        res.json({message:'this album is not included!'})
    }
    else{
        res.json({message:'the album has been found!'})
        res.send(JSON.stringify(array));
    }
}









