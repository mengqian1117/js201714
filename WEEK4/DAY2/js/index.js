//获取操作的元素
let banner=document.getElementById("banner");
let bannerInner=banner.getElementsByClassName("bannerInner")[0];
let focusList=banner.getElementsByClassName("focusList")[0];
let list=focusList.getElementsByTagName("li");
let btnLeft=banner.getElementsByClassName("left")[0];
let btnRight=banner.getElementsByClassName("right")[0];
let imgList=bannerInner.getElementsByTagName("img");
//step:记录当前显示的是哪一张图片
let data=null,timer=null,step=0,isClick=true;
//获取可视区域banner的宽度
var W=$.css(banner,"width");
//获取数据
function getData() {
   let xhr=new XMLHttpRequest();
   xhr.open("GET","json/data.json",false);
   xhr.onreadystatechange=function () {
       if(xhr.status==200&&xhr.readyState==4){
           data=JSON.parse(xhr.responseText);
       }
   };
   xhr.send(null);
};
//绑定数据到页面上
function bindHTML(data) {
    //准备两个空字符串 str1是盛放轮播区域的,str2是焦点区域的
    let str1=``,str2=``;
    //循环数据data,拼接字符串
    data.forEach((item,index)=>{
        str1+=`<div><img src="" alt="" photo="${item.src}"></div>`;
        //默认第一个li有选中样式,当index==0时候给他品拼接的li有一个类名
        str2+=index==0?`<li class="selected"></li>`:`<li></li>`;
    });
    //为了实现无缝滚动,我们在最后一张图片后面多加一个第一张图片,如果不拼接一个最后一张走过去的时候后面就是空白的
    str1+=`<div><img src="" alt="" photo="${data[0].src}"></div>`;
    bannerInner.innerHTML=str1;
    focusList.innerHTML=str2;
    //此时bannerInner里面的内容已经确定了,我们还需要给他设置宽度
    $.css(bannerInner,"width",W*(data.length+1));
};
//延迟加载
function delayLoad() {
    for(let i=0;i<imgList.length;i++){
        let img=new Image();
        img.src=imgList[i].getAttribute("photo");
        img.onload=function () {
            imgList[i].src=this.src;
            imgList[i].animation({opacity:1},1000);
        }
    }
};

//自动轮播的函数
function move() {
    //临界值判断
    if(step==data.length){
        step=0;
        //我们需要让bannerInner瞬间回去,所以需要给他设置left值
        $.css(bannerInner,"left",0);
    }
    step++;
    //正好每一张图片运动后left值为-W*step
    //为了保证轮播每一张图片有有一个停顿的效果我们一定要将每一张图片动画时间设置的比自动轮播的时间小
    bannerInner.animation({left:-W*step},1000,function () {
        isClick=true;
    });
    focusFollow();
}
//焦点对齐
function focusFollow() {
    //循环所有li判断li的索引是否是step,是的话className就是"selected"否则就是""
    for(let i=0;i<list.length;i++){
        if (step==data.length){
            list[0].className="selected";
        }
        list[i].className=i==step?"selected":"";
    }
}

//给banner加上鼠标滑过事件
function mouseEvent() {
    banner.onmouseover=function () {
        //清除定时器停止自动轮播
        clearInterval(timer);
    };
    banner.onmouseout=function () {
        //开启定时器,继续自动轮播
        timer=setInterval(move,2000);
    }
}

//给左右按钮绑定点击事件
function btnEvent() {
    btnLeft.onclick=function () {
        //为了防止有人手贱一直点,我们给他加一个状态isClick,只要点击一下isClick的值就是false,当动画完成之后状态isClick变成true,在动画的回调函数中就是动画完成之后的操作
        if(isClick){
            isClick=false;
            if(step==0){
                step=data.length;
                $.css(bannerInner,"left",-W*step)
            }
            step--;
            bannerInner.animation({left:-W*step},1000,function () {
                isClick=true;
            });
            //焦点对对齐
            focusFollow();
        }
    };
    btnRight.onclick=function () {
        if(isClick){
            isClick=false;
            move();
        }
    }
}

//给焦点绑定点击事件
function focusChange() {
    for(let i=0;i<list.length;i++){
        list[i].onclick=function () {
            if(isClick){
                isClick=false;
                step=i;
                bannerInner.animation({left:-W*step},1000,function () {
               isClick=true
                });
                focusFollow();
            }
        }
    }
}








