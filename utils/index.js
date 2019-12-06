var fs = require('fs');
var mime = require('mime');
var path = require('path');

/**
 * method download file.
 * @param {String} url File path in the computer.
 * @param {Object} res Http response.
 */
function downloadFile(url, res) {
  var stream = fs.createReadStream(url);
  // 设置内容
  res.setHeader('Content-Type', mime.lookup(url));
  // 设置为附件
  res.setHeader('Content-Dispostion', 'attachment; filename = "' + path.basename(url));
  res.writeHead(200);
  stream.pipe(res);
}

function applyDate() {
  Date.prototype.format = function(fmt) {
    var o = {
      "M+" : this.getMonth()+1,                 //月份
      "d+" : this.getDate(),                    //日
      "h+" : this.getHours(),                   //小时
      "m+" : this.getMinutes(),                 //分
      "s+" : this.getSeconds(),                 //秒
      "q+" : Math.floor((this.getMonth()+3)/3), //季度
      "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
      fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
      if(new RegExp("("+ k +")").test(fmt)){
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      }
    }
    return fmt;
  }
}

/**
 * method get file & modified date.
 * @param {String} project Project to resolve.
 * @return {Object} return File info.
 */
function readFile(project) {
  const files = fs.readdirSync(`${process.cwd()}/resources/${project}`);
  return files.map(filename => {
    const fileStat = fs.statSync(path.resolve(`${process.cwd()}/resources${project}`, './' + filename));
    return {
      name: filename,
      url: `${project}/${filename}`,
      lastModified: new Date(fileStat.mtime).format("yyyy-MM-dd hh:mm:ss")
    }
  })
}

/**
 * method error.
 * @param {Object} res Http response.
 */
function errorTips(res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.writeHead(200);
  res.end('暂无文件');
}

applyDate();

module.exports = {
  downloadFile,
  errorTips,
  readFile,
}
