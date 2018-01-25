let http=require("http");
let url=require("url");
let fs=require("fs");
/*
http.createServer((req,res)=>{
    //req.url 客户端请求的地址
    //根据地址获取请求的文件路径
    let {pathname}=url.parse(req.url);
    //根据当前pathname去读取出文件
    //"/index.html" "/list.html"
    let result=fs.readFileSync("."+pathname,"utf-8");
    //将读取的内容返回给客户端
    //res.end(返回的内容必须是字符串)
    res.end(result);
}).listen(4567,()=>{
    console.log("OK");
});
*/

//favicon.ico  这个东西是浏览器默认请求的内容但是不是你想操作的,我们后台页面处理,就会报错,为了防止这样情况的发生我们可以在后台捕获异常信息,阻止一下即可

http.createServer((req,res)=>{
    //req.url 客户端请求的地址
    //根据地址获取请求的文件路径
    let {pathname}=url.parse(req.url);
    try {
        //根据当前pathname去读取出文件
        //"/index.html" "/list.html"
        let result=fs.readFileSync("."+pathname,"utf-8");
        //将读取的内容返回给客户端
        //res.end(返回的内容必须是字符串)
        res.end(result);
    }catch (e){
        res.end("I'm sorry");
    }
}).listen(4567,()=>{
    console.log("OK");
});