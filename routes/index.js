var fs = require('fs');
var path = require('path');

var express = require('express');
var router = express.Router();
var resources = [];

/**
 * method 获取project资源列表.
 * @return {Array} return 列表.
 */
function getResources() {
  let files = fs.readdirSync(path.resolve(process.cwd(), 'resources'));
  return files.map(file => ({
    url: file,
    name: file
  }))
}

/* GET home page. */
router.get(/.*/, function(req, res, next) {
  resources = getResources();
  req.url.replace('/', '') === '' ? res.render('index', { title: '前端项目资源', resources, }) : next();
});

module.exports = router;
