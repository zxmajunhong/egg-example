'use strict';

/**
 * 登录相关控制器
 */

const Controller = require('../core/baseController');

class HomeController extends Controller {
  // 框架展示
  async index() {
    await this.ctx.render('login');
  }
  // 验证登录成功
  async login() {
    const { account, pwd } = this.ctx.request.body;
    const user = await this.ctx.service.user.login(account, pwd);
    // 判断是否登录成功
    if (user.length > 0) {
      // 查询到用户信息，登录成功
      // 设置用户session
      this.ctx.session.user = user[0];
      // 返回给浏览器端登录成功
      this.success('登录成功');
    } else {
      // 登录失败
      this.fail('用户名或密码不对');
    }
  }
  async test() {
    const user = await this.ctx.service.user.login('admin', '1234567');
    this.ctx.body = user;
  }
}

module.exports = HomeController;
