let fs=require("fs");
//"./json/3.json" 没有这个文件.会自动创建一个"./json/3.json"文件
fs.writeFileSync("./data/3.json",'[{"name":"zf"}]',"utf-8");

//{"name":"mm"}
//先读取出来再拼接上,最后再写入
fs.readFile("./data/3.json","utf-8",(e,val)=>{
    //val 是一个JSON字符串,转为JSON对象
    val=JSON.parse(val);
    val.push({"name":"mm"});
    //写入的内容必须是字符串
    fs.writeFile("./data/3.json",JSON.stringify(val),"utf-8",()=>{});
});