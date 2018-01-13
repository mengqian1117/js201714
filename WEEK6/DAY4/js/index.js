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

//Phone显示
let PhoneRender=(function () {
    return{
        init(){
            console.log("phone");
        }
    }
})();
LoadingRender.init();
