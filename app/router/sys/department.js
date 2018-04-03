'use strict';
/**
 * 部门管理相关路由地址
 */

module.exports = app => {
  const departmentController = app.controller.sys.department;

  // 部门管理列表
  app.router.get('/department', departmentController.index);

  // 部门信息编辑页面
  app.router.get('/department/input', departmentController.input);

  // 部门信息编辑提交
  app.router.post('/department/input', departmentController.save);

  // 删除部门信息
  app.router.post('/department/del', departmentController.del);

  // 根据部门id获取用户信息
  app.router.post('/department/getUser', departmentController.getUserByDepartmentId);
};
