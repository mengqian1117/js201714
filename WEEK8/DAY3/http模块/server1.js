let http=require("http");
//每创建一个服务就需要给他分配一个端口号
let server1=http.createServer((request,response)=>{
    //这个函数会执行很多次,只要你访问端口666,就会触发这个函数
    //给这个函数默认传了2个参数
    //request:是客户端请求服务器发送的全部信息 例如 request.url就是客户端穿过来的url地址
    //response:是服务器向客户端返回数据的一个对象,里面存储了很多方法
    console.log(1);
});
server1.listen(666,()=>{

});

