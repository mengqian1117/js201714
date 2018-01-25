let http=require("http"),
    url=require("url"),
    fs=require("fs");
http.createServer((req,res)=>{
    let {pathname}=url.parse(req.url);
    console.log(pathname);
    let result=null;
    try {
        //如果没有文件的路径默认返回index.html,也就是说pathname=/时候也返回index.html
        if(pathname=="/"){
            result=fs.readFileSync("./index.html","utf-8");
        }else {
            result=fs.readFileSync("."+pathname,"utf-8");
        }
    }catch (e){
        result="not fond";
    }
    res.end(result);
}).listen(4567);