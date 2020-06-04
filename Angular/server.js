var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var dbURL = "mongodb://localhost:27017/eSklep";
var db = mongoose.connect(dbURL);
var port = 3000;
var User = require('./src/app/models/user.js');

const app = express();
app.use(bodyParser());
app.use(bodyParser.json({
  limit: '5mb'
}));
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
})
app.get('/api/:email/:password', async (req, res) => {
  mongoose.connect(dbURL, {
    useNewUrlParser: true
  }, async function (err) {
    if (err) throw err;
    var users = await User.find({
      email: req.params.email,
      password: req.params.password
    })

    if (users.length != 0) {
      res.send('true');
    } else(res.send('false'))
    console.log(users);
    res.end();
  });

});


app.listen(port)
