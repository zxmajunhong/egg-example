'use strict';
/**
 * 登录相关路由
 */

module.exports = app => {
  // 登录页面
  app.router.get('/login', app.controller.login.index);

  // 登录请求
  app.router.post('/login', app.controller.login.login);

  // mysql 测试
  app.router.get('/login/test', app.controller.login.test);
};
