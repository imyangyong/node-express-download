var express = require('express');
var fs = require('fs');
var mime = require('mime');
var path = require('path');
var brc = express.Router();
const { downloadFile, errorTips, readFile } = require('../utils');

/* GET users listing. */
brc.get('/', function(req, res, next) {
  Promise.all([
    readFile('declare-react.zip', 'brc'),
    readFile('declare-vue.zip', 'brc'),
    readFile('configure.zip', 'brc'),
    readFile('statistic.zip', 'brc'),
  ]).then(([...files]) => {
    res.render('project', {
      title: '蓝光BRC',
      fileList: files.filter(file => file),
    });
  }).catch(e => {
    res.render('project', {
      title: '暂无文件',
      fileList: [],
    });
  });
});

brc.get('/declare-react', function (req, res, next) {
  var filePath = process.cwd() + '/resources/brc/declare-react.zip';
  fs.stat(filePath, function (err, stat) {
    if (err) {
      errorTips(err, res);
      return;
    }
    downloadFile(filePath, res);
  })
});

brc.get('/declare-vue', function (req, res, next) {
  var filePath = process.cwd() + '/resources/brc/declare-vue.zip';
  fs.stat(filePath, function (err, stat) {
    if (err) {
      errorTips(err, res);
      return;
    }
    downloadFile(filePath, res);
  })
});

brc.get('/configure', function (req, res, next) {
  var filePath = process.cwd() + '/resources/brc/configure.zip';
  fs.stat(filePath, function (err, stat) {
    if (err) {
      errorTips(err, res);
      return;
    }
    downloadFile(filePath, res);
  })
});

brc.get('/statistic', function (req, res, next) {
  var filePath = process.cwd() + '/resources/brc/statistic.zip';
  fs.stat(filePath, function (err, stat) {
    if (err) {
      errorTips(err, res);
      return;
    }
    downloadFile(filePath, res);
  })
});

module.exports = brc;
