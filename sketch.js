/******************Pong Game************************/
/*   João Miranda Nº23416 | Miguel Lima Nº3310     */
/*      Programação de Interfaces Visuais          */
/*              ESTG - IPVC                       */

function grid() {
  stroke("lightblue");
  let stepx = 10,
    stepy = 10;
  for (let i = 0; i < width; i += stepx) {
    line(i, 0, i, height);
  }
  for (let i = 0; i < height; i += stepy) {
    line(0, i, width, i);
  }
}

// Define variaveis globais
let lives;
let inicio = 0;
let system2 = [];
let base;
let bola;
let toques = 0;
let concluido;
let coracao;
let imgjogo;
let pontuacao;
let nivelBlocos = 1;
let pecas = [];
let brickRowCount;
//let brickColumnCount = 14;
let brickColumnCount = 8;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
let button;
//Pause variables
let pause;
let oldspeedX;
let oldspeedY;

//ficheiros de audio (.mp3, .wav)
let somFundo, somSalto, somVitoria, hitSound, somBackground;

//preload
function preload() {
  //fonte de texto
  imgjogo = loadImage("media/game.png");
  fonteTexto = loadFont("media/Fonte.ttf");
  //o audio devera ser pre-carregado para depois ser ativado
  soundFormats("mp3", "wav", "ogg");
  somVitoria = loadSound("media/LevelWin.mp3");
  somDerrota = loadSound("media/LevelLost.mp3");
  hitSound = loadSound("media/hit_sound.wav");
  somBackground = createAudio("media/background.wav");
}

function carregaMedia() {
  coracao = loadImage("media/heart.png");
}

//permite carregar o texto
function desenhaTexto() {
  push();
  textAlign(LEFT);
  fill(255);

  textFont(fonteTexto);
  textSize(25);
  text("Pontuacão: ", width - 300, 20);
  fill(255, 255, 0);
  text(bola.pontos, width - 225, 20);
  pop();
}

function setup() {
  //var cnv = createCanvas(1240, 650);
  var cnv = createCanvas(720, 550);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;

  cnv.position(x, y);

  button = createButton("Iniciar Jogo");
  //button.mouseClicked(moveButton);
  button.size(200, 40);

  button.position(x + 260, y + 300);
  button.style("font-family", "Bodoni");
  button.style("font-size", "18px");
  button.mousePressed(IniciaJogo);

  grid();

  frameRate(60);

  pontuacao = 0;

  initJogo();

  somBackground.volume(0.1);
  somBackground.loop();
}

function initJogo() {
  brickRowCount = nivelBlocos;
  vidas = new Vidas(3);
  concluido = 0;
  pause = false;
  // Criar a Base
  base = new Base();
  base.move(mouseX);
  // Criar a bola
  bola = new Bola(width / 2, height / 2);
  bola.pontos = pontuacao;
  // Criar pecas no Jogo
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      pecas.push(new Pecas(c, r, toques));
    }
  }

  carregaMedia();
}
function IniciaJogo() {
  button.hide();
  inicio = 1;
}

