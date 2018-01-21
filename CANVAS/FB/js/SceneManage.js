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