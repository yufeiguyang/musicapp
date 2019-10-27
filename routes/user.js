let users = require('../models/users');
let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();

// mongoose.connect('mongodb://localhost:27017/users');
mongoose.connect('mongodb://yufeiyang:yu717235460@ds239858.mlab.com:39858/heroku_24v850ch')
let db = mongoose.connection;
// let options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
//     replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } },
//     user: 'yufeiyang', pass: 'yu717235460' };
//
// let mongodbUri = 'mongodb://ds239858.mlab.com:39858/heroku_24v850ch';
//
// let db = mongoose.createConnection(mongodbUri,options);


db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});



router.addUser = (req,res) => {
    res.setHeader('Content-Type', 'application/json');

    let User= new users();
    User.username = req.body.username;
    User.userpassword = req.body.userpassword;
    User.picture = req.body.picture;
    User.introduction = req.body.introduction;

    User.save(function(err) {
        if (err)
        {
            res.json({ message: 'User Added failed'});
        }
        else
        {
            res.json({ message: 'User Added Successfully!',data:User});

        }
    });

};

router.deleteUser = (req,res) => {
    users.remove({"username":req.params.username}, function(err) {
        if (err)
            res.json({ message: 'user NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'user Successfully Deleted!'});
    });
};

router.updateUser = (req,res) => {
    users.update({"username":req.params.name},function(err,User) {
        if (err) {
            res.json({message: 'Music NOT found!', errmsg: err});
        } else {
            User.username = req.body.username;
            User.userpassword = req.body.userpassword;
            User.picture = req.body.picture;
            User.introduction = req.body.introduction;
            if (err) {
                res.json({message: 'User updated failed'});
            } else {
                res.json({message: 'User Successfully update!',data:User});
            }
        }
    });



};

router.searchUser = (req,res) => {
    res.setHeader('Content-Type', 'application/json');
    users.find({"username":req.params.username},function(err,users) {
        if(err){
            res.json({message: 'user NOT found!', errmsg: err});
        }else{
            res.json({message: 'user Successfully Found!',data:users});
        }
    })

}



module.exports = router;