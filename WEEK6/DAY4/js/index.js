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
    return{
       init(){

       }
    }
})();

let page=window.location.href.query()["page"];
page==0||isNaN(page)?LoadingRender.init():null;
page==1?PhoneRender.init():null;
page==2?MessageRender.init():null;
