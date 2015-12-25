var express = require('express');
var router = express.Router();
var debug = require('debug')('signin:routes');
var userManager = require('../dataManager.js');

router.get('/', function(req, res, next) {
  if (req.query.username) {
    if (!req.session.user) {
      req.session.warningOnce = '请先登录';
      res.redirect(302, '/index');
    } else if (req.query.username !== req.session.user.username) {
      req.session.warningOnce = '只能够访问自己的数据';
      res.redirect(302, '/?username=' + req.session.user.username);
    } else {
      showDetailPage(req);
    }
  } else {
    res.redirect(302, '/index');
  }
});

router.get('/index', function showPage(req, res, next) {
  req.session.user ? showDetailPage(req, res) : showIndexPage(req, res);
});

router.post('/signin', function(req, res, next) {
  userManager.userSignin(req.body.username, req.body.password).then(function(user) {
    delete req.session.user;
    req.session.user = user;
    redirect('/?username=' + user.username);
  }).catch(function(msg) {

  })
});

router.get('/regist', function(req, res, next) {
  res.render('regist.jade');
});

router.post('/signup', function(req, res, next) {
  userManager.addUser(req.body).then(function() {
    res.redirect('/?username=' + req.body.username);
  }).catch(function(msg) {
    
  });
});

module.exports = router;

function showDetailPage(req, res) {
  var warning = req.session.warningOnce;
  req.session.warningOnce = '';
  // var data = findByUsername(req.query.username);
  userData.find({
    username: req.query.username
  }).toArray
  if (warning)
    data.warning = warning;
  res.render('detail.jade', data);
}

function showIndexPage(req, res) {
  var warning = req.session.warningOnce;
  req.session.warningOnce = '';
  var data = {};
  if (warning)
    data.warning = warning;
  res.render('index.jade', data);
}
