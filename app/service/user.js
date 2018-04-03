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
  async getUserByDepartmentId(departmentId) {
    const user = await this.select('tm_user', {
      where: { department_id: departmentId },
      columns: [ 'user_num', 'user_name' ],
      orders: [[ 'user_num', 'asc' ]],
    });
    return user;
  }
  /**
   * 获取用户列表
   *
   * @param {any} options 查询配置
   * @return {any} sqlResult
   * @memberof UserService
   */
  async getUserList(options) {
    const sqlResult = await this.select('tm_view_user_list', options);
    return sqlResult;
  }
}

module.exports = UserService;