function draw() {
  {
    if (inicio == 0) {
      push();

      background(232);

      image(imgjogo, width / 2 - 75, 100, 130, 100);

      textAlign(CENTER);
      textFont(fonteTexto);
      textSize(100);
      text("Pong Game", width / 2, 75);

      textAlign(CENTER);
      textFont(fonteTexto);
      textSize(20);
      text("ESTG-IPVC", width / 2, height - 120);
      textAlign(CENTER);
      textFont(fonteTexto);
      textSize(20);
      text("Programação de Interfaces Visuais", width / 2, height - 100);
      textAlign(CENTER);
      textFont(fonteTexto);
      textSize(20);

      text(
        "Destrua todos os blocos, cada bloco só desaparece com 3 toques.",
        width / 2,
        height - 300
      );
      textAlign(CENTER);
      textFont(fonteTexto);
      textSize(20);
      text("João Miranda Nº23416 | Miguel Lima Nº3310", width / 2, height - 50);
      button.show();

      pop();
    } else {
      button.hide();
      concluido = 0;
      background(0);

      for (let i = 0; i < pecas.length; i++) {
        if (pecas[i].active) {
          concluido = 1;
        }
      }

      if (vidas.numLives != 0 && concluido != 0) {
        // Desenha a Base
        base.show();
        // Desenha a Bola
        bola.show();
        // Atualiza a Posição da Bola
        bola.update();
        // Verifica se existem colisões
        bola.collide(base);
        for (let i = 0; i < pecas.length; i++) {
          if (pecas[i].active) {
            bola.collide(pecas[i]);
            pecas[i].show();
            concluido++;
          }
          if (pecas[i].particulas == 1) {
            system2.push(new ParticleSystem(createVector(bola.x, bola.y)));
            for (let i = 0; i < 5; i++) {
              system2[system2.length - 1].addParticle();
            }
            pecas[i].particulas = 0;
          }
        }
        for (let i = 0; i < system2.length; i++) {
          system2[i].run();
        }

        vidas.show();
        desenhaTexto();

        pontuacao = bola.pontos;
        ganharJogo();
        perderJogo();

        //Verificar se o jogo está em Pausa
        if (pause == false) {
          oldspeedX = bola.speedX;
          oldspeedY = bola.speedY;
          //Mover a base consoante movimento do rato
          base.move(mouseX);
        } else {
          push();
          textAlign(CENTER);
          textFont(fonteTexto);
          textSize(30);
          fill(255);
          strokeWeight(1);
          stroke(0);
          text("JOGO EM PAUSA", width / 2, height / 2);
          pop();
        }
      } else if (vidas.numLives <= 0) {
        push();
        textAlign(CENTER);
        textFont(fonteTexto);
        textSize(30);
        background(153, 0, 0);
        fill(255);
        text("GAME OVER", width / 2, height / 2);
        fill(255, 191, 0);
        text("Pontuação:" + pontuacao, width / 2, height / 2 + 50);
        fill(255);
        text(
          "Pressione uma tecla para jogar novamente.",
          width / 2,
          height / 2 + 100
        );
        pop();
      } else if (concluido == 0) {
        push();
        textAlign(CENTER);
        textFont(fonteTexto);
        textSize(30);
        background(54, 90, 43);
        fill(255);
        text("NIVEL CONCLUÍDO", width / 2, height / 2);
        fill(255, 191, 0);
        text("Pontuação:" + pontuacao, width / 2, height / 2 + 50);
        fill(255);
        text(
          "Pressione uma tecla para jogar o proximo nivel.",
          width / 2,
          height / 2 + 100
        );
        pop();
      }
    }
  }
}

//função ativada com o "pressionar" das teclas
function keyPressed() {
  //permite reiniciar o jogo após um click
  if (vidas.numLives <= 0) {
    nivelBlocos = 1;
    pontuacao = 0;
    initJogo();
  } else if (concluido == 0) {
    nivelBlocos++;
    initJogo();
  }

  print(key, " ", keyCode);

  if (keyCode == "80") {
    if (pause == false) {
      bola.speedX = 0;
      bola.speedY = 0;
      pause = true;
    } else {
      print("unpause");
      bola.speedX = oldspeedX;
      bola.speedY = oldspeedY;
      pause = false;
    }
  }
}

//Permite que seja tocada uma musica caso o jogador passe o nível
function ganharJogo() {
  if (concluido == 0) {
    somVitoria.play();
  }
}

//Permite que seja tocada uma musica caso o jogador perca o jogo
function perderJogo() {
  if (vidas.numLives <= 0) {
    somDerrota.play();
  }
}

//necessário para ativar o áudio após click no canvas
function touchStarted() {
  if (getAudioContext().state != "running") {
    getAudioContext().resume();
  }
}
