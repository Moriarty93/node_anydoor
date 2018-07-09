const http = require('http');
const chalk = require('chalk');
const path = require('path');
const conf = require('./src/config/defaultConfig');
const route = require('./src/helper/route');

const server = http.createServer((req, res) => {
  // console.log(chalk.blue(conf.root));
  // console.log(chalk.green(req.url));
  // 拼接出文件绝地路径
  const filePath = path.join(conf.root, req.url);
  route(req, res, filePath);
});

server.listen(conf.port, conf.hostname, () => {
  const addr = `http://${conf.hostname}:${conf.port}`;
  console.log(`Server started at ${chalk.green(addr)}`);
});