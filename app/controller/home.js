'use strict';

/**
 * 整个系统首页控制器
 */

const Controller = require('../core/base_controller');

class HomeController extends Controller {
  index() {
    this.renderHtml('index.njs', {
      user: {
        user_name: 'admin',
      },
    });
  }
  home() {
    this.renderHtml('home.njs');
  }
}

module.exports = HomeController;
