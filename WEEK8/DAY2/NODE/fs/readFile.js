let fs=require("fs");
//同步读取
let text1=fs.readFileSync("./data/1.txt","utf-8");
console.log(text1);

//异步读取
fs.readFile("./data/2.json","utf-8",(error,value)=>{
    console.log(error);//null
    console.log(typeof value);
    //'[{"name":"zhufeng"},{"name":"china"}]'
    //读取的内容是JSON字符串
});