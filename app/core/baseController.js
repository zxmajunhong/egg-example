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

  /**
   * 前台浏览器请求成功响应公共方法
   *
   * @param {any} msg 返回消息内容 默认为空
   * @param {any} [data={}] 返回的数据 默认为空对象
   * @memberof BaseController
   */
  success(msg = '', data = {}) {
    this.ctx.body = { code: 200, msg, data };
  }

  /**
   * 前台浏览器请求失败响应公共方法
   *
   * @param {string} [msg='请求失败'] 返回的消息内容 默认为请求失败
   * @param {number} [code=201] 返回的状态码 默认201 其他自定义
   * @memberof BaseController
   */
  fail(msg = '请求失败', code = 201) {
    this.ctx.body = { code, msg };
  }
}

module.exports = BaseController;
