let users = require('../models/users');
let express = require('express');
let router = express.Router();

let findById = (arr, id) => {
    let result  = arr.filter(function(o) { return o.id === id;} );
    return result ? result[0] : null; // or undefined
};

router.addUser = (req,res) => {
    let currentSize = users.length;
    users.push({"id":currentSize+1,"username": req.body.username,"userpassword": req.body.userpassword,"picture":req.body.picture,"introduction":req.body.introduction});
    if((currentSize +1) === users.length){
        res.json({ message: 'user Added Successfully!'});
        res.send(req.body.username);
    }

};

router.deleteUser = (req,res) => {
    let user = findById(users,req.params.id);
    let index = users.indexOf(user);

    let currentSize = users.length;
    users.splice(index, 1);

    if((currentSize - 1) == users.length)
        res.json({ message: 'user Deleted!'});
    else
        res.json({ message: 'user NOT Deleted!'});
};

router.updateUser = (req,res) => {
    let user = findById(users,req.params.id);

    user.username = req.params.singer;
    user.userpassword= req.params.album;
    user.picture = req.params.picture;
    user.introduction = req.params.introduction;

    res.json({message: 'user information has updated!'})
};

router.searchUser = (req,res) => {
    res.setHeader('Content-Type', 'application/json');
    let username = req.params.username;
    let  array = [];
    let currentSize = username.length;

    for(let i =0 ;i<currentSize;i+=1){
        if(users[i].username === username){
            array.push(users[i]);
        }
    }

    if(array.length === 0) {
        res.json({message:'user not found!'})
    }
    else{
        res.json({message:'user has been found!'})
        res.send(JSON.stringify(array));
    }
}



module.exports = router;