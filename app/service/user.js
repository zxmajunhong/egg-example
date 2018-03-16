'use strict';
/**
 * 用户相关的数据操作方法
 */
const Service = require('../core/baseService');

class UserService extends Service {
  // 默认不需要提供构造函数。
  // constructor(ctx) {
  //   super(ctx); 如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
  //   // 就可以直接通过 this.ctx 获取 ctx 了
  //   // 还可以直接通过 this.app 获取 app 了
  // }
  async login(nameOrNum, pwd) {
    const user = await this.query('select * from tm_user where user_num=? or user_name=? and user_pwd=?', [ nameOrNum, nameOrNum, pwd ]);
    return user;
  }
}

module.exports = UserService;
