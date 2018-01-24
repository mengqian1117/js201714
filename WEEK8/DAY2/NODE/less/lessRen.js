let less = require("less");
let fs = require("fs");

//获取css 目录下后缀名是.less的所有文件

//读取css 目录下的所有文件得到一个数组
let arr=[];
fs.readdir("./css",(e,val)=>{
    //[ 'css1.css', 'less1.less', 'less2.less' ]
    //将后缀不是.less 过滤掉
    arr=val.filter((item)=>{
        return /\.less$/i.test(item);
    });
    //console.log(arr);//[ 'less1.less', 'less2.less' ]

    //遍历数组去读取每一个less 文件
    arr.forEach((item)=>{
        fs.readFile("./css/"+item,"utf-8",(e,res)=>{
            //res 就是每一个less 文件中的内容是一个字符串
            less.render(res,{compress: true},(e,value)=>{
                //value.css 编译后的css内容 是一个字符串
                //我们需要将编译好的css内容放在一个后缀是.css 的文件中,让他们文件的名字一致即可
                fs.writeFileSync("./css1/"+item.split(".")[0]+".min.css",value.css,"utf-8");
            })
        })
    })

});
