module.exports = app => {
    class user extends app.Service {
        async get_user_info_URL(openid) {
            let access_token = await this.ctx.service.user.availabe_access_token();
            let url ='https://api.weixin.qq.com/cgi-bin/helper/info?access_token=' + access_token+ '&openid='+openid+'&lang=zh_CN';
            return url;
        };
        
        async get_user_info(openid)
        {
            let result = await this.ctx.curl(this.get_user_info_URL,{"content-type":"application/json"});
            return await JSON.parse(`${result.data}`);
        }
        
        async add_user(data)
        {
            return ;
        }
       
    }
    return user;
};