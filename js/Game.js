class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100,200)
    car2 = createSprite(300,200)
    car3 = createSprite(500,200)
    car4 = createSprite(700,200)
    cars=[car1,car2,car3,car4];
    car1.addImage(carImg1)
    car2.addImage(carImg2)
    car3.addImage(carImg3)
    car4.addImage(carImg4)
  }

  play(){
    form.hide();
   
    Player.getPlayerInfo();
    player.getFinishedPlayers();
    if(allPlayers !== undefined){
      background(groundImg)
      image(trackImg,0,-displayHeight*5,displayWidth,displayHeight*6)
      var display_position = 130;
      var index = 0
      var x = 175
      var y = 0 
      for(var plr in allPlayers){
        index = index + 1
        x = x + 200
        y = displayHeight - allPlayers[plr].distance
        cars[index - 1].x = x
        cars[index - 1].y = y
        if (plr === "player" + player.index){
          fill("red")
          ellipse(x,y,60,60)
          //cars[index-1].shapeColor ="red"
          camera.position.x = displayWidth/2
          camera.position.y = cars[index - 1].y 
        }else{fill("black")}
        textSize(15);
        text(allPlayers[plr].name + ":" + allPlayers[plr].distance, cars[index - 1].x-20,cars[index - 1].y+70)
      }
    }
        drawSprites();
    if(keyIsDown(UP_ARROW) && player.index !== null&& pastFinish!==true){
      player.distance +=20
      player.update();
    }
  if(player.distance>=4200 && pastFinish===false && finishedPlayers<=4){
    //gameState = 2;
    Player.updateFinishedPlayers()
    player.rank =finishedPlayers;
    player.update();
    pastFinish=true;
   
  }
  }
  end(){
    console.log("Player reached the destination")
         // text("YOU WIN!!", displayWidth/2, displayHeight - allPlayers[plr].distance)
  }
}