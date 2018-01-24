let fs=require("fs");
let strName="赵钱孙李周吴郑王冯陈楮卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐费廉岑薛雷贺倪汤滕殷罗毕郝邬安常乐于时傅皮卞齐康伍余元卜顾孟";//94
let str="丽莉康成晨敏民美春雨玉华金锦江建健冬慧汇辉元媛燕艳菲甜丹妮振峰丰凤枫锋龙泉磊倩茜鑫欣博波柏";//45

//[{"name":"齐成欣","sex":1,"age":"22","time":"2010-2-1"}]
//name: 2-3
//sex: 0 / 1
//age: 18-65
//time: 1900-2018 1-12  1-30

let arr=[];
let obj=null,name="";
for(let i=0;i<100;i++){
    if(Math.round(Math.random()*1+2)==2){
        name=strName[Math.round(Math.random()*93)]+str[Math.round(Math.random()*44)];
    }else {
        name=strName[Math.round(Math.random()*93)]+str[Math.round(Math.random()*44)]+str[Math.round(Math.random()*44)];
    }

    obj={
        "name":name,
        "age":Math.round(Math.random()*(65-18)+18),
        "sex":Math.round(Math.random()),
        "time":Math.round(Math.random()*(2018-1900)+1900)+"-"+Math.round(Math.random()*11+1)+"-"+Math.round(Math.random()*29+1)
    };
    arr.push(obj)
};

fs.writeFileSync("./data/dataList.json",JSON.stringify(arr),"utf-8");
