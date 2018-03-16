'use strict';
/**
 * service 基类
 */
const { Service } = require('egg');

class BaseService extends Service {
  // 执行sql语句
  async query(sql, values) {
    const mysql = this.app.mysql;
    // TODO 增加统一错误异常处理机制
    try {
      const sqlResult = await mysql.query(sql, values);
      return sqlResult;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = BaseService;
