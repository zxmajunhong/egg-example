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
      url: 'mongodb://192.168.11.13:27017/tm-oa',
      options: {},
    },
  };

  return config;
};
