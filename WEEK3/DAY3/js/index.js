var imgList=news.getElementsByTagName("img");
var H=$.win("clientHeight");
//获取数据
var xhr=new XMLHttpRequest();
xhr.open("GET","json/data.json",false);
xhr.onreadystatechange=function () {
    if(xhr.status==200&&xhr.readyState==4){
        window.data=JSON.parse(xhr.responseText);
    }
};
xhr.send(null);
//绑定数据到页面上
function bindHTML(data) {
    var strHTML=``;
    for (let item of data){
        strHTML+=`<li>
        <div>
            <img src="" alt="" photo="${item.src}">
        </div>
        <div>
            <h2>${item.title}</h2>
            <p>${item.description}</p>
        </div>
    </li>`
    }
    news.innerHTML+=strHTML;
    delayLoad();
}
bindHTML(data);
//实现延迟加载
function delayLoad() {
    for (let i=0;i<imgList.length;i++){
        //当滚上去的距离+一屏的高>=图片父亲的高度+图片父亲距离body的上偏移量,此时图片就能完全露出来
        //注意图片没有加载出来是没有宽高的
        if($.win("scrollTop")+H>=imgList[i].parentNode.offsetHeight+$.offset(imgList[i].parentNode).top){
            let img=new Image;
            img.src=imgList[i].getAttribute("photo");
            img.onload=function () {
                //this-->img替身
                imgList[i].src=this.src;
                fadeIn(imgList[i]);
            }
        }
    }
}
window.onscroll=function () {
    delayLoad();
    //如果滑到底部,继续加载新的内容
    if($.win("scrollTop")+H+30>=$.win("scrollHeight")){
        bindHTML(data);
    }
};
function fadeIn(curEle) {
    let timer=setInterval(function () {
        let op=$.css(curEle,"opacity");
        op+=0.01;
        $.css(curEle,"opacity",op);
        if(op>=1){
            clearInterval(timer)
        }
    },20)
}