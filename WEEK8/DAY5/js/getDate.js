let serverTime=null;
//获取服务器上的时间,只需要获取响应头即可,时间只要获取一次然后在本地在这个时间的基础上每隔1000ms加1000即可

let fn=()=>{
    serverTime+=1000;
    //1.计算当前时间和目标事件的差
    let targetTime=new Date("2018-2-9 18:00:00");
    let diff=targetTime - serverTime;
    //将事件差diff变成  XX天XX小时XX分钟XX秒  的形式
    let day=Math.floor(diff/(24*60*60*1000));
    let hours=Math.floor(diff%(24*60*60*1000)/(60*60*1000));
    let minutes=Math.floor(diff%(24*60*60*1000)%(60*60*1000)/(60*1000));
    let seconds=Math.floor(diff%(24*60*60*1000)%(60*60*1000)%(60*1000)/1000);
    box.innerHTML=(day+"天"+ hours+"小时"+minutes+"分"+seconds+"秒");

};
setInterval(fn,1000);
function getServerTime() {

    let xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function () {
        //因为我们使用的是HEAD请求没有状态3,因为没有响应主体
        //console.log(xhr.readyState);
        if(!/^(2|3)\d{2}$/.test(xhr.status))return;
        if(xhr.readyState==2){
            //拿到响应头信息
            serverTime=new Date(xhr.getResponseHeader("date")).getTime();
            fn()
        }
    };
    xhr.open("head","data/data.json");
    xhr.send(null);
}
getServerTime();