h1.onclick=function () {
    $.ajax({
        url:"/a",
        type:"get",
        dataType:"json",
        data:null,
        async:false,
        success:function (res) {
            console.log(res);
        }
    })
};

//给 h2绑定事件 点击的时候发送请求,将内容替换成 我是珠峰培训(请求回来的数据)
//  /getName

h2.onclick=function () {
    $.ajax({
        url:"/a",
        type:"get",
        dataType:"json",
        data:null,
        async:false,
        success:function (res) {
            h2.innerHTML="我是"+res[0].name;
        }
    })
}