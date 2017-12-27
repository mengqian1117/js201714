let Banner=function (id,url,duration,interval) {
    //id 在外层盒子的ID
    //url 数据的地址
    let banner=document.getElementById(id);
    let bannerInner=banner.getElementsByClassName("bannerInner")[0];
    let focusList=banner.getElementsByClassName("focusList")[0];
    let imgList=bannerInner.getElementsByTagName("img");
    let list=focusList.getElementsByTagName("li");
    let left=banner.getElementsByClassName("left")[0];
    let right=banner.getElementsByClassName("right")[0];
    duration=duration||1000;
    interval=interval||2000;
    //if{}中只要一行代码可以省略{}
    if(duration>interval)[duration,interval]=[interval,duration];
    let timer=null,data=null,step=0,isClick=true;
    let W=banner.offsetWidth;
    //获取数据
    ;(function () {
        let xhr=new XMLHttpRequest();
        xhr.open("GET",url,false);
        xhr.onreadystatechange=function () {
            if(xhr.readyState==4&&xhr.status==200){
                data=JSON.parse(xhr.responseText);
            }
        };
        xhr.send(null);
    })();
    //绑定数据
    ;(function () {
        let str1=``,str2=``;
        data.forEach((item,index)=>{
            str1+=`<div><img src="" alt="" photo="${item.src}"></div>`;
            str2+=index==0?`<li class="selected"></li>`:`<li></li>`;
        });
        str1+=`<div><img src="" alt="" photo="${data[0].src}"></div>`;
        bannerInner.innerHTML=str1;
        focusList.innerHTML=str2;
        bannerInner.style.width=(data.length+1)*W+"px";
    })();
    //延迟加载
    ;(function () {
        for(let i=0;i<imgList.length;i++){
            let img=new Image();
            img.src=imgList[i].getAttribute("photo");
            img.onload=function () {
                imgList[i].src=this.src;
                imgList[i].animation({opacity:1},500);
            }
        }
    })();
    function move() {
        if(step==data.length){
           step=0;
           $.css(bannerInner,"left",0);
        }
        step++;
        bannerInner.animation({left:-W*step},duration,function () {
            isClick=true;
        });
        focusFollow();
    }
    function focusFollow() {
        for(let i=0;i<list.length;i++){
            if(i==data.length)list[0].className="selected";
            list[i].className=i==step?"selected":"";
        }
    }
    function autoMove() {
        timer=setInterval(move,interval);
        //只有执行了autoMove有了自动轮播才会给banner绑定鼠标滑过事件,所以mouseEvent这个函数在这里执行即可
        mouseEvent();
        return this;//实现连写写法
    }
    function mouseEvent() {
        banner.onmouseover=function () {
            clearInterval(timer)
        };
        banner.onmouseout=function () {
            timer=setInterval(move,interval);
        };
    }
    function lRChange() {
        left.onclick=function () {
            if(isClick){
                isClick=false;
                if(step==0){
                    step=data.length;
                    $.css(bannerInner,"left",-W*step);
                }
                step--;
                bannerInner.animation({left:-W*step},duration);
                focusFollow();
            }
        };
        right.onclick=function () {
            if(isClick){
                isClick=false;
                move();
            }
        };
        return this;
    }
    function focusChange() {
        for(let i=0;i<list.length;i++){
            list[i].onclick=function () {
                if(isClick){
                    isClick=false;
                    step=i;
                    bannerInner.animation({left:-W*step},duration,function () {
                 isClick=true;
                    });
                    focusFollow();
                }
            }
        }
        return this
    }
    return{
        autoMove,
        lRChange,
        focusChange
    }
};