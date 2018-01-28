let xhr=new XMLHttpRequest();
//xhr.setRequestHeader("cookie","珠峰培训");
//错误The object's state must be OPENED.
//设置请求头必须写在open之后 send之前
xhr.open("get","data/data.json");
xhr.setRequestHeader("c","zf");
//'珠峰培训' is not a valid HTTP header field value.
//内容不可以是中文
xhr.onreadystatechange=function () {
    //不是以2或者3开头直接return
    if(!/^(2|3)\d{2}$/.test(xhr.status))return;
    if(xhr.readyState==2){
        console.log(1);
        //此时就可以拿到响应头
        let headerAll=xhr.getAllResponseHeaders();
        let date=xhr.getResponseHeader("date");
        //获取是格林尼治时间,同过new Date变成北京时间
        date=new Date(date).getTime();
        console.log(date);

    }
    if(xhr.readyState==4){
        console.log(xhr.responseText);
    }
};
xhr.send(null);
//xhr.setRequestHeader("cookie","珠峰培训");
encodeURIComponent()
