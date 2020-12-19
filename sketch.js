
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup;
var score=0;
var lives=0;

var gameState="play";

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImage=loadImage("monkeyBackground.jpg");
  restartImage = loadImage("restart.png");
  gameOverImage = loadImage("gameOver.jpg");
  fallSound = loadSound("monkey_fall.wav");
  jumpSound = loadSound("jumpSound.mp3");
  
 
}



function setup() {
  createCanvas(600,400);
  
  back=createSprite(300,200);
  back.addImage("back",backgroundImage);
  back.x=back.width/2;
  back.velocityX=-4;
  back.velocityX=back.velocityX-(score/15);
  
  monkey=createSprite(100,350,20,20);
  monkey.addAnimation("run",monkey_running);
  monkey.scale=0.1
  monkey.velocityY=12;

  bananaGroup=createGroup();
  obstacleGroup=createGroup();
  
  ground=createSprite(300,390,600,8);
  ground.visible=false;
  
  
  gameOver=createSprite(300,180,10,10);
  gameOver.addImage("over",gameOverImage);
  gameOver.scale=0.25;
  gameOver.visible=false;
  
  restart=createSprite(300,250,10,10);
  restart.addImage("restart",restartImage);
  restart.scale=0.12;
  restart.visible=false;
  
}


function draw() {
  background(999);
  
  
  if(back.x<100){
    back.x=back.width/2;
  }
  
  if(monkey.y<650){
  monkey.velocityY=monkey.velocityY+0.45;
  }
  
  monkey.debug=true;
  monkey.setCollider("circle",0,0,280);
  drawSprites();
  
  if(gameState==="play"){
    
    if(monkey.isTouching(bananaGroup)){
    bananaGroup[0].destroy(); 
    score=score+5;
      
      if(score%20===0){
        monkey.scale=monkey.scale+0.05;
        lives=lives+1;
      }
    }  
    
    monkey.collide(ground);
    
    if(keyWentDown("space")&&monkey.y>340){
      monkey.velocityY=-10;
      jumpSound.play();
    }
    
    
    
    
    banana();
    spawnObstacles();
    
    
     
  }
  
  if(monkey.isTouching(obstacleGroup)&&lives>0){
    lives=lives-1;
    monkey.scale=monkey.scale*0.6  ;
    obstacleGroup.destroyEach();
  }
  if(monkey.isTouching(obstacleGroup)&&lives===0){
    gameState="end";
    fallSound.play();
  }
  if(gameState==="end"){
    
    gameOver.visible=true;
    restart.visible=true;
    
    back.velocityX=0;
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    
    if(mousePressedOver(restart)){
      reset();
    }
    
  }
  
  
  
  
  
  
  textSize(20);
  fill("red");
  text("Score="+score,50,30);
  text("Lives="+lives,400,30);
  
 }

function banana(){
  if(frameCount%Math.round(random(60,100))===0){
   var banana=createSprite(620,Math.round(random(230,300)),20,20);
    banana.addImage("banana",bananaImage);
    banana.scale=0.1
    banana.velocityX=-5;
    bananaGroup.add(banana);
    //banana.debug=true;
    banana.setCollider("rectangle",0,0,500,150);
    banana.velocityX=banana.velocityX - (score/10);
    
  }
}

function spawnObstacles(){
  if(frameCount%100===0){
    obstacle=createSprite(650,380,20,20);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.scale=0.15;
    obstacle.velocityX=-4;
    obstacle.velocityX=obstacle.velocityX-(score/8);
    
    //obstacle.debug=true;
    
    
    obstacleGroup.add(obstacle);
    obstacleGroup.setColliderEach("circle",0,0,200);
  }
}
function reset(){
  gameState="play";
  monkey.y=50;
  back.velocityX=-4;
  score=0;
  gameOver.visible=false;
  restart.visible=false;
}











