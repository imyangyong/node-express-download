var express = require('express');
var fs = require('fs');
var mime = require('mime');
var path = require('path');
var fsbank = express.Router();
const { downloadFile, errorTips } = require('../utils');

/* GET users listing. */
fsbank.get('/', function(req, res, next) {
  res.render('fsbank', { title: '抚顺银行' });
});

fsbank.get('/main', function (req, res, next) {
  var filePath = process.cwd() + '/resources/fsbank/main.zip';
  fs.stat(filePath, function (err, stat) {
    if (err) {
      errorTips(err, res);
      return;
    }
    downloadFile(filePath, res);
  })
});

module.exports = fsbank;
