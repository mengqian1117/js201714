(function () {
   let Pipe=window.Pipe=function () {
       this.H=Math.round(Math.random()*(320-100)+100);
       this.space=140;
       this.h=game.canvas.height-112-this.H-this.space;
       this.w=52;
       this.x=game.canvas.width;
       game.pipeArr.push(this)
   };
   Pipe.prototype.update=function () {
       this.x-=1;
       if(this.x<=-52){
           for(let i=0;i<game.pipeArr.length;i++){
               game.pipeArr[i]==this?game.pipeArr.splice(i,1):null;
           }
       }
   };
   Pipe.prototype.render=function () {
       game.draw.drawImage(game.allImg["pipe_down"],0,320-this.H,52,this.H,this.x,0,52,this.H);
       game.draw.drawImage(game.allImg["pipe_up"],0,0,52,this.h,this.x,this.H+this.space,52,this.h);
   }
})();