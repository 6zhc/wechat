module.exports = app => {
    class customservice extends app.Service {
        async customservice_URL() {
            let access_token = await this.ctx.service.helper.availabe_access_token();
            let url =  'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token='+access_token;
            return url;
        };
        
        async customservice_post(data) {
            const result = await this.ctx.curl(await this.customservice_URL(), {
                method: 'POST',
            // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
                contentType: 'json',
                data: {
                       "touser":"oDRutw2jZ6KNvYwJxKVqAFG978NU",
                        "msgtype":"text",
                        "text":
                        {
                             "content":"Hello World"
                        }
                },
            });
        return result.data;
        };
       
    }
    return customservice;
};