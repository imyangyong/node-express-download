var express = require('express');
var fs = require('fs');
var mime = require('mime');
var path = require('path');
var fsbank = express.Router();
const { downloadFile, errorTips, readFile } = require('../utils');

/* GET users listing. */
fsbank.get('/', function(req, res, next) {
  Promise.all([
    readFile('declare-react.zip', 'fsbank'),
    readFile('declare-vue.zip', 'fsbank'),
    readFile('configure.zip', 'fsbank'),
  ]).then(([...files]) => {
    res.render('project', {
      title: '抚顺银行',
      fileList: files.filter(file => file),
    });
  }).catch(e => {
    res.render('project', {
      title: '暂无文件',
      fileList: [],
    });
  });
});

fsbank.get('/declare-react', function (req, res, next) {
  var filePath = process.cwd() + '/resources/fsbank/declare-react.zip';
  fs.stat(filePath, function (err, stat) {
    if (err) {
      errorTips(err, res);
      return;
    }
    downloadFile(filePath, res);
  })
});

module.exports = fsbank;
