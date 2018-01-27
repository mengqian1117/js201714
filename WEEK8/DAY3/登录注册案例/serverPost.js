const http=require("http");
const url=require("url");
const fs=require("fs");
http.createServer((req,res)=>{
    let {pathname,query}=url.parse(req.url);
    let  result={
        massage:"error",
        code:0,
        data:[],
    };
    if(pathname=="/"){
        fs.readFile("./login.html","utf-8",(e,val)=>{
            res.end(val)
        });
        return;
    }
    if(/\.[0-9a-zA-Z]+/i.test(pathname)){
        try{
            fs.readFile("."+pathname,"utf-8",(e,val)=>{
                res.end(val)
            })
        }catch(e){
            res.end("no fond")
        }
        return;
    }
    if(pathname=="/addUser"){
        let data="";
        req.on("data",(chunk)=>{
            data+=chunk;
        });
        req.on("end",()=>{
            data=eval("({"+data.replace(/&/g,"',").replace(/=/g,":'")+"'})");

            fs.readFile("./data/userList.json","utf-8",(e,val)=>{
                val= JSON.parse(val);
                val.push(data);
                fs.writeFileSync("./data/userList.json",JSON.stringify(val),"utf-8");
                result={
                    massage:"ok",
                    code:1,
                    data:[],
                };
                res.end(JSON.stringify(result))
            })
        })

    }

}).listen(7773,()=>{
    console.log("OK");
});





