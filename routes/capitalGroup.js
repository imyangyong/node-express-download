var express = require('express');
var fs = require('fs');
var mime = require('mime');
var path = require('path');
var capitalGroup = express.Router();
const { downloadFile, errorTips, readFile } = require('../utils');

/* GET users listing. */
capitalGroup.get('/', function(req, res, next) {
  Promise.all([
    readFile('declare-react.zip', 'capitalGroup'),
    readFile('declare-vue.zip', 'capitalGroup'),
    readFile('configure.zip', 'capitalGroup'),
  ]).then(([...files]) => {
    res.render('project', {
      title: '首都创业',
      fileList: files.filter(file => file),
    });
  }).catch(e => {
    res.render('project', {
      title: '暂无文件',
      fileList: [],
    });
  });
});

capitalGroup.get('/declare-react', function (req, res, next) {
  var filePath = process.cwd() + '/resources/capitalGroup/declare-react.zip';
  fs.stat(filePath, function (err, stat) {
    if (err) {
      errorTips(err, res);
      return;
    }
    downloadFile(filePath, res);
  })
});

module.exports = capitalGroup;
