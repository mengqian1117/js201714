//创建一个AJAX对象
let xhr=new XMLHttpRequest();
//不兼容 IE6以及以下(使用ActiveXObject)

//打开一个URL地址
//xhr.open("method","url",async,user.name,user.password)

xhr.onreadystatechange=()=>{
    if(xhr.readyState==4&&xhr.status==200){
        let res=xhr.responseText;//获取响应主体的内容
    }
};
//发送请求 (请求主体的内容的数据)
xhr.send(null);