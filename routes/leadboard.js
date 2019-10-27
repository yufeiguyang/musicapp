let leaderboard = require('../models/leaderboard');
let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();

// mongoose.connect('mongodb://localhost:27017/leaderboard');
mongoose.connect('mongodb://yufeiyang:yu717235460@ds239858.mlab.com:39858/heroku_24v850ch')
let db = mongoose.connection;
// let options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
//     replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } },
//     user: 'yufeiyang', pass: 'yu717235460' };
//
// let mongodbUri = 'mongodb://ds239858.mlab.com:39858/heroku_24v850ch';



// let db = mongoose.createConnection(mongodbUri,options);

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});


router.showAllBoards = (req,res) => {
    res.setHeader('Content-Type', 'application/json');
    leaderboard.find(function(err, leaderboard) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(JSON.stringify(leaderboard, null, 5));
        }
    });
};

router.findBoards = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    leaderboard.find({ "name" : req.params.name },function(err, leaderboard) {
        if (err) {
            res.json({ message: 'leaderboard NOT Found!', errmsg : err });
        }
        else {
            res.send({message: 'leaderboard  Found!',data:leaderboard});
        }
    })

};

router.addBoard = (req,res) => {
    res.setHeader('Content-Type', 'application/json');

    let boards= new leaderboard();
    boards.id = req.body.id;
    boards.name = req.body.name;
    boards.include = req.body.include;


    boards.save(function(err) {
        if (err)
        {
            res.json({ message: 'leaderboard Added failed'});
        }
        else
        {
            res.json({ message: 'leaderboard Added Successfully!',data:boards});

        }
    });
};

router.deleteBoard = (req,res) =>{
    leaderboard.remove({"name":req.params.name}, function(err) {
        if (err)
            res.json({ message: 'leaderboard NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'leaderboard Successfully Deleted!'});
    });
};

router.updateBoard = (req,res) => {
    res.setHeader('Content-Type', 'application/json');
    leaderboard.find({"name":req.params.name},function(err) {
        if (err) {
            res.json({message: 'leaderboard NOT found!', errmsg: err});
        } else {
            let boards = new leaderboard();
            boards.id = req.body.id;
            boards.name = req.body.name;
            boards.include = req.body.include;
            boards.save(function (err) {
                if (err) {
                    res.json({message: 'leaderboard updated failed'});
                } else {
                    res.json({message: 'leaderboard Successfully update!', data: boards});
                }
            });
        }

    });
};






module.exports = router;

