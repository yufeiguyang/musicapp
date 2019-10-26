let leaderboards = require('../models/leaderboards');
let express = require('express');
let router = express.Router();

function getByName(array,name){
    let result = array.filter(function(obj){return obj.name === name;});
    return result ? result[0] : null;
}


router.showAllBoards = (req,res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(leaderboards,null,5));
};

router.findBoards = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let board = getByName(leaderboards,req.params.name);

    if (board != null)
        res.send(JSON.stringify(board,null,5));
    else
        res.send('board NOT Found!!');

};

router.addBoard = (req,res) => {
    let currentSize = leaderboards.length;
    leaderboards.push({"id": currentSize + 10001,"name":req.body.name,"include":req.body.include});
    if((currentSize +1) === leaderboards.length){
        res.json({ message: 'leaderboard Added Successfully!'});
        res.send(req.body.name);
    }
};

router.deleteBoard = (req,res) =>{
    let board = getByName(leaderboards,req.params.name);
    let index = leaderboards.indexOf(board);

    let currentSize = leaderboards.length;
    leaderboards.splice(index,1);

    if((currentSize - 1) === leaderboards.length)
        res.json({ message: board.name + ' Deleted!'});
    else
        res.json({ message: board.name + ' NOT Deleted!'});
};

router.updateBoard = (req,res) => {
    let board = getByName(leaderboards,req.params.name);

    board.include  = req.params.include;

    res.json({message: 'leaderBoards information has updated!'})
};

router.searchBoard = (req,res) => {
    res.setHeader('Content-Type', 'application/json');
    let boardname = req.params.name;
    let  array = [];
    let currentSize = leaderboards.length;

    for(let i =0 ;i<currentSize;i+=1){
        if(leaderboards[i].name === boardname){
            array.push(leaderboards[i]);
        }
    }

    if(array.length === 0) {
        res.json({message:'this leaderBoard is not included!'})
    }
    else{
        res.json({message:'the leaderBoard has been found!'})
        res.send(JSON.stringify(array));
    }
}


module.exports = router;

