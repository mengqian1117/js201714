//给字符串的原型扩展一个方法用来解析url的
(function (pro) {
    //pro=String.prototype
    pro.query=function () {
        return eval("({"+this.split("?")[1].replace(/&/g,"',").replace(/=/g,":'")+"'})");
    }
})(String.prototype);

function addZero(num) {
    return num =num<10?"0"+num:num
}

//Loading显示 单利模式
let LoadingRender=(function () {
    //将页面上所有的图片放在一个数组中
    var ary = ["icon.png", "zf_concatAddress.png", "zf_concatInfo.png", "zf_concatPhone.png", "zf_course.png", "zf_course1.png", "zf_course2.png", "zf_course3.png", "zf_course4.png", "zf_course5.png", "zf_course6.png", "zf_cube1.png", "zf_cube2.png", "zf_cube3.png", "zf_cube4.png", "zf_cube5.png", "zf_cube6.png", "zf_cubeBg.jpg", "zf_cubeTip.png", "zf_emploment.png", "zf_messageArrow1.png", "zf_messageArrow2.png", "zf_messageChat.png", "zf_messageKeyboard.png", "zf_messageLogo.png", "zf_messageStudent.png", "zf_outline.png", "zf_phoneBg.jpg", "zf_phoneDetail.png", "zf_phoneListen.png", "zf_phoneLogo.png", "zf_return.png", "zf_style1.jpg", "zf_style2.jpg", "zf_style3.jpg", "zf_styleTip1.png", "zf_styleTip2.png", "zf_teacher1.png", "zf_teacher2.png", "zf_teacher3.jpg", "zf_teacher4.png", "zf_teacher5.png", "zf_teacher6.png", "zf_teacherTip.png"];
    //获取想要操作的元素
    let $loading=$("#loading"),
        $progressBox=$(".progressBox"),
        step=0,//记录加载第几张
        total=ary.length;//图片的个数
    return{
        init(){
            //显示当前loading区域
            $loading.css("display","block");
            //循环数组加载图片
            $.each(ary,(index,item)=>{
                //创建一个img
                let img=new Image();
                img.src="img/"+item;
                img.onload=function () {
                    step++;
                    $progressBox.css({width:step/total*100+"%"});
                    if(step==total){
                        //此时进度条加载完成,进入下一个场景
                        //为了开发方便如果page==0,不进入到下一个场景,换句话说后面的代码不执行
                        if(page==0) return;
                        //为了效果明显,给他加一个定时器,延迟一段时间再显示下一个场景
                        window.setTimeout(()=>{
                            //当前场景隐藏
                            $loading.css({display:"none"});
                            //下一个phone场景显示
                            PhoneRender.init();
                        },2000)
                    }
                }
            })
        }
    }
})();

//Phone显示 单利模式
let PhoneRender=(function () {
    //获取当前区域需要操作的元素
    let $phone=$("#phone"),
        $listen=$phone.children(".listen"),
        $listenTouch=$listen.children(".touch"),
        $detail=$phone.children(".details"),
        $detailTouch=$detail.children(".touch"),
        $time=$(".time");
    //音频标签变成原生的元素
    let listenMusic=$("#listenMusic")[0];
    let detailMusic=$("#detailMusic")[0];
    let musicTimer=null;
    //播放对话音频
    function detailMusicPlay() {
        //detailMusic播放 play()
        detailMusic.play();
        //设置定时器,每隔一秒钟获取播放进度,转化成分:秒的形式展示
        musicTimer=window.setInterval(()=>{
            //获取当前音频播放的时间(进度),currentTime获取播放进度单位是秒s
            let current=detailMusic.currentTime,
                m=Math.floor(current/60),//分钟
                s=Math.floor(current-m*60);//秒
            //将时间加在$time上
            $time.html(addZero(m)+":"+addZero(s));
            //当音频自己播放完成,也是关闭当前phone区域显示下一个区域
            //H5属性 duration:获取音频的总时间
            if(current>=detailMusic.duration){
                //清除定时器
                window.clearInterval(musicTimer);
                page==1?null:closePhone();
            }
        },1000)
    }
    //关闭当前区域的函数
    function closePhone() {
        //清除定时器
        window.clearInterval(musicTimer);
        //让Phone消失之前先关闭音频
        detailMusic.pause();
        //phone隐藏,让他有一个慢慢掉下去的效果,就是给他加一个平移就好了
        $phone.css("transform","translateY("+document.documentElement.clientHeight+"px)").on("transitionend",function () {
            //transitionEnd过渡完成之后执行的函数
            //此时让phone隐藏
            $phone.css({display:'none'});
        });
        //接下来对话窗口显示 MessageRender
        MessageRender.init();
    }
    return{
        init(){
            //显示当前区域phone
            $phone.css({display:"block"});
            //播放接听铃声,listenMusic播放 play()H5新标签audio/video自带一个属性方法
            listenMusic.play();
            //给listenTouch绑定接听事件,单击事件,zepto给元素提供了一个现成单击事件 singleTap
            $listenTouch.singleTap(function (e) {
                //让listen消失
                $listen.css("display",'none');
                //让铃声停止播放  pause()暂停
                listenMusic.pause();
                //让detail显示,从底部上来(平移上来)
                $detail.css("transform","translateY(0)");
                //让时间time显示
                $time.css({display:'block'});
                //对话开始播放
                detailMusicPlay();
            });
            //detailTouch绑定单击事件
            $detailTouch.singleTap(closePhone);
        }
    }
})();

