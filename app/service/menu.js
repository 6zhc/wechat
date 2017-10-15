module.exports = app => {
    class menu extends app.Service {
        
        async menu_URL() {
            let access_token = await this.ctx.service.helper.availabe_access_token();
            let url =  'https://api.weixin.qq.com/cgi-bin/menu/create?access_token='+access_token;
            return url;
        };
        
        async menu_post(ctx) {
            const result = await this.ctx.curl(await this.menu_URL(), {
                method: 'POST',
            // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
                contentType: 'json',
                data: {
                    "button":[
                    {	
                        "type":"view",
                        "name":"百度",
                         "url":"http://www.baidu.com/"
                    },
                    {	
                        "type":"view",
                        "name":"西安交大",
                         "url":"http://www.xjtu.edu.cn/"
                    },
                    {
                        "name":"菜单",
                        "sub_button":[{	
                        "type":"view",
                        "name":"搜索",
                        "url":"http://www.soso.com/"
                        },],
                    },]   
                },
            });
        return result.data;
        };
    }
    return menu;
};