var player,playerAnimation,playerAvatar;

var bgImage,bg;

var invisibleGround;

var obstacle,obstacleGroup,o1,o2;

var coin, coinGroup, coinImage;

var power,powerImage,powerGroup;

var sword,swordImage,swordGroup;
function preload(){
  bgImage=loadImage("assets/bgCity.jpg");

  playerAnimation=loadAnimation("assets/boy1.png","assets/boy2.png","assets/boy3.png","assets/boy4.png","assets/boy5.png","assets/boy6.png","assets/boy7.png")
  playerAvatar=loadAnimation("assets/c0.png","assets/c1.png","assets/c2.png","assets/c3.png","assets/c4.png","assets/c5.png","assets/c6.png","assets/c7.png","assets/c8.png","assets/c9.png","assets/c10.png","assets/c11.png","assets/c12.png","assets/c13.png","assets/c14.png","assets/c15.png", "assets/c16.png")

  o1=loadImage("assets/o1.png");
  o2=loadImage("assets/o2.png");

  coinImage=loadImage("assets/coin.png");

  powerImage=loadImage("assets/powerImg.png");

  swordImage=loadImage("assets/sword.png")

}
function setup(){
createCanvas(windowWidth,windowHeight);

bg=createSprite(width/2,height/2);
bg.addImage(bgImage);



playerAnimation.frameDelay=3;
//playerAvatar.frameDelay=2;
player=createSprite(150,height-350);
player.addAnimation("running",playerAnimation);
player.addAnimation("avatar",playerAvatar)
player.scale=0.7

player.setCollider("rectangle",0,0,350,250)
invisibleGround=createSprite(width/2,height-175,width,20);
invisibleGround.visible=false;

obstacleGroup=new Group();
coinGroup=new Group();
powerGroup=new Group();
swordGroup=new Group();
}
function draw(){
  background(0);
  bg.velocityX=-6;
  if(bg.x<450){
    bg.x=width/2
  }
  if(keyDown("space")){
    player.velocityY=-10;
  }
  player.velocityY+=0.8;

  for(var i=0;i<coinGroup.length;i++){
    if(coinGroup.get(i).isTouching(player)){
      coinGroup.get(i).destroy();
    }
  }

  for(var i=0;i<powerGroup.length;i++){
    if(powerGroup.get(i).isTouching(player)){
      powerGroup.get(i).destroy();
      player.changeAnimation("avatar");
      player.scale=0.9;
    }
  }

  if (keyDown("t")) {
    throwSword();
  }

  spawnCoins();
  spawnObstacles();
  spawnPower();
  player.collide(invisibleGround);


  drawSprites();

}

function spawnObstacles(){
  if(frameCount%120===0){
    obstacle=createSprite(width,height-200);
    var x=Math.round(random(1,2));
    obstacle.velocityX=-6;
    

    if(x==1){
      obstacle.addImage(o1);
      obstacle.scale=0.5;
      obstacle.setCollider("rectangle",0,0,175,175)
    }
    else{
      obstacle.addImage(o2);
      obstacle.scale=0.3;
      obstacle.setCollider("rectangle",0,0,200,200)
    }

    
    obstacle.lifetime=1000;
    obstacleGroup.add(obstacle);
  }


}


function spawnCoins(){
  if(frameCount%60===0){
    coin=createSprite(width,height-200);
    coin.addImage(coinImage)
    coin.y=Math.round(random(height/2-200,height-400))
    coin.velocityX=-6;
    coin.scale=0.15;
    coin.lifetime=1000;
    coinGroup.add(coin);
  }


}

function spawnPower(){
  if(frameCount%620===0){
    power=createSprite(width,height-200);
    power.addImage(powerImage)
    power.y=Math.round(random(height/2-200,height-400))
    power.velocityX=-6;
    power.scale=0.3;
    power.lifetime=1000;
    powerGroup.add(power);
  }


}

function throwSword() {
  sword = createSprite(70, 240, 10, 40);
  sword.addImage(swordImage);
  sword.rotation = -30;
  sword.scale = 0.4;
  sword.velocityY = 1;
  sword.x = player.x;
  sword.y = player.y;
  sword.velocityX = 6;
  sword.lifetime = 80;
  swordGroup.add(sword);
}