'use strict';

/**
 * 当前路由地址就只显示一个首页
 * 其他的通过地址加载进来
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
};
