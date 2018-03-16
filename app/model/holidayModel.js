'use strict';
/**
 * 假期模型
 */

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const HolidaySchema = new Schema({
    date: { type: Date }, // 日期
    state: { type: Number }, // 状态 0.工作 1.假期
    // department: { type: String }, // 部门
  });
  HolidaySchema.index({ date: 1 }, { unique: true });

  return mongoose.model('Holiday', HolidaySchema);
};
