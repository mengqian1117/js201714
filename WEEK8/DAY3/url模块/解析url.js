let url=require("url");
let strUrl="https://ss1.baidu.com:443/6ONXsjip0QIZ8tyhnq/it/index.html?fm=58&s=1AAA7A23C4A4D9031E5D94C60000C0B1&bpow=121&bpoh=75#dd";
let obj=url.parse(strUrl);
console.log(obj);
/*
Url {
        protocol: 'https:', 传输协议
        slashes: true,   是否有斜杠
        auth: null,      作者
        host: 'ss1.baidu.com:443', 域名+端口号
        port: '443',      端口号
        hostname: 'ss1.baidu.com',  域名
        hash: '#dd',      哈希值
        search: '?fm=58&s=1AAA7A23C4A4D9031E5D94C60000C0B1&bpow=121&bpoh=75',  查询字符串 ?+参数
        query: 'fm=58&s=1AAA7A23C4A4D9031E5D94C60000C0B1&bpow=121&bpoh=75', 参数
        pathname: '/6ONXsjip0QIZ8tyhnq/it/index.html', 文件路径名
        path: '/6ONXsjip0QIZ8tyhnq/it/index.html?fm=58&s=1AAA7A23C4A4D9031E5D94C60000C0B1&bpow=121&bpoh=75',
        href: 'https://ss1.baidu.com:443/6ONXsjip0QIZ8tyhnq/it/index.html?fm=58&s=1AAA7A23C4A4D9031E5D94C60000C0B1&bpow=121&bpoh=75'
  }
*/


let obj1=url.parse(strUrl,true);//将query解析成成对象的形式
console.log(obj1);
/*
query:{fm: '58',
       s: '1AAA7A23C4A4D9031E5D94C60000C0B1',
       bpow: '121',
       bpoh: '75' },
*/

let {query,pathname}=obj1;