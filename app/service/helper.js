module.exports = app => {
    class helper extends app.Service {
        async time() {
            let MyTime  = new Date();
            MyTime = MyTime.toLocaleString();
            return MyTime;
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
         
        async availabe_access_token() {
        let ans = await app.mysql.get('token', {
             id: 1,
        });
        let time = ans.date_time;
        //let moment = require('moment');
        //time = moment(time).format('YYYY-MM-DD HH:mm:ss');
        let now = new Date();
        let using_time =(now.getTime()-time.getTime())/1000;
        if(using_time>=ans.expires_in)
        {
            let temp = await this.get_access_token();
            const row = {
                id: 1,
                access_token : temp.access_token,
                expires_in : temp.expires_in,
                date_time : this.app.mysql.literals.now,
            };
            let result = await this.app.mysql.update('token', row);
            ans = await app.mysql.get('token', {
                id: 1,
            });
        }
        return await ans.access_token ;
    }
    
    }
    return helper;
};