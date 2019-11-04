let users = require('../models/users');
let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();

mongoose.connect('mongodb://yufeiyang:yu717235460@ds239858.mlab.com:39858/heroku_24v850ch')
let db = mongoose.connection;


db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});

function getByName(array,name){
    let result = array.filter(function(obj){return obj.username === username;});
    return result ? result[0] : null;
}


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

router.updateUserPassword = (req,res) => {
    res.setHeader('Content-Type', 'application/json');
    users.update({"username":req.params.username},{$set:{"userpassword":req.body.userpassword}},function(err, result)
    {
        if (err) {
            res.json({message: 'password NOT found!', errmsg: err});
        } else {
            res.json({message: 'password Successfully update!'});
        }

    });
};

router.searchUser = (req,res) => {
    res.setHeader('Content-Type', 'application/json');
    users.find({"username":req.params.username},function(err,users) {
        if(err){
            res.json({message: 'user NOT found!', errmsg: err});
        }
        else{
            res.json({message: 'user Successfully Found!',data:users});
        }
    })

}



module.exports = router;