var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var app = express();
var authenticationController = require('./server/controllers/authentication-controller');
var profileController = require('./server/controllers/profile-controller');

mongoose.connect('mongodb://localhost:27017/time-waste');

app.use(bodyParser.json());
app.use(multipartMiddleware);
app.use('/app', express.static(__dirname + "/app"));
app.use('/node_modules', express.static(__dirname + "/node_modules"));

//Depreciated sendfile, use sendFile
app.get('/', function(req, res){
  res.sendFile('/home/andrei/TimeWaste/index.html');
});

//Authentification
app.post('/api/user/signup', authenticationController.signup);
app.post('/api/user/login', authenticationController.login);

//Profile
app.post('/api/profile/editPhoto',multipartMiddleware,profileController.updatePhoto);
app.post('/api/profile/updateUsername', profileController.updateUsername);
app.post('/api/profile/updateBio', profileController.updateBio);

app.listen('3000', function(){
  console.log("Listening for Local Host 3000");
});


//use time-waste
//db.users.find()
//db.dropDatabase()
