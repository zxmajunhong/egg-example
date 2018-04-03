'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1521012053035_3112';

  // add your config here
  config.middleware = [];

  // 配置模版引擎
  config.view = {
    defaultViewEngine: 'nunjucks', // 配置当前项目默认都是用nunjucks引擎
    defaultExtension: '.njs', // 配置在渲染模版时默认查找的文件后缀名是.nj
  };

  // 配置mongodb
  config.mongoose = {
    client: {
      url: 'mongodb://192.168.11.13:27017/tm-oa-dev',
      options: {},
    },
  };

  // 配置mysql连接信息
  config.mysql = {
    client: {
      host: '192.168.11.13',
      port: '3306',
      user: 'root',
      password: '123456',
      database: 'tm_oa',
    },
    app: true, // 是否加载到app上，默认开启。开启后可以通过app.mysql.query(sql, values) 直接执行sql语句
  };

  // 增加对.xls的excel文件上传支持
  config.multipart = {
    fileExtensions: [ '.xls', '.ppt', '.txt' ],
  };

  // 关闭csrf安全验证
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // 配置中间件
  config.middleware = [ 'auth' ];
  config.auth = {
    ignore(ctx) {
      // 静态资源目录的访问/public 和post请求不做登录判断
      // 考勤列表和视频分享列表不做判断
      return /^\/(public|attence$|share$)/.test(ctx.url) || ctx.method === 'POST';
    },
  };

  return config;
};
