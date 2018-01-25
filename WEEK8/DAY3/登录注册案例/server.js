const http=require("http"),
    url=require("url"),
    fs=require("fs");
http.createServer((req,res)=>{
    let {pathname,query}=url.parse(req.url);
    let result={
        message:"error",
        code:0,
        data:[]
    };
    if(pathname=="/"){
        //默认返回登录页
        fs.readFile("./login.html","utf-8",(e,val)=>{
            res.end(val);
        });
        return;
    }
    if(/\.[a-zA-Z0-9]+/i.test(pathname)){
        try {
            fs.readFile("."+pathname,"utf-8",(e,val)=>{
                res.end(val);
            })
        }catch (e){
            res.end("not fond");
        }
        return;
    };
    //api
    if(pathname=="/addUser"){
        let data="";
        req.on("data",(chunk)=>{
            data+=chunk;
        });
        req.on("end",()=>{
            data=eval("({"+data.replace(/&/g,"',").replace(/=/g,":'")+"'})");
            fs.readFile("./data/userList.json","utf-8",(e,val)=>{
                val=JSON.parse(val);
                val.push(data);
                fs.writeFileSync("./data/userList.json",JSON.stringify(val),"utf-8");
                result={
                    message:'OK',
                    code:1,
                    data:[],
                };
                res.end(JSON.stringify(result));
            })
        });
    }

}).listen(777,()=>{
    console.log("OK");
});