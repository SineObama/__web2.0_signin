var express = require('express');
var router = express.Router();
var debug = require('debug')('signin:routes');
var userManager = require('../dataManager.js');
const initialString = ' ';

router.get('/', function(req, res, next) {
  if (req.query.username) {
    if (!req.session.user) {
      req.session.warningOnce = '请先登录';
      req.session.usernameForSignin = req.query.username;
      res.redirect(302, '/index');
    } else if (req.query.username !== req.session.user.username) {
      req.session.warningOnce = '只能够访问自己的数据';
      res.redirect(302, '/?username=' + req.session.user.username);
    } else {
      showDetailPage(req, res);
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
    debug(req.body.username + ' sign in succeed');
    delete req.session.user;
    req.session.user = user;
    res.redirect('/?username=' + user.username);
  }).catch(function(msg) {
    debug(req.body.username + ' sign in fail: ' + msg);
    req.session.warningOnce = msg;
    res.redirect(302, '/index');
  })
});

router.get('/regist', function(req, res, next) {
  var warning = req.session.warningOnce || initialString;
  req.session.warningOnce = initialString;
  res.render('regist.jade', {
    warning: warning
  });
});

router.post('/signup', function(req, res, next) {
  userManager.addUser(req.body).then(function(user) {
    debug('sign up succeed');
    req.session.user = user;
    res.redirect('/?username=' + req.body.username);
  }).catch(function(msg) {
    debug('sign up fail: ' + msg);
    req.session.warningOnce = msg;
    res.redirect(302, '/regist');
  });
});

router.get('/signout', function(req, res, next) {
  debug(req.session.user && req.session.user.username + ' sign out succeed');
  delete req.session.user;
  res.redirect('/index');
});

module.exports = router;

function showDetailPage(req, res) {
  var warning = req.session.warningOnce || initialString;
  req.session.warningOnce = initialString;
  res.render('detail.jade', {
    warning: req.session.warningOnce,
    user: req.session.user
  });
}

function showIndexPage(req, res) {
  var warning = req.session.warningOnce || initialString;
  req.session.warningOnce = initialString;
  var username = typeof req.session.usernameForSignin === 'undefined' ? '' : 
  req.session.usernameForSignin;
  delete req.session.usernameForSignin;
  res.render('index.jade', {
    warning: warning,
    usernameForSignin: username
  });
}
