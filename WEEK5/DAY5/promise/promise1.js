//new Promise(executer) executer:执行器 函数
//executer(resolve,reject)
// 初始状态:pending
// resolve 函数   pending-->resolved
// reject 函数    pending-->rejected
let pro1=new Promise((resolve,reject)=>{
    //resolve,reject 只会执行一个
    reject("培训");
    resolve("珠峰");
    //如果这里代码出错了,直接执行reject
    //throw new Error("sorry");

});
pro1.then((data)=>{
    console.log(data);
},(e)=>{
    //将错误信息传给参数e
    console.log("rejected",e);
});