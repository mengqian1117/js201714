//header
let HeaderRender=(function () {
    let $headerBox=$(".headerBox"),
        $menu=$headerBox.children(".menu"),
        $navBox=$(".navBox");
    function navChange() {
        //为了判断收起来还是展开,自己给他加一个状态值
        $menu.attr("isShow",false);
        $menu.tap(function () {
            //获取之前存储的状态值,根据这个自值判断现在的操作
            let isShow=$(this).attr("isShow");
            //注意获取出来的是字符串
            if(isShow=="false"){
                //加上样式展开
                $navBox.css({
                    height:"1.6rem",
                    padding:".16rem",
                });
                //不要忘记改变他的状态
                $(this).attr("isShow",true);
                return
            }
            $navBox.css({
                height:"0",
                padding:"0",
            });
            //不要忘记改变他的状态
            $(this).attr("isShow",false);

        })
    }
    return {
        init(){
            navChange();
        }
    }
})();
HeaderRender.init();

//banner
let BannerRender=(function () {
    let $wrapper=$('.swiper-wrapper');
    //绑定数据的函数
    function bindHTML(data) {
        let strHTML=``;
        $.each(data,(index,item)=>{
            strHTML+=`
                <div class="swiper-slide">
                    <a href="${item.link}">
                        <img src="${item.img}" alt="">
                        <span>${item.desc}</span>
                    </a>
                </div>`
        });
        $wrapper.html(strHTML);
        swiper();
    }
    function swiper() {
        new Swiper(".swiper-container",{
            //配置信息
            autoplay:2000,//自动轮播,设置自动轮播的interval
            loop:true,//实现环路
            autoplayDisableOnInteraction:false,
            //手动轮播之后自动轮播消失,false:继续自动轮播
            //设置分页器
            pagination:'.swiper-pagination',
            paginationType: 'fraction',
        })
    }
    return {
        init(){
            //请求数据
            $.ajax({
                url:"json/banner.json",
                type:"get",
                dataType:"json",
                async:false,
                data:null,
                success:bindHTML,
                error:function (e) {
                    console.log(e);
                }
            })
        }
    }
})();
BannerRender.init();

//aside
let AsideRender=(function () {
    let $list=$(".list");
    function bindHTML(data) {
        let str=``;
        $.each(data,(index,item)=>{
            str+=`<li>
                    <a href="">
                    ${item.title}
                    </a>
                </li>`
        });
        //为了实现无缝滚动在最后多拼接一个(第一个li)
        $list.html(str+`<li><a href="">${data[0].title}</a></li>`);
        //实现上下滚动
        //获取可视区域的高度 asideBox的offsetHeight
        let H=$(".asideBox")[0].offsetHeight,
            timer=null,
            step=0;
        //设置定时器实现上下滚动  上下平移
        timer=setInterval(()=>{
            step++;
            $list.css({
                transitionDuration:".3s",
                transform:`translateY(${-H*step}px)`
            }).on("transitionend WebkitTransitionEnd",function () {
                if(step==data.length){
                    //显示第一条,注意是瞬间的事
                    $list.css({
                        transitionDuration:"0s",
                        transform:"translateY(0)"
                    });
                    step=0;
                }
            });
            //临界值判断,注意因为有过渡效果,有时间的延迟 .3s,所以判断是否到临界值要在过渡完成之后判断,ontransitionend事件
        },3000)
    }
    return {
        init(){
            //获取数据
            $.ajax({
                url:"json/aside.json",
                type:"get",
                dataType:"json",
                data:null,
                async:false,
                success:bindHTML,
                error:function (e) {
                    console.log(e);
                }
            })
        }
    }
})();
AsideRender.init();

//news
let NewsRender=(function () {
    let $news=$(".news");
    function bindHTML(data) {
        let str=`<ul class="item">`;
        $.each(data.newsList,(index,item)=>{
            str+=`<li>
                    <a href="${item.link}">
                        <img src="${item.img}" alt="">
                        <div>
                            <p>${item.title}</p>
                            <span>
                               ${item.count}
                                <i class="icon-comment"></i>
                            </span>
                        </div>
                    </a>
                </li>`
        });
        str+=`</ul> 
              <div class="image">
                <p>${data.imgList.title}</p>
              <div class="clearfix">`;
        $.each(data.imgList.img,(index,item)=>{
            str+=`<img src="${item}" alt="">`;
        });
        str+=`</div>
                <span>${data.imgList.count}<i class="icon-comment"></i></span>
            </div>`;
        $news.append(str);
    }
    return{
        init(){
            $.ajax({
                url:"json/news.json",
                type:"get",
                dataType:"json",
                data:null,
                async:false,
                success:bindHTML,
                error:function (e) {
                    console.log(e);
                }
            })
        }
    }
})();
NewsRender.init();
