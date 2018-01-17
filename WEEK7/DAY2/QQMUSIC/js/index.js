function REM () {
    let W=document.documentElement.clientWidth;

    //为了页面效果更好的显示,如果浏览器的宽大于640此时让这个section最大宽是640px,而且居中
    if(W>640){
        $("#music").css({
            width:640,
            margin:"0 auto"
        });
        window.hT=100;
        return;//当这样的情况下后面的fontSize就不需要计算了,但是不要忘了在样式中给一个默认的html{font-size: 100px;}
    }
    document.documentElement.style.fontSize=W/640*100+"px";
    window.hT=W/640*100;
};
REM();
window.onresize=REM;
//计算main的高
~function () {
    let $header=$(".header"),
        $main=$(".main"),
        $footer=$(".footer");
    let H=document.documentElement.clientHeight;
    $main.css({height:H-$header[0].offsetHeight-$footer[0].offsetHeight-0.8*hT})
}();
//补位0
function addZero(num) {
    return num<10?"0"+num:num;
}

function Render() {
    let $lyric=$(".lyric"),
        $musicBtn=$(".musicBtn"),
        $play=$(".play"),
        $pause=$(".pause"),
        musicAudio=$("#musicAudio")[0],
        $duration=$(".duration"),
        $current=$(".current"),
        $Callbacks=$.Callbacks();
    let duration=0,timer=null,step=-1;
    //控制自动播放盒暂停的
    function autoPlay() {
        //播放音乐
        musicAudio.play();
        //canplay:是一个事件,音乐播放的时候触发的事件
        musicAudio.addEventListener("canplay",function () {
            $play.css({display:"none"});
            $pause.css({display:"block"});
            //计算总时间duration
            duration=musicAudio.duration;
            let m=Math.floor(duration/60),
                s=Math.floor(duration-60*m);
            $duration.html(addZero(m)+":"+addZero(s));
        });

    }
    $Callbacks.add(autoPlay);
    //控制手动播放和暂停的
    function playPause() {
        //给$musicBtn绑定单击事件
        //paused: true 暂停状态;false 播放状态
        $musicBtn.tap(function () {
            if(musicAudio.paused){
                //此时是暂停状态
                musicAudio.play();
                $play.css({display:"none"});
                $pause.css({display:"block"});
                return;
            }
            musicAudio.pause();
            $play.css({display:"block"});
            $pause.css({display:"none"});
        })
    }
    $Callbacks.add(playPause);
    //控制播放时间,进度条,歌词对应
    function lyricTimeSync() {
        //设置一个定时器,每隔1s检测一下
        timer=setInterval(()=>{
            //获取当前音乐播放的进度
            let current=musicAudio.currentTime,
                m=addZero(Math.floor(current/60)),
                s=addZero(Math.floor(current%60));
            $current.html(m+":"+s);
            //播放完成
            if(current>=duration){
                //清除定时器
                clearInterval(timer);
                //按钮重置
                $play.css({display:"block"});
                $pause.css({display:"none"});
                return;
            }

            //控制进度条
            //span 的width/div的width=current/duration
            $(".timeLine span").css({
                width:(current/duration)*100+"%"
            });
            //歌词对应
            let $lyricList=$lyric.children("p");
            $lyricList.each((index,item)=>{
                if($(item).attr("m")==m&&$(item).attr("s")==s){
                    step++;
                    if(step>=4){
                        $lyric.css("top",-(step-3)*0.84+"rem")
                    }
                    $(item).addClass("bg").siblings().removeClass("bg");
                }
            })

        },1000)
    }
    $Callbacks.add(lyricTimeSync);
    function bindHTML(data) {
        let strHTML=``;
        $.each(data,(index,item)=>{
            strHTML+=`<p id="lyric${item.id}" m="${item.m}" s="${item.s}">${item.lyric}</p>`
        });
        $lyric.html(strHTML);
        $Callbacks.fire();
    }
    return{
        init(){
            //获取歌词数据,ajax
            $.ajax({
                //为了防止浏览器默认走缓存,如果数据改了请求的还是之前的数据,此时我们让每一次请求的路径都不同,但是还不能影响其他参数,一般都是加上一个时间戳或者是随机小数
                url:"json/lyric.json?_t="+new Date().getTime(),
                type:"GET",
                dataType:"json",
                data:null,
                async:false,
                success:function (data) {
                    if(data.lyric){
                        let reg=/\[(\d{2})&#58;(\d{2})&#46;\d+\](.+)/;
                        let ary=data.lyric.replace(/&#32;/g," ").replace(/&#45;/g,"-").split("&#10;").filter((item)=>reg.test(item));
                        let lyric=[];
                        ary.forEach((item,index)=>{
                            let a=reg.exec(item);
                            lyric.push({
                                id:index,
                                m:a[1],
                                s:a[2],
                                lyric:a[3]
                            })
                        });
                        bindHTML(lyric);
                    }
                },
                error:function (e) {
                    console.log(e);
                }

            })
        }
    }
}
Render().init();