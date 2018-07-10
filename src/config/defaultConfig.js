// process.cwd() 
// 返回 Node.js 进程当前工作的目录

module.exports = {
  root: process.cwd(),
  hostname: '127.0.0.1',
  port: '3000',
  compress: /\.(html|js|css|md)/,
  cache: {
    maxAge: 600,
    expires: true,
    cacheControl: true,
    lastModified: true,
    etag: true
  }
};