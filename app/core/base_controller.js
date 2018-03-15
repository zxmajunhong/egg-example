'use strict';
/**
 * controller 基类
 */
const { Controller } = require('egg');
class BaseController extends Controller {

  /**
   * 公用渲染方法 用于渲染模版
   *
   * @param {any} viewPath 模版地址
   * @param {any} viewData 模版所需要的数据
   * @memberof BaseController
   */
  async renderHtml(viewPath, viewData) {
    await this.ctx.render(viewPath, viewData);
  }
}

module.exports = BaseController;
