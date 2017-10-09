module.exports = app => {
    class user extends app.Service {
        async time() {
            let MyTime  = new Date();
            MyTime = MyTime.toLocaleString();
            return MyTime;
        }
        
        async checksign(data){
            let signature = data.signature;
            let timestamp = data.timestamp;
            let nonce = data.nonce;
            let echostr = data.echostr;
            let token = this.config.wechat.token;
            //1.将token、timestamp、nonce三个参数进行字典序排序
            let array = [ token,timestamp,nonce];
             array.sort();

            //2.将三个参数字符串拼接成一个字符串进行sha1加密

            let sha1 = require('sha1');
            let resultCode = sha1(array.join(''));
  
             //3.开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
            if(resultCode === signature){
                return 1;}
            else{
                return 0;}
        }
        
        async xml2json(xml){
          let ans
          let parseString = require('xml2js').parseString;
          parseString(xml, { explicitArray : false ,trim: true,},function (err, result) {
          if(err)  ans=err;
            else ans = result.xml;
          });
          return ans;
        }
        
        async json2xml(obj){
          const xml2js = require('xml2js');
          let builder = new xml2js.Builder( {headless : true});
          return builder.buildObject(obj);
        }
        
        async access_token_URL() {
            let url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+
            this.config.wechat.appID+'&secret='+ this.config.wechat.appSecret;
            return url;
        }
        
        async get_access_token() {
            let url =await this.access_token_URL();
            let info=await this.ctx.curl(url,{"content-type":"application/json"});
            let string  =await `${info.data}`;
            return await JSON.parse(string);
        }
        //  
    
    }
    return user;
};