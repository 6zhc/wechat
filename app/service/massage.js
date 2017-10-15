module.exports = app => {
    class massage extends app.Service {
        
        async massage_URL() {
            let access_token = await this.ctx.service.helper.availabe_access_token();
            let url =  'https://api.weixin.qq.com/cgi-bin/message/mass/send?access_token='+access_token;
            return url;
        };
        
        async massage_post(massage_data) {
            const result = await this.ctx.curl(await this.massage_URL(), {
                method: 'POST',
            // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
                contentType: 'json',
                data:{
                    "touser":[
                        "oDRutw2jZ6KNvYwJxKVqAFG978NU",
                        "dEYuDA0239ge21"
                        ],
                    "msgtype": "text",
                    "text": { "content": "hello from boxer."},
                    "clientmsgid" : Date.now(),
                },
            });
        return result.data;
        };
    }
    return massage;
};