var express = require('express');
var router = express.Router();
var resources = [];

/* GET home page. */
router.get(/.*/, function(req, res, next) {
  req.url.replace('/', '') === '' ? res.render('index', { title: '前端项目资源', resources, }) : next();
});

module.exports = function (list) {
  resources = list;
  return router;
};
