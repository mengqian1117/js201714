var list=document.getElementById("list");
var sortList=document.getElementById("header").getElementsByTagName("a");
var data=null;
//1.创建一个AJAX对象
var xhr=new XMLHttpRequest();
//2.打开一个URL并发请求
xhr.open("GET","Data/product.json",false);
//3.监听请求状态,并获取数据
xhr.onreadystatechange=function () {
    if(xhr.status==200&&xhr.readyState==4){
        data=JSON.parse(xhr.responseText);
        bindHTML(data);
    }
};
//4.发送数据
xhr.send(null);

//绑定数据到页面上
function bindHTML(data) {
    //先准备一个空的ES6模板字符串
    var strHTML=``;
    //循环数据拼接字符串
    data.forEach((item)=>{
        strHTML+=`
         <li>
            <a href="javascript:;">
                <img src="${item.img}" alt="">
                <p>${item.title}</p>
                <p class="hot">热度:${item.hot}</p>
                <del>$9999</del>
                <span>￥${item.price}</span>
                <p class="time">上架时间：${item.time}</p>
            </a>
         </li>
            `
    });
    //将拼接好的字符串,绑定到页面
    list.innerHTML=strHTML;
}

//给三个排序的维度绑定事件
//注意:排序只需要重新拍一下数据data就可以,然后重新执行一下bindHTML即可
for(let i=0;i<sortList.length;i++){
    sortList[i].flag=-1;
    sortList[i].onclick=function () {
        this.flag*=-1;
        if(i==0){
           //此时是点击的第一个a标签那就是按照上架时间排序
            data.sort((a,b)=>{
                return (new Date(a.time)-new Date(b.time))*this.flag;
            });
            bindHTML(data);

        }else if(i==1){
            //此时是点击的第二个a标签那就是按照价格排序
            data.sort((a,b)=>{
                return (a.price-b.price)*this.flag;
            });
            bindHTML(data);
        }else if(i==2){
            //此时是点击的第三个a标签那就是按照热度排序
            data.sort((a,b)=>{
                return (a.hot-b.hot)*this.flag;
            });
            bindHTML(data);
        }
    }
}

/*
var t1=new Date("2017-03-15");
var t2=new Date("2017-02-15");
console.log(t1 - t2);
console.log(t2 - t1);

var ary=["2017-01-15","2017-04-15","2014-06-15","2013-03-15","2018-03-15"];
var  ary1=[{a:1},{a:13},{a:4}];
ary.sort(function (a,b) {
    return new Date(a)-new Date(b);
});
console.log(ary);
ary1.sort(function (a,b) {
    console.log(a, b);
    return a.a-b.a
});

a-b-->(a-b)*-1-->(b-a)
b-a-->(b-a)*-1-->(a-b)
*/
