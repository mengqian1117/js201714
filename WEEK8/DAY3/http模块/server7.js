//get请求的参数问题
//只要是url请求(地址栏输入地址)肯定是get请求
let http=require("http");
let url=require("url");
let fs=require("fs");
http.createServer((req,res)=>{
    //http://localhost:444/getName?name=a
    let {pathname,query}=url.parse(req.url,true);
    try {
        if(pathname=="/getName"){
            //读取出所有的数据
            let arr=JSON.parse(fs.readFileSync("./data/name.json","utf-8"));
            //在数组arr中查找name属性是query.name
            let result=arr.find((item)=>{
                return item.name==query.name;
            });
            res.end(JSON.stringify(result));
        }
    }catch (e){
        res.end("not found")
    }
}).listen(444,()=>{
    console.log("444 OK");
});