let fs=require("fs");
let dirArr=fs.readdirSync("./img");
//console.log(dirArr);
/*
[   'bg_day.png',
    'bg_night.png',
    'bird0_0.png',
    'bird0_1.png',
    'bird0_2.png',
    'bird1_0.png',
    'bird1_1.png' ]
*/

/*{
    "bg_day":"img/bg_day.png",
    ....
}*/
let obj={};
fs.readdir("./img",(e,val)=>{
    if(e){
        console.log(e);
    }else {
        val.forEach((item)=>{
            obj[item.split(".")[0]]="img/"+item;
        })
    };
    console.log(obj);
});
/*
 { bg_day: 'img/bg_day.png',
  bg_night: 'img/bg_night.png',
  bird0_0: 'img/bird0_0.png',
  bird0_1: 'img/bird0_1.png',
  bird0_2: 'img/bird0_2.png',
  bird1_0: 'img/bird1_0.png',
  bird1_1: 'img/bird1_1.png' }
*/