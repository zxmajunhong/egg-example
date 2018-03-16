'use strict';
/**
 * 考勤列表模型
 */

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const AttenceSchema = new Schema({
    name: { type: String }, // 姓名
    number: { type: Number }, // 工号
    department: { type: String }, // 部门

    month: { type: String }, // 月份

    list: [ // 打开日期列表
      {
        _id: false, // 子文档不生成 _id
        date: { type: String }, // 具体日期
        start: { type: String }, // 签到打卡
        end: { type: String }, // 签退打卡
        status: { type: Number }, // 当前状态 (0默认值, 1迟到，2加班，3未打卡，4旷工)
      },
    ],
  });
  AttenceSchema.index({ month: 1, name: 1 });
  AttenceSchema.index({ month: 1, number: 1 });
  AttenceSchema.index({ month: 1, department: 1 });
  AttenceSchema.index({ create_at: -1 });

  return mongoose.model('Attence', AttenceSchema);
};
