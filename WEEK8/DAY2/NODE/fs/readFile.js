let fs=require("fs");
//同步读取
let text1=fs.readFileSync("./data/1.txt","utf-8");
console.log(text1);

let  pro=new Promise((resolve,reject)=>{
    //异步读取
    fs.readFile("./data/2.json","utf-8",(error,value)=>{
        resolve(value);
    });
});
pro.then((val)=>{
    console.log(val);
    //'[{"name":"zhufeng"},{"name":"china"}]'
    //读取的内容是JSON字符串
},(e)=>{
    console.log(e);
});