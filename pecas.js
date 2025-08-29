/******************Pong Game************************/
/*   João Miranda Nº23416 | Miguel Lima Nº3310     */
/*      Programação de Interfaces Visuais          */
/*              ESTG - IPVC                       */

class Pecas {
  constructor(column, row, toques) {
    this.width = brickWidth;
    this.height = brickHeight;
    this.x = column * (this.width + brickPadding) + brickOffsetLeft;
    this.y = row * (this.height + brickPadding) + brickOffsetTop;
    this.active = true;
    this.ntoques = toques;
    /* Efetuar um random para ter uma cor aleatoria*/
    this.color = color(random(255), random(255), random(255));
    this.particulas = 0;
  }
/* Desenho das peças*/
  show() {
    if (this.active && this.ntoques < 3) {
      fill(this.color);
      rect(this.x, this.y, this.width, this.height);
    }
  }
  ativas() {
    concluido = 0;
  }
}
