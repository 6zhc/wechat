module.exports = app => {
    class signature extends app.Service {
        
        async checkSignature(data){
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
       
    }
    return signature;
};