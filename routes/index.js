var express = require('express');
var router = express.Router();
var log = require('../log');
var userData = require('../userData.js');

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

router.post('/index', function(req, res, next) {

});

router.get('/regist', function(req, res, next) {
  res.render('regist.jade');
});

router.post('/regist', function(req, res, next) {

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
