'use strict';

const Controller = require('../../core/baseController');

class DepartmentController extends Controller {
  // 部门列表首页
  async index() {
    const list = await this.ctx.service.department.getList();
    await this.ctx.render('department/list', {
      list,
    });
  }
  // 部门信息编辑页面
  async input() {
    // 查询所有第一级部门列表信息
    const ctx = this.ctx;
    const id = ctx.query.id;
    const parentList = await ctx.service.department.getList('parent_id=0');
    let departmentInfo = {};
    if (id) {
      departmentInfo = await ctx.service.department.getOne(id);
    }
    await this.ctx.render('department/input', {
      parentList,
      id,
      departmentInfo,
    });
  }
  // 新增或者编辑部门信息
  async save() {
    const ctx = this.ctx;
    const body = ctx.request.body;
    let result = '';
    let sucMsg = '';
    if (body.id) {
      // 存在id值表示更新
      result = await ctx.service.department.updateData(body);
      sucMsg = '更新成功';
    } else {
      result = await ctx.service.department.insertData({
        name: body.name,
        parent_id: body.parent_id,
        depth: body.depth,
      });
      sucMsg = '添加成功';
    }
    if (result) {
      this.fail(result);
    } else {
      this.success(sucMsg);
    }
  }
  // 部门信息删除操作
  async del() {
    const ctx = this.ctx;
    const result = await ctx.service.department.deleteById(ctx.request.body.id);
    if (result) {
      this.success('删除成功');
    } else {
      this.fail('删除失败');
    }
  }
  async getUserByDepartmentId() {
    const ctx = this.ctx;
    const body = ctx.request.body;
    // 如果父级部门id为0查找他下面的所有子级部门id
    const ids = [];
    ids.push(body.id);
    if (body.parent_id === '0') {
      const childDepartment = await ctx.service.department.select('tm_department', {
        columns: 'id',
        where: { parent_id: body.id },
      });
      childDepartment.forEach(it => {
        ids.push(it.id);
      });
    }
    // 根据部门id获取用户信息
    const users = await ctx.service.user.getUserByDepartmentId(ids);
    this.success(undefined, { users });
  }
}

module.exports = DepartmentController;
