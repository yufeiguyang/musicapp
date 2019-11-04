const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const mongoose = require("mongoose");
const musics = require("../../../models/musics");
const users = require("../../../models/users");
const leaderboard = require("../../../models/leaderboard");


const _ = require("lodash");
let  server = require("../../../bin/www");

mongoose.connect("mongodb://yufeiyang:yu717235460@ds239858.mlab.com:39858/heroku_24v850ch");

      

describe('music',() =>{
  beforeEach(async () => {
    try {
      await musics.deleteMany({});
      let music = new musics();
      music.Mid = 1;
      music.name = "xijie";
      music.singer ="lin jj";
      music.album = "yiqian";
      music.introduction = " asd";
      await music.save();
      music = new musics();
      music.Mid = 2;
      music.name = "jiangnan";
      music.singer = "lin jj";
      music.album = "jiangnan";
      music.introduction = " asd"; 
      await music.save();
    } catch (error) {
      console.log(error);
    }
  });

    describe('GET /music',() =>{
        it('should GET all the music',done => {
            request(server)
            .get('/music')
            .end((err,res) => {
               try{
                expect(200);
                expect(res.body).to.be.a('array');
                expect(res.body.length).to.equal(2);
                expect(res.body[0]).to.include( { Mid: 1, name: "xijie"  } );
                expect(res.body[1]).to.include( { Mid: 2, name:"jiangnan"  } );

            done();
            } catch(e){
                done(e);
            }
        });
    });

    });
    describe("GET /music/:name", () => {
      describe("when the name is valid", () => {
        it("should return the matching music", done => {
         request(server)
           .get('/music/xijie')
           .set("Accept", "application/json")
           .expect("Content-Type", /json/)
           .expect(200)
           .end((err, res) => {
             expect(res.body[0]).to.have.property("Mid", 1);
             expect(res.body[0]).to.have.property("singer", "lin jj");
             expect(res.body[0]).to.have.property("album", "yiqian");
             done(err);
            });
        });
    });
      describe("when the name is invalid", () => {
      })
    });

    describe("POST /music", () => {
        it("should return confirmation message and update datastore", () => {
          const music = {
           Mid: 3,
           name:"happybirthday",
           album:"unknown",
           singer:"unkonwn"
           
          };
          return request(server)
            .post('/music')
            .send(music)
            .expect(200)
            .then(res => {
              expect(res.body.message).equals("music Added Successfully!");
             
            });
        });
        after(() => {
          return request(server)
            .get('/music/happybirthday')
            .expect(200)
            .then(res => {
              expect(res.body[0]).to.have.property("name", "happybirthday");
              expect(res.body[0]).to.have.property("album", "unknown");
            });
        });
      });

      describe("PUT /music/:name/introduction", () => {
        describe("when the album is valid", () => {
          it("should return a message", () => {
            return request(server)
              .put('/music/xijie/introduction')
              .send({introduction:"a hot pop music in china"})
              .expect(200)
              .then(resp => {
                expect(resp.body).to.include({
                  message: "Music Successfully update!"
                });
              });
          });
          after(() => {
            return request(server)
              .get('/music/xijie')
              .set("Accept", "application/json")
              .expect("Content-Type", /json/)
              .expect(200)
              .then(resp => {
                expect(resp.body[0]).to.have.property("introduction", "a hot pop music in china");
              });
          });
        });
        describe("when the music is invalid", () => {
          it("should return a message for invalid donation id", () => {
            return request(server)
              .put('/music/00000/introduction')
              .expect(200);

          });
        });
    });

    describe('DELETE /music/:name', () =>{
       
      it("should return delete successfully", done => {
              request(server)
                .delete('/music/xijie')
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200)
                .end((err, res) => {
                  console.log(res.body);
                  expect(res.body.message).equals("Music Successfully Deleted!")
                  done(err);
              });
        });
     });  
});

describe('user',() =>{
  beforeEach(async () => {
    try {
      await users.deleteMany({});
      let user = new users();
      user.id = 20086461;
      user.username = "feiyang yu";
      user.userpassword = "123456";
      user.picture = "1.jpg";
      user.introduction = "hello world";
      await user.save();
      user = new users();
      user.id = 20086462;
      user.username = "fubo wang";
      user.userpassword = "123456";
      user.picture = "2.jpg";
      user.introduction = "hello world!";
      await user.save();
    } catch (error) {
      console.log(error);
    }
  });

  describe('GET /user/:username',() =>{
    describe("when the name is valid", () => {
      it("should return the matching user", done => {
       request(server)
         .get('/user/feiyang yu')
         .set("Accept", "application/json")
         .expect("Content-Type", /json/)
         .expect(200)
         .end((err, res) => {
           expect(res.body.data[0]).to.have.property("id", 20086461);
           expect(res.body.data[0]).to.have.property("userpassword", "123456");
           expect(res.body.data[0]).to.have.property("picture", "1.jpg");
           done(err);
          });
      });
  });
    describe("when the name is invalid", () => {
      it('should return a message', done =>{
        request(server)
         .get('/user/1111')
         .set("Accept", "application/json")
         .expect("Content-Type", /json/)
         .expect(200)
         .end((err,res) =>{
          expect(res.body.message).equals('user Successfully Found!');  
          done(err);  
         });
      });
    });
  });
  
  describe("POST /user", () => {
    it("should return confirmation message and update datastore", () => {
      const user = {
       id:20086463,
       username:"chaochao ding",
       userpassword:"123456",
       picture:"3.jpg",
       introduction: "have a nice day"
      };
      return request(server)
        .post('/user')
        .send(user)
        .expect(200)
        .then((err,res) =>{
          expect(res.body.message).equals('User Added Successfully!');
          
         });
      
    });
    after(() => {
      return request(server)
        .get('/user/chaochao ding')
        .expect(200)
        .then(res => {
          console.log(res.body.data[0]);
          expect(res.body.data[0].username).equals('chaochao ding');
          expect(res.body.data[0].id).equals(20086463);
        });
    });
  });


});

