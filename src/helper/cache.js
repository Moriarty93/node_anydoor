const { cache } = require('../config/defaultConfig');

const refreshRes = (stats, res) => {
  const { maxAge, expires, cacheControl, lastModified, etag } = cache;

  if(expires) {
    res.setHeader('Expires', (new Date(Date.now() + maxAge * 1000)).toUTCString());
  }

  if(cacheControl) {
    res.setHeader('Cache-Control', `public, max-age=${maxAge}`);
  }

  if(lastModified) {
    res.setHeader('Last-Modified', stats.mtime.toUTCString());
  }
  if(etag) {
    res.setHeader('ETag', `${stats.size}`);
  }
};

module.exports = (stats, req, res) => {
  refreshRes(stats, res);
  // console.log(req.headers);
  const lastModified = req.headers['if-modified-since'];
  const etag = req.headers['if-none-match'];
  // console.log(lastModified);
  // console.log(res.getHeaders()['last-modified']);
  // console.log('222222');
  // console.log(etag);
  // console.log(res.getHeaders()['etag']);
  // console.log(res.getHeaders());

  if(!lastModified && !etag) {
    return false;
  }
  
  if(lastModified && lastModified !== res.getHeader('last-modified')) {
    return false;
  }

  if(etag && etag !== res.getHeader('etag')) {
    return false;
  }

  return true;
};