'use strict';
/**
 * 内部分享相关路由地址
 */

module.exports = app => {
  const shareController = app.controller.sys.share;
  // 分享列表
  app.router.get('/share', shareController.index);

  // 分享编辑
  app.router.get('/share/input', shareController.input);

  // 分享保存
  app.router.post('/share/input', shareController.save);

  // 分享删除
  app.router.post('/share/remove', shareController.remove);
};
