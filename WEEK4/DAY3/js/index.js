let banner = document.getElementById("banner");
let bannerInner = banner.getElementsByClassName("bannerInner")[0];
let focusList = banner.getElementsByClassName("focusList")[0];
let imgList = bannerInner.getElementsByTagName("img");
let list = focusList.getElementsByTagName("li");
let left = banner.getElementsByClassName("left")[0];
let right = banner.getElementsByClassName("right")[0];
let timer = null, data = null, step = 0, isClick = true;

function getData() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "json/data.json", false);
    xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            data = JSON.parse(xhr.responseText);
        }
    };
    xhr.send(null);
}

function bindHTML(data) {
    let str1=``,str2=``;
    data.forEach((item,index)=>{
        str1+=`<div><img src="${item.src}" alt=""></div>`;
        str2+=index==0?`<li class="selected"></li>`:`<li></li>`;
    });
    bannerInner.innerHTML=str1;
    focusList.innerHTML=str2;
    //默认显示第一张图,将第一张图片的的父亲层级关系zIndex变成1
    $.css(imgList[0].parentNode,"zIndex",1);
    //加动画让opacity从0->1
    imgList[0].animation({opacity:1},1000);
}

function move() {
    //临界值判断
    if(step==3)step=-1;//注意下面立马执行了一次step++,所以这里让step=-1;
    step++;
    imgChange();
}

function imgChange() {
    //获取当前图片父亲的兄弟们
    let s=$.siblings(imgList[step].parentNode);
    //让所有的兄弟们的 zIndex 变成0
    for(let i=0;i<s.length;i++){
        $.css(s[i],"zIndex",0);
    }
    //让当前图片的父亲的zIndex变成1
    $.css(imgList[step].parentNode,"zIndex",1);
    //让当前图片实现渐变
    //注意:其他的图片opacity都变成0,但是不可以放在渐变之前,容易造成背景图片的外漏,但是其他的图片opacity必须得变成0,要不然下一次就没有渐变效果了,所以将其放在渐变动画完成之后,就是放在animation 上午回调函数中
    imgList[step].animation({opacity:1},1000,function () {
        //将其他图片opacity变成0,循环所有的img只要不是this(当前图片)就把他的opacity变成0
        for(let i=0;i<imgList.length;i++){
            if(imgList[i]!=this)imgList[i].style.opacity="0";
        };
        isClick=true;
    });

    //焦点同步
    for(let i=0;i<list.length;i++){
        list[i].className=i==step?"selected":"";
    }
}

function mouseEvent() {
    banner.onmouseover=function () {
        clearInterval(timer)
    };
    banner.onmouseout=function () {
        timer=setInterval(move,2000);
    }
}

function changeEvent() {
    left.onclick=function () {
        if(isClick){
            isClick=false;
            if(step==0)step=data.length;
            step--;
            imgChange();
        }
    };
    right.onclick=function () {
        if(isClick){
            isClick=false;
            move();
        }
    }
}

function focusChange() {
    for(let i=0;i<list.length;i++){
        list[i].onclick=function () {
           if(isClick){
               isClick=false;
               step=i;
               imgChange();
           }
        }
    }
}