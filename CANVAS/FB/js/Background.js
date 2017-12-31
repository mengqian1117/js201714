(function () {
   let Background=window.Background=function () {
       this.x=0;
       this.w=288;
       this.h=512;
       this.steep=1;
   } ;
   Background.prototype.update=function () {
      this.x-=this.steep;
      if(this.x<=-this.w){
         this.x=0;
      }
   };
   Background.prototype.render=function () {
      game.draw.drawImage(game.allImg["bg_day"],this.x,game.canvas.height-this.h);
      game.draw.drawImage(game.allImg["bg_day"],this.x+this.w,game.canvas.height-this.h);
      game.draw.drawImage(game.allImg["bg_day"],this.x+this.w*2,game.canvas.height-this.h);
      game.draw.fillStyle="#4ec0ca";
      game.draw.fillRect(0,0,game.canvas.width,game.canvas.height-this.h)
   }
})();