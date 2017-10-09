module.exports = app => {
    class reply extends app.Service {
        async re(obj)
        {
            let head={
                
            ToUserName   : obj.FromUserName,
            FromUserName : obj.ToUserName,
            CreateTime   : obj.CreateTime,
            }
            switch(obj.MsgType) {
                case 'text':
                    return await this.text(obj,head);
                  //break;
                case 'image':
                    return await this.image(obj,head);
                  break;
                case 'voice':
                    return await this.text(obj,head);
                  break;
                case 'video':
                    return await this.text(obj,head);
                 break;
                case 'music':
                    return await this.text(obj,head);
                    break;
                case 'news':
                    return await this.text(obj,head);
                    break;
                default:
                    return await this.text(obj,head);
            }
            return null;
        }
        
        async text(info,out)
        {
            out['MsgType'] = 'text';
            out['Content'] = 'nihao';
            return out;
        }
        
        async image(info,out)
        {
            out['MsgType'] = 'image';
            out['Image'] = {MediaId : info.MediaId} ;
            return out;
        }
        
        
    }
    return reply;
};