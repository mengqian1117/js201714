/*
* 从地址栏中输入一个网址,会发送请求,服务器会返回相应的页面(是一串字符串)接下来浏览器开始解析字符串变成html页面,当页面渲染时候遇到link标签,会再一次向服务器发送请求,请求css,服务器收到请求会响应给你返回css 文件,浏览继续渲染,同样遇到script的src也会发,请求请求js文件,除了这些还有,图片img的src,音频视频等....都会发送请求
*
*注意如果请求的时候图片,读取文件的时候不需要加utf-8
*
* .html  .js  .css读取的时候需要加上utf-8
* */
const http=require("http"),
      url=require("url"),
      fs=require("fs");
http.createServer((req,res)=>{
    let {pathname}=url.parse(req.url);
    let result=null;
    if(pathname=='/'){
        result=fs.readFileSync("./index.html","utf-8");
    }else {
        try {
            //如果后缀名是.html  .js   .css  读取的时候加上utf-8
            if(/\.(html|js|css)$/i.test(pathname)){
                result=fs.readFileSync("."+pathname,"utf-8");
            }else {
                result=fs.readFileSync("."+pathname);
            }
        }catch (e){
            result="not found"
        }
    }
    res.end(result);
}).listen(678);
