/******************Pong Game************************/
/*   João Miranda Nº23416 | Miguel Lima Nº3310     */
/*      Programação de Interfaces Visuais          */
/*              ESTG - IPVC                       */

class Vidas {
  constructor(numLives) {
    this.numLives = numLives;
    this.radius = 10;
    this.spacing = 25;
    this.x = width - this.spacing * numLives;
    this.y = this.radius - 5;
  }

  show() {
    fill(255);
    for (let i = 0; i < this.numLives; i++) {
      push();
      //desenha a imagem dos coracoes
      image(coracao, this.x + i * this.spacing, this.y);
      coracao.resize(this.radius * 2, this.radius * 2);
      pop();
    }
  }
  /* Descontar uma vida*/
  loseLife() {
    this.numLives--;
    this.x = width - this.spacing * this.numLives;
    
  }
}
