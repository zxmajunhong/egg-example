'use strict';
/**
 * 内部分享相关控制器
 */

const path = require('path');
const fs = require('fs');
const sendToWormhole = require('stream-wormhole');
const Controller = require('../../core/baseController');

class ShareController extends Controller {
  // 随机名字
  randomized() {
    const newName = Date.now().toString(36) + Math.random().toString(36).substring(7);
    return newName;
  }
  // 内部分享信息的首页展示
  async index() {
    const ctx = this.ctx;
    const list = await ctx.model.ShareModel.find().sort({ date: 1 });
    await ctx.render('share/list', {
      title: '拓美内部分享',
      list,
      user: (ctx.session.user && ctx.session.user.user_name) || '',
    });
  }
  // 显示新增记录或者修改记录的页面
  async input() {
    const ctx = this.ctx;
    const id = ctx.query.id;
    const data = await ctx.model.ShareModel.find({ _id: id });

    await ctx.render('share/input', {
      title: '分享信息录入或修改',
      id,
      data: data[0],
    });
  }
  // 保存或者修改分享信息
  async save() {
    const { ctx, config } = this;
    // { autoFields: true } 可以将除了文件的其它字段提取到parts的filed中，
    const parts = ctx.multipart({ autoFields: true });
    const files = [];
    let stream;
    // 保存文件操作。
    try {
      while ((stream = await parts()) != null) {
        // 当有文件的时候会进入到这个循环中
        let filename = stream.filename;
        filename = this.randomized() + filename.substr(filename.indexOf('.'));
        let pptUrl = '';
        try {
          pptUrl = JSON.parse(parts.field.inputData).pptUrl;
        } catch (err) {
          console.log(err);
        }
        // 判断是新增还是编辑
        let target;
        if (parts.field.optType === 'update' && pptUrl) {
          // 如果是编辑并且之前存储过文件 存储的文件地址格式为 '/public/upload/share/xxxx.ppt'
          target = path.join(config.baseDir, `app${pptUrl}`);
        } else {
          target = path.join(config.baseDir, 'app/public/upload/share/', filename);
          pptUrl = `/public/upload/share/${filename}`;
        }
        if (!fs.existsSync(target)) {
          // 文件不存在写于一个空文件
          fs.writeFileSync(target);
        }
        // 生成写入流
        const writeStream = fs.createWriteStream(target);
        try {
          stream.pipe(writeStream);
        } catch (err) {
          await sendToWormhole(stream);
          throw err;
        }
        files.push(pptUrl);
      }
    } catch (err) {
      return this.fail(err.message);
    }

    const inputData = JSON.parse(parts.field.inputData);

    if (files.length > 0) {
      inputData.ppt = files[0];
    }
    // 判断修改还是新增
    try {
      if (parts.field.optType === 'update') {
        await ctx.model.ShareModel.findOneAndUpdate({ _id: inputData.id }, { $set: inputData });
        this.success('修改成功');
      } else {
        await ctx.model.ShareModel.create(inputData);
        this.success('新增成功');
      }
    } catch (err) {
      this.fail(err.message);
    }
  }
  // 删除操作
  async remove() {
    const { ctx, config } = this;
    try {
      const result = await ctx.model.ShareModel.findOneAndRemove({ _id: ctx.request.body.id });
      console.log('result', result);
      if (result) {
        // 判断该记录下是否有ppt文件，有需要删除
        console.log('path', result.ppt);
        if (result.ppt) {
          fs.unlinkSync(path.join(config.baseDir, `app${result.ppt}`));
        }
        this.success('删除成功');
      } else {
        this.fail('删除失败');
      }
    } catch (err) {
      console.log('分享删除', err);
      this.fail('删除失败');
    }
  }
}

module.exports = ShareController;
