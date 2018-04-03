'use strict';
/**
 * 用户管理相关控制器
 */

const Controller = require('../../core/baseController');

class UserController extends Controller {
  async index() {
    const userList = await this.ctx.service.user.getUserList();
    await this.ctx.render('user/list', {
      userList,
    });
  }

  async input() {
    await this.ctx.render('user/input');
  }
}

module.exports = UserController;
