'use strict';
/**
 * 内部分享相关路由地址
 */

module.exports = app => {
  const share = app.controller.sys.share;
  // 分享列表
  app.router.get('/share', share.index);
};
