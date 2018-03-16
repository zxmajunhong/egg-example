'use strict';

/**
 * 整个系统首页控制器
 */

const Controller = require('../core/baseController');

class HomeController extends Controller {
  // 框架展示
  async index() {
    await this.ctx.render('index', {
      user: {
        user_name: 'admin',
      },
    });
  }
  // 首页展示
  async home() {
    await this.ctx.render('home');
  }
}

module.exports = HomeController;
