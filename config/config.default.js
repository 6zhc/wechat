'use strict';

module.exports = appInfo => {
  const config = exports = {
    
    wechat: {
      appID: 'wx5e5bfec981c437c9',
      appSecret: '4b5a772cdc5b7efeabadd70354c2755b',
      token: 'zhc'
    }
    
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1507394268102_1435';

  // add your config here
  config.middleware = [];

  exports.security = {
   csrf: {
     enable: false,
   },
  };
  
    // config/config.${env}.js
  exports.mysql = {
    // 单数据库信息配置
    client: {
     host: 'localhost',
     port: '3306',
     user: 'root',
     password: '123',
     database: 'wechat',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
};

  return config;
};


