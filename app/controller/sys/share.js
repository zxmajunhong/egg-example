'use strict';
/**
 * 内部分享相关控制器
 */

const Controller = require('../../core/baseController');

class ShareController extends Controller {
  // 内部分享信息的首页展示
  async index() {
    const ctx = this.ctx;
    const list = await ctx.model.ShareModel.find().sort({ date: 1 });
    await ctx.render('share/list', {
      title: '拓美内部分享',
      list,
      user: (ctx.session.user && ctx.session.user.user_name) || '',
    });
  }
}

module.exports = ShareController;
