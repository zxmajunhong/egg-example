'use strict';
/**
 * 考勤相关路由地址
 */

module.exports = app => {
  const attenceController = app.controller.sys.attence;
  // 考勤列表页面
  app.router.get('/attence', attenceController.index);

  // 考勤设置页面
  app.router.get('/attence/setting', attenceController.setting);

  // 考勤上传接口
  app.router.post('/attence/upload', attenceController.upload);

  // 考勤删除指定人员记录
  app.router.post('/attence/delUserRecord', attenceController.delRecord);
};
