//获取数据
$.ajax({
    type:"GET",
    url:"json/data.json",
    async:false,
    dataType:"json",
    data:null,
    success:function (res) {
        window.data=res;
    },
    error:function () {
        console.log("sorry");
    }
});
let step=0;//记录当前显示的数据
function move() {
   step++;
   if(step==data.length){
       step=0;
   }
   //将当前显示的li传进来
   change($(".li"+step));
}
function change($ele) {
    //$ele当前显示的那个li,JQ对象
    //让当前li的海孩子a标签的marginRight以动画的形式变到20,其他的li中的a标签的marginRight变成-20
    $ele.children("a").stop().animate({marginRight:20},500,function () {
        //出来之后,让自己的opacity渐变变成1
        $(this).stop().animate({opacity:1},700);
        //替换图片,给img的src赋值,加上渐变效果,先将opacity变成0在渐变成1
        $("#rot1").children("img").prop("src",data[step].image).css({opacity:0}).stop().animate({opacity:1},2000);
        //heading显示
        $("#rot1 .heading").stop().animate({left:-450},700,"easeOutCirc",function () {
            $("h1").html(data[step].heading);
            $(this).stop().animate({left:0},600,"easeInOutQuad");
        });

        //description显示
        $("#rot1 .description").stop().animate({bottom:-270},700,"easeOutCirc",function () {
            $(".description p").html(data[step].description);
            $(this).stop().animate({bottom:0},500,"easeInOutQuad")
        })
    }).parent().siblings().children("a").animate({marginRight:-20},400,function () {
        //回去之后opacity再渐变回0.6
        $(this).stop().animate({opacity:0.6},700);
    });
};
change($(".li0"));
let timer=setInterval(move,3000);