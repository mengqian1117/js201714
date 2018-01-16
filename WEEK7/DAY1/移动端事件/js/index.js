document.documentElement.style.fontSize=document.documentElement.clientWidth/640*100+"px";
//如果页面使用了原生的touch事件一定要组织浏览器的默认行为
$(document).on("touchstart touchmove touchend",function (e) {
    e.preventDefault();
});
let BannerRender=(function () {
    let $swiper=$("#swiper"),
        $banner=$("#banner"),
        $slide=$(".slide"),
        $imgList=$(".slide img"),
        $tipList=$("#bannerTip li");
    let W=document.documentElement.clientWidth,
        maxL=0,
        minL=0;
    let total=0,
        step=1,
        timer=null;
    //判断是否滑动 true/false
    function isSwiper(strX,strY,endX,endY) {
        return Math.abs(endX-strX)>30||Math.abs(endY-strY)>30;
    }
    //判断哪个方向滑动 "right"/"left"/"down"/"up"
    function swiperDir(strX,strY,endX,endY) {
        return Math.abs(endX-strX)>=Math.abs(endY-strY)?(endX-strX>0?"right":"left"):(endY-strY>0?"down":"up");
    }
    //touchstrat 事件执行
    function start(e) {
        let point=e.touches[0];
        $banner.attr({
            strL:parseFloat($banner.css("left")),//记录手指刚放上的left
            strX:point.clientX,//记录手指刚放上的偏移X
            strY:point.clientY,//记录手指刚放上的偏移Y
            isMove:false,//是否滑动
            dir:null,//滑动方向
            changeX:0//滑动的距离
        })
    }
    //touchmove事件执行
    function move(e) {
        let point=e.touches[0];
        //获取现在的偏移和之前存起来的偏移以及left值
        console.log($banner.attr("strX"));
        let endX=point.clientX,
            endY=point.clientY,
            strX=parseFloat($banner.attr("strX")),
            strY=parseFloat($banner.attr("strY")),
            strL=parseFloat($banner.attr("strL")),
            changeX=endX-strX;
        var isMove=isSwiper(strX,strY,endX,endY),
            dir=swiperDir(strX,strY,endX,endY);
        if(isMove&&/(left|right)/.test(dir)){
            //满足条件之后将获取的值继续存起来
            $banner.attr({
                isMove:true,
                dir:dir,
                changeX:changeX
            });
            //改变banner的left  变成:strL+changeX
            let curL=strL+changeX;
            curL=curL>maxL?maxL:curL<minL?minL:curL;
            $banner[0].style.webkitTransitionDuration="0s";
            $banner.css("left",curL);
        }

    }
    function end(e) {
        let isMove=$banner.attr("isMove"),
            dir=$banner.attr("dir"),
            changeX=parseFloat($banner.attr("changeX"));
        if(isMove&&/(left|right)/.test(dir)){
            //只要滑动的距离大于屏幕的1/3了就改变当前图片,根据dir的值是left还是right来决定是下一张还是上一张
            if(Math.abs(changeX)>=W/3){
                console.log(1);
                if(dir=="left"){
                    step++;
                }else {
                    step--;
                }
            }
            $banner[0].style.webkitTransitionDuration=".2s";
            $banner.css("left",-step*W);
            //如果到达边界立马回到原来的位置,因为有过渡动画所以说要等等,等1s之后才回去
            window.clearInterval(timer);
            timer=window.setTimeout(()=>{
                if(step==0||step==total-1){//0,5
                    $banner[0].style.webkitTransitionDuration="0s";
                    step=step==0?total-2:1;
                    $banner.css({left:-step*W});
                }
                window.clearInterval(timer);
            },200)
        }
    }
    return{
        init(){
            total=$slide.length;
            //给banner设置宽width
            $banner.css({width:W*total});
            $slide.css({width:W});
            minL=-W*(total-1);
            $swiper.on("touchstart",start).on("touchmove",move).on("touchend",end);
        }
    }
})();
BannerRender.init();