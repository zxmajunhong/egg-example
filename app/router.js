'use strict';

const fs = require('fs');
const path = require('path');

/**
 * 当前路由地址就只显示一个首页
 * 其他的通过地址加载进来
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 整个框架展示
  router.get('/', controller.home.index);
  // 首页
  router.get('/home', controller.home.home);

  loadRouter(path.join(app.baseDir, 'app/router'), app);
};

/**
 * 自动加载app/router/下的路由文件信息
 *
 * @param {any} catalog 路由目录
 * @param {any} app app
 */
function loadRouter(catalog, app) {
  const files = fs.readdirSync(catalog);
  files.forEach(name => {
    const pathName = path.join(catalog, name);
    const stat = fs.statSync(pathName);
    if (stat.isFile() && /\.js$/.test(name)) {
      require(pathName)(app);
    } else {
      loadRouter(pathName, app);
    }
  });
}
