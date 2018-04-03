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
      console.log('query', sqlResult);
      return sqlResult;
    } catch (err) {
      throw err;
    }
  }
  /**
   * mysql的插入操作
   *
   * @param {string} table 要插入的表名
   * @param {any} rows 要插入的行信息可以是对象，多行的情况是数组 例：{col1: '第一列', col2: '第二列'}  或者 [{col1: '第一行第一列', col2: '第一行第二列'}, {col1: '第二行第一列', col2: '第二行第二列'}]
   * @param {any} columns 所要插入的自定列名，如果不传默认取的就是rows的key值为列名 如果传递传入列名数组 例：['col1', 'col2']
   * @return {int} sqlResult 返回的受影响的行数 失败返回0
   * @memberof BaseService
   */
  async insert(table, rows, columns) {
    const mysql = this.app.mysql;
    try {
      const sqlResult = await mysql.insert(table, rows, { columns });
      console.log('insert', sqlResult);
      return sqlResult.affectedRows;
    } catch (err) {
      throw err;
    }
  }
  /**
   * mysql的查询操作
   *
   * @param {any} table 表名
   * @param {any} options 查询配置 options.where=>查询条件、options.columns=>要查询的列名、options.orders=>排序字段、options.limit=>限制返回多少行、options.offset=>从多少行开始查询 例：查询table表中col1列等于1按照col2升序、col3降序排列并且只返回前10条col1,col2,col3三列数据
   * select('table', {where: {col1: 1}, columns: ['col1','col2','col3'], orders: [['col2','asc'], ['col3', 'desc']], limit: 10, offset: 0})
   * 目前where条件中只有and和=号条件，其他的通过query自行拼装
   * @return {array} sqlResult
   * @memberof BaseService
   */
  async select(table, options) {
    const mysql = this.app.mysql;
    try {
      const sqlResult = await mysql.select(table, options);
      console.log('select', sqlResult);
      return sqlResult;
    } catch (err) {
      throw err;
    }
  }
  /**
   * mysql的修改操作
   *
   * @param {any} table 要修改的表名
   * @param {any} row 要修改的字段 例：{id: 1, name: 'xxx', sex: '男'}
   * @param {any} options 修改配置信息
   * @param {any} options.where 修改语句的where条件 如果没有传递默认会以传入的row参数的id字段当为条件，如果row中没有id字段那么会抛出异常 例：{name: 'xxx'}
   * @param {any} options.columns 要修改的列名，不传递默认取的是row中key值为字段名 例：['sex']，这样只会修改sex字段
   * @return {int} sqlResutl.affectedRows 返回的受影响的行数
   * @memberof BaseService
   */
  async update(table, row, options) {
    const mysql = this.app.mysql;
    try {
      const sqlResult = await mysql.update(table, row, options);
      console.log('update', sqlResult);
      return sqlResult.affectedRows;
    } catch (err) {
      throw err;
    }
  }
  /**
   * mysql的delete操作
   *
   * @param {any} table 要操作的表名
   * @param {any} where 要删除的where条件 {name: 'xxx'} 删除表中name等于xxx的记录
   * @return {any} sqlResult
   * @memberof BaseService
   */
  async delete(table, where) {
    const mysql = this.app.mysql;
    try {
      const sqlResult = await mysql.delete(table, where);
      console.log('delete', sqlResult);
      return sqlResult.affectedRows;
    } catch (err) {
      throw err;
    }
  }
  /**
   * 根据条件返回数据条数
   *
   * @param {any} table 表名
   * @param {any} where 查询条件
   * @return {int} count 返回数据条数
   * @memberof BaseService
   */
  async count(table, where) {
    const mysql = this.app.mysql;
    try {
      let count = 0;
      if (typeof where === 'string' && where) {
        // 如果where条件是字符串 直接拼接sql语句
        const sqlResult = await this.query(`select count(*) as count from ${table} where ${where}`);
        count = sqlResult[0].count;
      } else {
        count = await mysql.count(table, where);
      }
      return count;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = BaseService;
