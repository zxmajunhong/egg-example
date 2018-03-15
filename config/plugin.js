'use strict';

// had enabled by egg
// exports.static = true;
exports.nunjucks = { // 开启nunjucks模版引擎
  enable: true,
  package: 'egg-view-nunjucks',
};
exports.static = true; // 开启静态目录

exports.mongoose = { // 开启mongoose插件
  enable: true,
  package: 'egg-mongoose',
};
