'use strict';
/**
 * 内部分享数据模型
 */

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ShareSchema = new Schema({
    name: { type: String }, // 视频名字
    date: { type: Date }, // 演讲时间
    address: { type: String }, // 视频地址
    author: {
      name: { type: String }, // 演讲者
      department: { type: String }, // 部门
      post: { type: String }, // 职位
    },
    description: { type: String }, // 详细描述
    ppt: { type: String },
  });

  ShareSchema.index({ author: 1 });

  return mongoose.model('Share', ShareSchema);
};
