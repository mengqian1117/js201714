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
        //this.getAttribute("sort-attr");
        // "time","price","hot"
        sort.call(this,this.getAttribute("sort-attr"));
    }
}

function sort(atr) {
    data.sort((a,b)=>{
        if(atr=="time"){
            return (new Date(a[atr])-new Date(b[atr]))*this.flag;
        }else {
            return (a[atr]-b[atr])*this.flag;
        }

    });
    bindHTML(data);
}