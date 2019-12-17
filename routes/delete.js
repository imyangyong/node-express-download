var express = require('express');
var fs = require('fs');
var mime = require('mime');
var path = require('path');
var del = require('delete');
var delRouter = express.Router();

function emptyTips(res) {
  res.writeHead(500, {'content-type': 'text/plain'});
  res.write('No have this company\n\n');
  
  res.end();
}

delRouter.get(/.*/, function(req, res, next) {
  var params = decodeURI(req.url).split('/');
  if (params.length < 2) {
    res.writeHead(500, {'content-type': 'text/plain'});
    res.write('Bad request\n\n');
  
    res.end();
    return;
  }
  
  if (params.length === 3 && fs.existsSync(path.resolve(process.cwd(), 'resources', params[1]))) {
      del.sync(path.resolve(process.cwd(), 'resources', params[1], params[2]));
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('Delete success\n\n');
    
      res.end();
  } else if (params.length === 2 && fs.existsSync(path.resolve(process.cwd(), 'resources', params[1]))){
    var files = fs.readdirSync(path.resolve(process.cwd(), 'resources', params[1]));
    if (files.length > 0) {
      res.writeHead(500, {'content-type': 'text/plain'});
      res.write('Project files exist, please delete all of them, then do this\n\n');
  
      res.end();
    } else {
      del.sync(path.resolve(process.cwd(), 'resources', params[1]), { force: true });
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('Delete success\n\n');
  
      res.end();
    }
  } else {
    emptyTips(res);
  }
  
  // next();
});

module.exports = delRouter;
