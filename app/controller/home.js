'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    
    async index() {
      this.ctx.body = await this.ctx.service.user.time();
    }
    
     async test() {
      this.ctx.body = await this.ctx.service.user.time();
    }
    
    async access_token() {
      let data = await this.ctx.service.user.get_access_token();
      this.ctx.body= data//.expires_in//access_token;
    }
    
    async match() {
      let data = await this.ctx.query;
      if (data.signature==null)
          this.ctx.body = "hello, this is test view";
      else {
        if(await this.ctx.service.user.checksign(data))
          this.ctx.body = data.echostr;
        else 
          this.ctx.body = 'mismatch';
      }  
    }
    
     async post() {
      let getRawBody = require('raw-body');
      let data = await getRawBody(this.ctx.req);
      let info = await this.ctx.service.user.xml2json(data);
      /*
      this.ctx.body = await this.ctx.service.user.json2xml({
          'xml':{
            ToUserName   : info.FromUserName,
            FromUserName : info.ToUserName,
            CreateTime   : info.CreateTime,
            MsgType      : info.MsgType,
            Content      : info.Content,
          }
        });
        */
      this.ctx.body = await this.ctx.service.user.json2xml({
        'xml': await this.ctx.service.reply.re(info)
      });


    }
    
    
    
  }
  return HomeController;
};
