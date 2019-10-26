/*const musics = [
    {Mid:1,name:"yiqiannianyihou",singer:"林俊杰",album:"一千年以后",introduction:""},
    {Mid:2,name:"xijie",singer:"林俊杰",album:"一千年以后",introduction:""},
    {Mid:3,name:"jiangnan",songer:"林俊杰",album:"一千年以后",introduction:""}
];

module.exports = musics;*/
let mongoose = require('mongoose');

let musicsSchema = new mongoose.Schema({
        Mid: Number,
        name:String,
        singer:String,
        album:String,
        introduction:{type:String,default: " "}

    },
    { collection: 'musics' });

module.exports = mongoose.model('musics', musicsSchema);