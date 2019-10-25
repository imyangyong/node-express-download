var express = require('express');
var fs = require('fs');
var mime = require('mime');
var path = require('path');
var brc = express.Router();
const { downloadFile, errorTips, fileModifiedDate } = require('../utils');

/* GET users listing. */
brc.get('/', function(req, res, next) {
  Promise.all([
    fileModifiedDate(process.cwd() + '/resources/brc/declare-react.zip'),
    fileModifiedDate(process.cwd() + '/resources/brc/declare-vue.zip'),
    fileModifiedDate(process.cwd() + '/resources/brc/configure.zip'),
  ]).then(([declareReact, declareVue, configure]) => {
    res.render('brc', {
      fileModifiedDate: {
        declareReact,
        declareVue,
        configure,
      }
    });
  })
  
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

module.exports = brc;
