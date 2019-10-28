var express = require('express');
var fs = require('fs');
var mime = require('mime');
var path = require('path');
var capitalGroup = express.Router();
const { downloadFile, errorTips, fileModifiedDate } = require('../utils');

/* GET users listing. */
capitalGroup.get('/', function(req, res, next) {
  Promise.all([
    fileModifiedDate(process.cwd() + '/resources/capitalGroup/declare-react.zip'),
  ]).then(([declareReact, declareVue, configure]) => {
    res.render('project', {
      title: '首都创业',
      fileList: [
        {
          name: 'declare-react.zip',
          url: '/capitalGroup/declare-react',
          lastModified: declareReact,
        },
      ]
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
