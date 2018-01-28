/*
ajax({
   url:"请求路径",
   type:"请求方式 type和method 一样使用",
   dataType:"返回数据的类型 默认是text",
   cache:"是否走缓存",
   data:"请求的参数,如果是get请求,会将这里的内容拼接到url",
   async:是否异步,
   success:成功的回调,
   error:失败的时候的回调,
   complete:不管成功失败都会触发的函数
})

支持的参数
url,
method/type,
data,
dataType,
async,
cache,
success
*/

~function () {
    class Ajax{
        init(){
            let  xhr=new XMLHttpRequest();
            xhr.onreadystatechange= () =>{
                if(!/^[23]\d{2}$/i.test(xhr.status))return;
                if(xhr.readyState==4){
                    let result=xhr.responseText;
                    //对参数dataType
                    try {
                        switch (this.dataType.toUpperCase()){
                            case "TEXT":
                                break;
                            case "HTML":
                                break;
                            case "JSON":
                                result=JSON.parse(result);
                                break;
                            case "XML":
                                result=xhr.responseXML;
                                break;
                        }
                    }catch (e){
                        console.log(e);
                    }
                    this.success(result);
                }
            };
            //处理data
            if(this.data!==null){
                this.query();
                if(this.isGet){
                    //get请求需要将数据data拼接到url上
                    this.url+=this.queryBefore()+this.data;
                    //this.data没有用了就清空了
                    this.data=null;
                }
            }
            //cache处理 只有get请求才有必要处理缓存
            this.isGet?this.cacheFn():null;
            xhr.open(this.method,this.url,this.async);

            xhr.send(this.data);
        }
        query(){
            //判断data必须是一个对象的时候去讲其变成字符串
            if(this.data&&this.data.toString()=="[object Object]"){
                let str=``;
                for (let key in this.data){
                    if(this.data.hasOwnProperty(key)){
                        str+=`${key}=${this.data[key]}&`;
                    }
                }
                //后面多一个&符号
                str=str.replace(/&$/g,"");
                this.data=str;
            }
        }
        queryBefore(){
            //判断url有没有?
            return this.url.includes("?")?"&":"?";
        }
        cacheFn(){
            //判断this.cache是true还是false 只有false时候才处理缓存,加一个时间戳
            !this.cache?this.url+=`${this.queryBefore()}_t=${(new Date).getTime()}`:null;
        }
    }
    window.ajax=function ({
                              url=null,
                              method="GET",
                              type=null,
                              data=null,
                              dataType="JSON",
                              async=true,
                              cache=true,
                              success=null,
                          } = {}) {
        let _this=new Ajax();
        ["url","method","data","dataType","async","cache","success"].forEach((item)=>{
            if(item=="method"){
                _this.method=type==null?method:type;
                return;
            }
            if(item=="success"){
                _this.success=typeof success=="function"?success:new Function();
                return;
            }
            _this.isGet=/^GET|DELETE|HEAD$/i.test(_this.method);
            _this[item]=eval(item);
        });
        _this.init();
        return _this;
    }
}();