//Message显示 单例模式
let MessageRender=(function () {
    //获取当前区域所需要的元素
    let $message=$("#message"),
        $messageList=$(".messageList"),
        $messageListLi=$messageList.children("li"),
        $keyBoard=$(".keyBoard"),
        $textTip=$(".textTip"),
        $submit=$(".submit");
    let msgMusic=$("#msgMusic")[0];
    let messageTimer=null,//打字效果的定时器
        autoTimer=null,//消息推送的定时器
        step=-1,//记录显示的那一条消息
        total=$messageListLi.length,//消息的总条数
        top=0;//往上移动的距离
    //消息推送函数
    function messageMove() {
        //先播放背景音乐
        msgMusic.play();
        //设置定时器开始消息推送
        autoTimer=window.setInterval(()=>{
            step++;
            //获取要推送的消息就是对应的li(索引是step)
            let $curLI=$messageListLi.eq(step);
            $curLI.css({transform:"translateY(0)",opacity:1});
            //当推送到第三条,让keyBoard显示,暂时推送
            if(step==2){
                //清除定时器停止推送
                window.clearInterval(autoTimer);
                //让可以Board显示(从底部出来)
                $keyBoard.css({transform:"translateY(0)"});
                //先让textTip显示
                $textTip.css({display:"block"});
                //开始打字效果
                textMove()
            }
            //当显示到第四条的时候,在推送的时候开始往上平移
            if(step>2){
                //往上平移是负值
                top-=$curLI[0].offsetHeight+10;
                //将ul整体往上移动top
                $messageList.css({transform:"translateY("+top+"px)"})
            }
            //当消息推送完成时候
            if(step==total-1){
                //清除定时器
                window.clearInterval(autoTimer);
                //关闭音乐
                msgMusic.pause();
                //为了开发方便 如果page==2了,停止在这个区域,也就是下面的代码不执行了
                if(page==2) return;
                //当前message区域消失,下一个区域显示
                $message.css({display:"none"});
                CubeRender.init();
            }
        },1500)
    }
    //模拟打字效果的函数
    function textMove() {
        let textStr="都学会了,可还是找不到工作呀!",
            n=-1;
        //设置定时器.5s显示一个字
        messageTimer=window.setInterval(()=>{
            n++;
            //将显示的文字加在textTip上
            $textTip.html($textTip.html()+textStr[n]);
            //当字打完了清除定时器
            if(n==textStr.length-1){
                window.clearInterval(messageTimer);
                //显示发送按钮submit
                $submit.css({display:"block"});
                //给发送按钮绑定单击事件
                $submit.singleTap(function () {
                    //先让textTip的文字消失
                    $textTip.html("").css("display","none");
                    //keyBoard下去
                    $keyBoard.css({transform:"translateY(3.7rem)"});
                    //继续消息推送,也就是继续执行messageMove函数即可
                    messageMove();
                })
            }
        },500)
    }
    return{
       init(){
           $message.css({display:"block"});
           messageMove();
       }
    }
})();

//Cube显示 单利模式
let CubeRender=(function () {
    let $cube=$("#cube"),
        $cubeBox=$(".cubeBox"),
        $cubeLi=$cubeBox.children("li");
    function start(e) {
        //e:事件对象TouchEvent
        //e.touches 存储着每一个手指的信息
        //处理单手指操作即可,所以获取e.touches[0] 第一个手指信息即可
        let point=e.touches[0];
        //当时手指触碰一瞬间记录当前手指的偏移,记录到当前魔方上$cubeBox==this
        //在记录两个值,就是水平变化量 changeX和垂直变化量changeY
        $(this).attr({
            startX:point.clientX,
            startY:point.clientY,
            changeX:0,
            changeY:0
        })
    }
    function move(e) {
        //手指在屏幕上滑动,获取每时每刻的手指信息,记录每时每刻的changeX和changeY
        let point=e.touches[0];
        //求出changeX和changeY
        let changeX=point.clientX-$(this).attr("startX"),
            changeY=point.clientY-$(this).attr("startY");
        //将changeX和changeY存到this上
        $(this).attr({
            changeX:changeX,
            changeY:changeY,
        });
    }
    function end(e) {
        //手指移开屏幕,根据之前记录的changeX和changeY,让魔方旋转一定的角度
        //获取出之前存储的changeX和changeY的值,通过attr这个方法获取出来的是字符串,如果想要+计算,需要转化为数字
        let  changeX=parseFloat($(this).attr("changeX")),
             changeY=parseFloat($(this).attr("changeY"));
        //判断一下魔方是否需要滑动
        if(!isRotate(changeX,changeY))return;
        //只要可以执行到这里说明 符合滑动的条件
        //在这里手指移动的距离是changeX和changeY 这个是直线距离,但是魔方转动的是角度,所以我们就把转动的角度当做是移动距离的1/3
        //求出需要转动的角度
        let rotateX=parseFloat($(this).attr("rotateX"))-changeY/3,
            rotateY=parseFloat($(this).attr("rotateY"))+changeX/3;
        //魔方旋转,还要把记录的初始角度也变一下,因为下一次转动的时候以这一次作为开始值了
        $(this).attr({
            rotateX:rotateX,
            rotateY:rotateY,
        }).css({
            //回去css中看看原来的样式是什么不要漏了
            transform:`scale(0.6) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
        })
    }
    function isRotate(x,y) {
        return Math.abs(x)>30||Math.abs(y)>30;
    }
    return{
        init(){
            $cube.css({display:"block"});
            //存储魔方的初始的角度
            $cubeBox.attr({
                rotateX:-30,
                rotateY:45,
            }).on("touchstart",start).on("touchmove",move).on("touchend",end)
            //touchstart:手指刚触碰到屏幕的时候
            //touchmove:手指在屏幕上滑动
            //touchend:手指离开屏幕
        }
    }
})();

let page=window.location.href.query()["page"];
page==0||isNaN(page)?LoadingRender.init():null;
page==1?PhoneRender.init():null;
page==2?MessageRender.init():null;
page==3?CubeRender.init():null;
