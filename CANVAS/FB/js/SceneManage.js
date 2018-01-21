(function () {
   let SceneManager=function () {
       this.bindEvent();
   };
   SceneManager.prototype.enter=function (number) {
       switch (number){
           case 0:
               this.titleY=0;
               this.buttonY=game.canvas.height;
               this.birdY=300;
               this.birdChangeY=1.2;
               break;
           case 1:
               game.scene=1;
               this.tutorialAlpha=0;
               this.tutorialAlphaChange=0.05;
               break;
           case 2:
               game.score=0;
               game.scene=2;
               game.bg=new Background;
               game.land=new Land;
               game.bird=new Bird;
               game.pipeArr=[];
               break;
           case 3:
               game.scene=3;
               this.isBooM=false;
               this.boomIndex=1;
               break;
           case 4:
               game.scene=4;
               this.gameoverY=0;
               this.score_panelY=game.canvas.height;
               //获取出存储的成绩
               let arr=JSON.parse(localStorage.getItem("FB"));
               //排序获取前三名
               arr.sort((a,b)=>b-a);
               //现在的成绩game.score去跟arr[0],arr[1],arr[2];
               //将最大记录分数存起来后面渲染到颁奖上
               this.best=arr[0];
               if(game.score>arr[0]){
                   //记录得什么奖牌
                   this.model="medals_1";
                   this.best=game.score;
               }else if(game.score>arr[1]){
                   this.model="medals_2";
               }else if(game.score>arr[2]){
                   this.model="medals_3";
               }else {
                   this.model="medals_0";
               }
               //将分数放到数组中,注意判断数组有没相同的分数,有就不用放了.没有才放
               if(!arr.includes(game.score)){
                   arr.push(game.score);
               }
               //给浏览器存起来
               localStorage.setItem("FB",JSON.stringify(arr));
               break;
       }
   };
   SceneManager.prototype.updateAndRender=function () {
       //根据此时是场景编号来判断第几个场景,然后做响应的处理
       switch (game.scene){
           case 0:
               game.draw.fillStyle="#4ec0ca";
               game.draw.fillRect(0,0,game.canvas.width,game.canvas.height);
               game.draw.drawImage(game.allImg["bg_day"],0,game.canvas.height-512);
               game.draw.drawImage(game.allImg["bg_day"],288,game.canvas.height-512);
               game.draw.drawImage(game.allImg["land"],0,game.canvas.height-112);
               game.draw.drawImage(game.allImg["land"],336,game.canvas.height-112);
               this.titleY+=5;
               this.buttonY-=10;
               if(this.titleY>=160)this.titleY=160;
               if(this.buttonY<=370)this.buttonY=370;
               game.draw.drawImage(game.allImg["title"],(game.canvas.width-178)/2,this.titleY);
               game.draw.drawImage(game.allImg["button_play"],(game.canvas.width-116)/2,this.buttonY);
               if(this.birdY<=250||this.birdY>=300){
                   this.birdChangeY*=-1;
               }
               this.birdY+=this.birdChangeY;
               game.draw.drawImage(game.allImg["bird0_0"],(game.canvas.width-48)/2,this.birdY);
               break;
           case 1:
               game.draw.fillStyle="#4ec0ca";
               game.draw.fillRect(0,0,game.canvas.width,game.canvas.height);
               game.draw.drawImage(game.allImg["bg_day"],0,game.canvas.height-512);
               game.draw.drawImage(game.allImg["bg_day"],288,game.canvas.height-512);
               game.draw.drawImage(game.allImg["land"],0,game.canvas.height-112);
               game.draw.drawImage(game.allImg["land"],336,game.canvas.height-112);
               game.draw.drawImage(game.allImg["bird0_0"],(game.canvas.width-48)/2,150);
               if(this.tutorialAlpha>1||this.tutorialAlpha<0){
                   this.tutorialAlphaChange*=-1;
               }
               this.tutorialAlpha+=this.tutorialAlphaChange;
               game.draw.save();
               game.draw.globalAlpha=this.tutorialAlpha;
               game.draw.drawImage(game.allImg["tutorial"],(game.canvas.width-114)/2,250);
               game.draw.restore();
               break;
           case 2:
               game.bg.update();
               game.bg.render();
               game.land.update();
               game.land.render();
               game.bird.update();
               game.bird.render();
               //每200帧new一个管子
               game.f%200==0?new Pipe:null;
               game.pipeArr.forEach((item)=>{
                   item.update();
                   item.render();
               });
               scoreRender();
               break;
           case 3:
               //停止上一个场景结束的时候
               game.bg.render();
               game.land.render();
               for (let i=0;i<game.pipeArr.length;i++){
                   game.pipeArr[i].render();
               }
              if(this.isBooM){
                   //爆炸
                  game.draw.drawImage(game.allImg["baozha"+this.boomIndex],game.bird.x,game.bird.y,100,100);
                  game.f%2==0?this.boomIndex++:null;
                  this.boomIndex>9?this.enter(4):null;
              }else {
                   //下落
                  game.bird.y+=5;
                  if(game.bird.y>=game.canvas.height-112){
                      this.isBooM=true;
                  }
                  game.bird.render();
              }
              scoreRender();
               break;
           case 4:
               //停止上一个场景结束的时候
               game.bg.render();
               game.land.render();
               for (let i=0;i<game.pipeArr.length;i++){
                   game.pipeArr[i].render();
               }
               this.gameoverY+=5;
               this.score_panelY-=10;
               if(this.score_panelY<270){
                   this.score_panelY=270;
                   //此时给this加一个标志说明可以显示奖牌了
                   this.isShowModel=true;
               }
               if(this.gameoverY>=200)this.gameoverY=200;
               game.draw.drawImage(game.allImg["game_over"],(game.canvas.width-204)/2,this.gameoverY);
               game.draw.drawImage(game.allImg["score_panel"],(game.canvas.width-238)/2,this.score_panelY);
               if(this.isShowModel){
                   game.draw.drawImage(game.allImg[this.model],game.canvas.width/2-88,this.score_panelY + 44);
                   game.draw.fillStyle="#666";
                   game.draw.font="20px consolas";
                   game.draw.textAlign="right";
                   game.draw.fillText(game.score,(game.canvas.width / 2) + 90 , this.score_panelY + 50);
                   game.draw.fillText(this.best,(game.canvas.width / 2) + 90 , this.score_panelY + 96);
               }

               break;
       }
   };
   SceneManager.prototype.bindEvent=function () {
       //只能给canvas绑定事件因为页面上只有一个元素canvas,其他的都是画上去的
       //怎么确定绑定到对应的位置上? 只能通过鼠标的位置clientX和clientY来确定
       //注意:不同场景下可能会有点击事件,所以需要判断那你点击的时候哪一个场景下的位置,同上也是使用switch判断即可
       game.canvas.onclick=(e)=>{
           //this-->sM场景管理器的实例
           switch (game.scene){
               case 0:
                   if(e.clientY>this.buttonY&&e.clientY<this.buttonY+70&&e.clientX>game.canvas.width/2-58&&e.clientX<game.canvas.width/2+58){
                    //点击的是button_play的位置
                    this.enter(1);
                   }
                   break;
               case 1:
                   this.enter(2);
                   break;
               case 2:
                   game.bird.fly();
                   break;
               case 3:

                   break;
               case 4:
                   break;
           }
       }
   };
   function scoreRender() {
       //渲染分数,根据分数的位数去拼接图片
       let score=game.score.toString();
       let cenLine=game.canvas.width/2-(score.length)/2*30;
       for (let i=0;i<score.length;i++){
           game.draw.drawImage(game.allImg["shuzi"+score[i]],cenLine+i*30,100);
       }
   }
   window.SceneManager=SceneManager;
})();