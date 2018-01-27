const http=require("http"),
    url=require("url"),
    fs=require("fs");
http.createServer((request,response)=>{
    let {pathname,query}=url.parse(request.url,true);
    //处理请求的默认页面
    if(pathname=="/"){
        fs.readFile("./userList.html","utf-8",(error,value)=>{
            if(error){
                console.log(error);
                response.end("error")
            }else {
                response.end(value);
            }
        });
        return;
    };
    //处理资源文件
    let reg=/\.[a-zA-Z0-9]+$/i;
    if(reg.test(pathname)){
        fs.readFile("."+pathname,(error,value)=>{
            if (error){
                response.end("not found");
            }else {
                response.end(value);
            }
        });
        return;
    };


    let result={
        message:"error",
        code:0,
        data:[]
    };
    let allUserData=JSON.parse(fs.readFileSync("./data/userListData.json","utf-8"));
    let status=200;
    //处理API /userList
    if(pathname=="/userList"){
        //获取客户端的参数page的值
        let page=query.page||1;
        //1   0-9
        //2   10-19
        //3   20-19
        //page   (page-1)*10---(page*10-1)
        result={
            code:1,
            message:"success",
            total:allUserData.length,
            //注意slice方法不包括后面的索引所以不需要-1
            data:allUserData.slice((page-1)*10,page*10),
        };
        //重写响应头,增加一些信息
        response.writeHead(status,{
            "Content-type":"text/json;charset=utf-8"
        });
        response.end(JSON.stringify(result));
        return;
    }

    //处理 API /removeUser
    if(pathname=="/removeUser"){
        //获取客户端传过来的删除用户的ID,就是参数id的值
        let userID=query.id;
        //遍历数据库中的数据,将ID编号是userID的用户信息删除
        allUserData=allUserData.filter(item=>item.id!=userID);
        //将删除后的数组写入到数据库
        fs.writeFile("./data/userListData.json",JSON.stringify(allUserData),"utf-8",(e)=>{
            if(e){
                result={
                    message:"error",
                    code:0,
                    data:false
                } ;
                status=404;
            }else {
                result={
                    message:"success",
                    code:1,
                    data:true
                };
                status=200;
            };
            response.writeHead(status,{
                "content-type":"text/json;charset=utf-8"
            });
            response.end(JSON.stringify(result));
        })
    }

}).listen(666,()=>{
    console.log("success");
});