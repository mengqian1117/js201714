//fs是node内置模块 处理文件写入和读取
//内置模块 需要require导入进来
//内置模块导入的时候直接写模块的名字即可
let fs=require("fs");
/*
* 读取文件内容
* fs.readFile :异步读取文件内容,不管读取是否完成后面的代码不受影响继续执行
* fs.readFileSync:同步读取文件内容,只有读取完成之后才会进行后面的操作
*
* fs.readFileSync("pathName路径(必填)",编码格式"utf-8"(选填))
* fs.readFile("pathName路径(必填)",编码格式"utf-8"(选填),(error,value)=>{})
*
*
* 写入文件内容
* fs.writeFile("路径","内容","编码",callback回调函数):异步写入
* fs.writeFileSync("路径","内容","编码"):同步写入
* 写入文件内容相当于重写文件内容,之前的就没有了
*
* 读文件夹(目录)
* 读取的文件夹的名字
* fs.readdir("路径",(error,value)=>{
*    value是一个数组,["文件的名字","文件的名字"....]
* })
* fs.readdirSync("路径");
* 返回一个数组[]
*
* */