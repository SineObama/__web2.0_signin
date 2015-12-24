// var mongoose = require('mongoose');
// mongoose.connect('test', ['user', 'name']);
var mongojs = require('mongojs');
var db = mongojs('userData', ['user']);
// var log = require('./log.js');

// function dataBase() {
//   this.db = db;
//   this.user = db.user;
//   this.addUser = function(data) {
//     db.user.save(data);
//   }
// }

module.exports = db.user;
