var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '全税研发部前端资源系统' });
});

module.exports = router;
