var express = require('express');
var path = require('path');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var routes = require('./routes/index');
var music = require('./routes/music');
var user = require('./routes/user');
var leadboard = require('./routes/leadboard');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.get('/music',music.showAll);
app.get('/music/:name',music.findOne);
app.post('/music',music.addMusic);
app.delete('/music/:name',music.deleteMusic);
app.put('/music/:name/introduction',music.updateMusicInfo);
app.get('/music/:album/album',music.searchAlbum);

app.get('/user/:username',user.searchUser);
app.post('/user',user.addUser);
app.delete('/user/:username',user.deleteUser);
app.put('/user/:username/password',user.updateUserPassword);

app.get('/leadboard',leadboard.showAllBoards);
app.get('/leadboard/:name',leadboard.findBoards);
app.post('/leadboard',leadboard.addBoard);
app.delete('/leadboard/:name',leadboard.deleteBoard);
app.put('/leadboard/:name/include',leadboard.updateBoard);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
