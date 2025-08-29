/******************Pong Game************************/
/*   João Miranda Nº23416 | Miguel Lima Nº3310     */
/*      Programação de Interfaces Visuais          */
/*              ESTG - IPVC                       */

class Base {
  constructor() {
    this.width = 80;
    this.height = 10;
    this.x = width / 2 - this.width / 2;
    this.y = height - 20;
    this.tipo = "base";
    this.vx=1;
  }
/*  mover(x) {
    this.x = constrain(x - this.width / 2, 0, width - this.width);
  }*/
  show() {
    fill(255);
    rect(this.x, this.y, this.width, this.height);
  }
 move(x) {
    let pos=constrain(x - this.width / 2, 0, width - this.width);
    if(pos>this.x)
      this.vx=1;
     if(pos<this.x) 
      this.vx=-1;
     
    this.x = pos;
    
  }
}
