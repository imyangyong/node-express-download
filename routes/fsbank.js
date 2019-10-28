var express = require('express');
var fs = require('fs');
var mime = require('mime');
var path = require('path');
var fsbank = express.Router();
const { downloadFile, errorTips, fileModifiedDate } = require('../utils');

/* GET users listing. */
fsbank.get('/', function(req, res, next) {
  Promise.all([
    fileModifiedDate(process.cwd() + '/resources/fsbank/declare-react.zip'),
  ]).then(([declareReact, declareVue, configure]) => {
    res.render('project', {
      title: '抚顺银行',
      fileList: [
        {
          name: 'declare-react.zip',
          url: '/fsbank/declare-react',
          lastModified: declareReact,
        },
      ]
    });
  })
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
