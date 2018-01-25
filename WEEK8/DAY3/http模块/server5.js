/*
* 页面请求有两种方式
* 1.真实文件路径 请求资源文件,html,.css,.js,img,.....
* 2.伪地址  请求数据 基本上是ajax请求
* /aa
* */

const http=require("http"),
    url=require("url"),
    fs=require("fs");
http.createServer((req,res)=>{
    let {pathname}=url.parse(req.url);
    let result=null;
    if(pathname=='/'){
        result=fs.readFileSync("./index.html","utf-8");
        res.end(result);
        return;
    }
    //只要是pathname以.xxx作为结尾就是有后缀的
    if(/\.[a-zA-Z0-9]+/i.test(pathname)){
        //如果pathname有后缀说明请求的是资源文件
        try {
            if(/\.(html|js|css)$/i.test(pathname)){
                result=fs.readFileSync("."+pathname,"utf-8");
            }else {
                result=fs.readFileSync("."+pathname);
            }
        }catch (e){
            result="not found"
        }
        res.end(result);
        return;
    }
    //没有后缀说明是ajax发的数据请求
    if(pathname=="/dataList"){
        //读取dataList.json文件内容
        result=fs.readFileSync("./data/dataList.json","utf-8");
        res.end(result);
        return;
    }


}).listen(678);
