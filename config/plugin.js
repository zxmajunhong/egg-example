'use strict';

// had enabled by egg
// exports.static = true;
// 开启nunjucks模版引擎
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};
// 开启静态目录
exports.static = true;

// 开启上传文件获取
exports.multipart = true;

// 开启mongoose插件
exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};

// 开启mysql插件
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};
