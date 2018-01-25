/*
* 资源文件: get方式请求
* 数据请求: get
*         post
* */
let http=require("http"),
    url=require("url"),
    fs=require("fs");
http.createServer((req,res)=>{
    let {pathname}=url.parse(req.url);
    let result={
        message:"error",
        code:0,
        data:[],
    };
    if(pathname=="/"){
        fs.readFile("./list.html","utf-8",(e,val)=>{
            res.end(val);
        });
        return;
    };
    if(/\.[a-zA-Z0-9]+/i.test(pathname)){
        try {
            fs.readFile("."+pathname,(e,val)=>{
                res.end(val)
            })
        }catch(e){
            res.end("not fond")
        }
        return;
    };
    //api
    if(pathname=="/userInfo"){
        let data="";
        req.on("data",(chunk)=>{
            //数据在传递过程中触发的函数
            data+=chunk;
        });
        req.on("end",()=>{
            console.log(data);
            //数据传完了触发的函数
            //user=qq&pw=12345678&url=www.baidu.com
            data=eval("({"+data.replace(/&/g,"',").replace(/=/g,":'")+"'})");
            //{ user: 'qq', pw: '12345678', url: 'www.baidu.com' }
            //将得到的对象写入到userList.json
            //先读取出原来的数据变成JSON对象
            let arr=JSON.parse(fs.readFileSync("./data/userList.json","utf-8"));
            //将新的数据push到arr
            arr.push(data);
            //将新的数据写入进去
            fs.writeFileSync("./data/userList.json",JSON.stringify(arr),"utf-8");
            result={
                message:"success",
                code:1,
                data:[],
            };
            //返回的数据必须是字符串
            res.end(JSON.stringify(result));
        });
    }
}).listen(888,()=>{
    console.log("success");
});