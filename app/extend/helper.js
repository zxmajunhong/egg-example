'use strict';
/**
 * 框架的helper扩展
 * 该文件下面的方法都会合并到框架内痔的helper上
 */

module.exports = {
  formateDate(dateStr = new Date(), fmt = 'yyyy-MM-dd') {
    if (dateStr) {
      dateStr = new Date(dateStr);
    }
    /* eslint quote-props: ['error', 'always']*/
    const o = {
      'M+': dateStr.getMonth() + 1, // 月份
      'd+': dateStr.getDate(), // 日
      'h+': dateStr.getHours(), // 小时
      'm+': dateStr.getMinutes(), // 分
      's+': dateStr.getSeconds(), // 秒
      'S': dateStr.getMilliseconds(), // 毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (dateStr.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
    }
    return fmt;
  },
};
