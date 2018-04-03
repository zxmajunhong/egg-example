'use strict';
/**
 * 部门管理相关的数据操作方法
 */

const Service = require('../core/baseService');

class DepartmentService extends Service {
  // 获取部门数据列表
  async getList(where) {
    let result;
    if (typeof where === 'string' && where) {
      result = await this.query(`select * from tm_view_department_list where ${where}`);
    } else {
      result = await this.select('tm_view_department_list', {
        where,
      });
    }
    return result;
  }
  // 根据id获取一条记录
  async getOne(id) {
    const where = { id };
    const selectResult = await this.select('tm_department', { where });
    return selectResult[0];
  }
  // 插入数据
  async insertData(rows) {
    // 先判断部门名称是否存在
    const count = await this.count('tm_department', { name: rows.name });
    let msg = '';
    if (count > 0) {
      msg = '当前部门名称已经存在!';
    } else {
      const insertResult = await this.insert('tm_department', rows);
      if (insertResult > 0) {
        msg = '';
      } else {
        msg = '插入失败';
      }
    }
    return msg;
  }
  // 更新数据
  async updateData(row) {
    // 先判断当前需要更新的部门信息部门名称是否存在
    const count = await this.count('tm_department', `name='${row.name}' and id<>${row.id}`);
    let msg = '';
    if (count > 0) {
      msg = '当前部门名称已经存在!';
    } else {
      const updateResult = await this.update('tm_department', row);
      if (updateResult > 0) {
        msg = '';
      } else {
        msg = '更新失败';
      }
    }
    return msg;
  }
  // 根据id删除数据 返回受影响的行数
  async deleteById(id) {
    const result = await this.delete('tm_department', { id });
    return result;
  }
}

module.exports = DepartmentService;
