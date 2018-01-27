let fs=require("fs");
let strName="赵钱孙李周吴郑王冯陈楮卫蒋沈韩杨朱秦尤许何吕施张孔曹严 华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花 方俞任袁柳酆鲍史唐费廉岑薛雷贺倪汤滕殷罗毕郝邬安常乐于时 傅皮卞齐康伍余元卜顾孟";
let str="丽莉康成晨敏民美春雨玉华金锦江建健冬慧汇辉元媛燕艳菲甜丹妮振峰丰凤枫锋龙泉磊倩茜鑫欣博波柏";
let dataAry=[];
for(var i=0;i<88;i++){
    if(i%2){
        var name=strName[Math.round(Math.random()*(strName.length-1))]+str[Math.round(Math.random()*(str.length-1))];
    }else {
        var name=strName[Math.round(Math.random()*(strName.length-1))]+str[Math.round(Math.random()*(str.length-1))]+str[Math.round(Math.random()*(str.length-1))];
    }
    var age=Math.round(Math.random()*(65-12)+12);
    var sex=Math.round(Math.random()*1);
    var tel="1"+Math.round(Math.random()*9)+Math.round(Math.random()*9)+Math.round(Math.random()*9)+Math.round(Math.random()*9)+Math.round(Math.random()*9)+Math.round(Math.random()*9)+Math.round(Math.random()*9)+Math.round(Math.random()*9)+Math.round(Math.random()*9)+Math.round(Math.random()*9);
    var time=Math.round(Math.random()*(2018-1980)+1980)+"-"+Math.round(Math.random()*(12-1)+1)+"-"+Math.round(Math.random()*30);
    var address="回龙观东大街站珠峰培训二楼";
    dataAry.push({
        "id":i,
        "name":name,
        "age":age,
        "sex":sex,
        "time":time,
        "tel":tel,
        "address":address
    })
}
fs.writeFileSync("./userListData.json",JSON.stringify(dataAry),"utf-8");