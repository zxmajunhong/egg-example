'use strict';
/**
 * 用户管理路由信息
 */

module.exports = app => {
  const userController = app.controller.sys.user;
  // 用户管理列表页面
  app.router.get('/user', userController.index);

  // 用户信息编辑或者新增页面
  app.router.get('/user/input', userController.input);
};
