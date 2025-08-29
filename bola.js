/******************Pong Game************************/
/*   João Miranda Nº23416 | Miguel Lima Nº3310     */
/*      Programação de Interfaces Visuais          */
/*              ESTG - IPVC                       */

class Bola {
  constructor(x, y) {
    this.size = 10;
    this.x = x;
    this.y = y;
    this.speedX = 5;
    this.speedY = -5;
    this.pontos = 0;
    this.tipo = "bola";
    this.color = color(255, 255, 255);
    this.speed=1;
  }

  show() {
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }

  update() {

    this.x += this.speedX;
    this.y += this.speedY;
    //Verifica se colidiu com as laterais
    if (this.x < this.size / 2 || this.x > width - this.size / 2) {
      this.speedX *= -1;
    }
    if (this.y < this.size / 2) {
      this.speedY *= -1;
    }
    // Verifica se bateu com o fundo
   if (this.y > height) {
      this.x =  random(width / 2) ;
      this.y = height /2;
      this.speedX = 5;
      this.speedY = -5;
      vidas.loseLife();
      this.pontos = this.pontos - 50;
     


    }
  }
  // Verifica se colidiu com a base ou com as peças
  collide(obj) {
    if (
      this.y - this.size / 2 < obj.y + obj.height &&
      this.y + this.size / 2 > obj.y &&
      this.x + this.size / 2 > obj.x &&
      this.x - this.size / 2 < obj.x + obj.width
    ) {
      if (obj.tipo != "base") {

      this.speedY *= -1;
      if (obj.ntoques >= 2) {
        this.pontos = this.pontos + 50;
        obj.active = false;
        hitSound.play();
      } else if (obj.width != 80) {
        this.pontos = this.pontos + 50;
        obj.ntoques++;

        obj.color = color(random(255), random(255), random(255));

        hitSound.play();
      } else if (obj.width == 80) {
        this.pontos = this.pontos - 10;
      }
    
        if (obj.particulas == 0) {
          obj.particulas = 1;
        }
      }
      if (obj.tipo == "base") 
      {
        
       // Verfica a interceção
        let relativeIntersectx = (obj.x-(obj.width/2)) - (this.x+(this.size/2));
       // print("aqui---relativeIntersectx"+relativeIntersectx );

        let normalizedRelativeIntersectionx = (relativeIntersectx/(obj.width/2));
        //print("aqui---normalizedRelativeIntersectionx"+normalizedRelativeIntersectionx );
        let bounceAngle = normalizedRelativeIntersectionx * 75;
       // print("aqui---bounceAngle"+bounceAngle );

        this.speedX=5*Math.sin(bounceAngle);
        this.speedY=-this.speedY;


       // print("aqui---speedY"+this.speedY );
        //print("aqui---speedx"+this.speedY );
      }
    }
  }

  preload() {
    let hitSound = loadSound("media/hit_sound.wav");
  }
}
