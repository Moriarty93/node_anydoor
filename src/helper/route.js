const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const util = require('util');
const stat = util.promisify(fs.stat);
const readdir = util.promisify(fs.readdir);

const config = require('../config/defaultConfig');

// console.log(__dirname); // C:\Users\EasyHoms\Desktop\node_anydoor\src\helper
// __dirname当前模块文件的文件夹名称，
// 与'../template/dir.tpl'拼接成绝对路径

const tplPath = path.join(__dirname, '../template/dir.tpl');
const source = fs.readFileSync(tplPath, 'utf-8');
const template = Handlebars.compile(source.toString());


module.exports = async (req, res, filePath) => {
  try {
    const stats = await stat(filePath);
    if(stats.isFile()) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      fs.createReadStream(filePath).pipe(res);
    } else if(stats.isDirectory()) {
      const files = await readdir(filePath);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      //获取文件相对与项目目录的相对路径
      const dir = path.relative(config.root, filePath);
      const data = {
        title: path.basename(filePath),
        dir: dir ? `/${dir}` : '',
        files
      };
      res.end(template(data));
    }
  } catch (err) {
    console.log(err);
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`${err.toString()}`);
  }
};