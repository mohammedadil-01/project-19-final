var player;
var player_running;
var bananaImage;
var obstacleImage;
var obstacleGroup;
var foodGroup;
var backround;
var ground;
var score = 0;
var PLAY=1;
var END=0;
var gameState = PLAY;

function preload(){
  
  backgroundImage = loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  
}

function setup() {
  createCanvas(400, 400);
  
  backround = createSprite(200,200);
  backround.addImage(backgroundImage);
  backround.x = backround.width/2;
  backround.velocityX = -4;
  
  player = createSprite(50,380,20,50);
  player.addAnimation("player",player_running);
  player.scale = 0.1;
  
  ground = createSprite(200,395,400,10);
  ground.visible = false;
    
  foodGroup = new Group();
  obstacleGroup = new Group();
  
}

function draw() {
  background(220);

  if(gameState === PLAY){
    
  if(backround.x < 0){
     backround.x = backround.width/2;
    }
    
  if(keyDown("space")){
     player.velocityY = -15;
    }
    
  player.velocityY = player.velocityY + 0.7;
    
  if(foodGroup.isTouching(player)){
     foodGroup.destroyEach();
     score = score+2;
    }
  
  switch(score){
    case 10:player.scale = 0.2;
      break;
      
    case 20:player.scale = 0.3;
      break;
        
    case 30:player.scale = 0.4;
      break;
      
    case 40:player.scale = 0.5;
      break;
      default:break;
  }
    
  Banana();
  obstacles();
    
  if(obstacleGroup.isTouching(player)){
    player.scale = 0.1;
    gameState = END;
  } 
    
}
  if(gameState === END){
    backround.velocityX = 0;
    player.velocityY = 0;
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityEach(0);
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
  }
    
  player.collide(ground);
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score,200,50);
}

function Banana (){
  
  if(frameCount % 80 === 0){
    banana = createSprite(400,0,10,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
    banana.lifetime = 130;
    foodGroup.add(banana);
  }

}

function obstacles (){
  
  if(frameCount % 300 === 0){
    obstacle = createSprite(400,380,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -3;
    obstacleGroup.add(obstacle);
  }
  
} 