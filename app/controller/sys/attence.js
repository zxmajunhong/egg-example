'use strict';
/**
 * 考勤相关的控制器
 */

const Controller = require('../../core/base_controller');

// 部门
const departments = [
  { name: '财务部', icon: 'caiwubu' },
  { name: '人力行政部', icon: 'renlihangzhengbu' },
  { name: '商务部', icon: 'shangwubu' },
  { name: '商务推广部', icon: 'shangwubu' },
  { name: '销售部', icon: 'xiaoshoubu' },
  {
    name: '研发部',
    icon: 'yanfabu',
    children: ['前端部', '后端部', '运维部', '移动端', '游戏开发'],
  },
  { name: '用户体验部', icon: 'yonghutiyanbu' },
  { name: '运营部', icon: 'yunyingbu' },
  { name: '产品部', icon: 'chanpinbu' },
  { name: '电商部', icon: 'dianshangyunyingbu' },
];

// 更改存入cookie中的user值为base转码后的值，保证之前没转码之前的值能够正确取到
function getCookieUser(ctx) {
  if (!ctx.cookies.get('user')) {
    return '';
  }
  const a = Buffer.from(ctx.cookies.get('user'), 'base64').toString();
  const b = Buffer.from(a, 'utf8').toString('base64');
  if (ctx.cookies.get('user') === b) {
    return a;
  }
  return ctx.cookies.get('user');
}

class AttenceController extends Controller {
  // 首页列表展示
  async index() {
    const { query } = this.ctx;

    const conditions = {}; // 查询条件
    const dt = new Date(); // 当前日期
    dt.setDate(1);

    const hasQuery = Object.keys(query).length > 0; // 是否有查询参数
    const hasQueryDate = !!query.date; // 是否有查询日期
    const queryDate = hasQueryDate ? new Date(query.date) : dt; // 查询日期

    // 部门
    if (query.deparment) {
      // 研发部搜索前端、后端、运维、移动、游戏开发
      if (query.deparment === '研发部') {
        conditions.deparment = { $in: [ '前端部', '后端部', '运维部', '移动端', '游戏开发' ] };
      } else {
        conditions.deparment = query.deparment;
      }
    } else {
      // 部门、用户 互斥，只能是一个条件 从cookie中取得user值经base64转换后输出
      query.user = query.user || getCookieUser(this.ctx);
      // 工号或名字
      if (query.user) {
        if (/^\d+$/.test(query.user)) {
          conditions.number = query.user;
        } else {
          conditions.name = query.user;
        }
        // koa中cookie的值不能设置为中文字符 将中文user值转换为base64存入cookie中
        this.ctx.cookies.set('user', Buffer.from(query.user, 'utf8').toString('base64'), { maxAge: 365 * 24 * 60 * 60 * 1000 }); // 1年
      }
    }

    // 日期
    if (query.date) {
      conditions.month = query.date.replace(/-0/g, '-'); // '2017-9' 查询用格式
    } else {
      conditions.month = `${dt.getFullYear()}-${dt.getMonth() + 1}`;
      query.date = conditions.month.replace(/\b\d\b/g, '0$&'); // 补零
    }

    console.log('model', this.ctx.model);
    // 考勤数据
    const list = await this.ctx.model.Attence.find(conditions, { _id: 0 }).sort({ number: 1 });

    // 如果没有数据，就跳到上一个月
    if (list.length === 0 && (!hasQuery || (!hasQueryDate && query.user))) {
      // 如果是一月份那么跳到上一年的12月份
      if (dt.getMonth() === 0) {
        return this.app.router.redirect(`/attence?date=${dt.getFullYear() - 1}-12`);
      }
      return this.app.router.redirect(`/attence?date=${dt.getFullYear()}-${dt.getMonth()}`);
    }

    // 本月所有假期数据
    const holidays = {};

    const res = await this.ctx.model('Holiday').find({
      date: {
        $gte: new Date(queryDate.getFullYear(), queryDate.getMonth(), 1),
        $lt: new Date(queryDate.getFullYear(), queryDate.getMonth() + 1, 1),
      },
    }, { _id: 0, date: 1, state: 1 });

    // 假期数据整理
    res.forEach(it => {
      holidays[new Date(it.date).getDate()] = it.state;
    });

    await this.ctx.render('/attence/list', {
      title: '考勤列表',
      dt, // 当前时间日期对象
      query, // 请求对象
      queryDate, // 当前请求参数中的日期对象
      departments, // 部门列表
      list, // 结果列表
      holidays: JSON.stringify(holidays), // 假期信息
      dataList: JSON.stringify(list),
    });
  }
}

module.exports = AttenceController;
