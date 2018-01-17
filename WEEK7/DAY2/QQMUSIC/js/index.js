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

function Render() {
    let $lyric=$(".lyric");
    function bindHTML(data) {
        let strHTML=``;
        $.each(data,(index,item)=>{
            strHTML+=`<p id="lyric${item.id}" m="${item.m}" s="${item.s}">${item.lyric}</p>`
        });
        $lyric.html(strHTML);
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