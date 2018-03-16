'use strict';
/**
 * 验证是否登录的中间件
 * egg 中编写中间件说明 https://eggjs.org/zh-cn/basics/middleware.html
 */

module.exports = () => {
  return async function auth(ctx, next) {
    if (ctx.session.user) {
      // 判断登录session是否存在
      // 如果存在延长有效期
      ctx.session.save();
      if (ctx.url === '/login') {
        return ctx.redirect('/');
      }
      await next();
    } else {
      if (ctx.url !== '/login') {
        return ctx.redirect('/login');
      }
      await next();
    }
  };
};
