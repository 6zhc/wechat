'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    
    async index() {
      this.ctx.body = await this.ctx.service.helper.time();
    }
    
     async test() {
       let result = await this.ctx.service.massage.massage_post();
      this.ctx.body = `${result}`;
      
       /*
      let url ='https://api.weixin.qq.com/cgi-bin/helper/info?access_token=' + await this.ctx.service.helper.availabe_access_token()+ '&openid='+'oDRutw9RozDns_Q5bK32gOwvB6Ig'+'&lang=zh_CN';
      let result = await this.ctx.curl(url,{"content-type":"application/json"});
      this.ctx.body = await JSON.parse(`${result.data}`);
      */
    }
    
    async access_token() {
      let result = await this.ctx.service.helper.availabe_access_token();
      this.ctx.body = result;
    }
    
    async menu() {
      let result = await this.ctx.service.menu.menu_post();
      this.ctx.body = `${result}`;
    }
    async kf() {
      let result = await this.ctx.service.customservice.customservice_post();
      this.ctx.body = `${result}`;
    }
    
    async match() {
      let data = await this.ctx.query;
      if (data.signature==null)
          this.ctx.body = "hello, this is test view";
      else {
        if(await this.ctx.service.signature.checkSignature(data))
          this.ctx.body = data.echostr;
        else 
          this.ctx.body = 'mismatch';
      }  
    }
    
     async post() {
      let getRawBody = require('raw-body');
      let data = await getRawBody(this.ctx.req);
      let info = await this.ctx.service.helper.xml2json(data);
      this.ctx.body = await this.ctx.service.helper.json2xml({
        'xml': await this.ctx.service.reply.re(info)
      });


    }
    
    
    
  }
  return HomeController;
};
