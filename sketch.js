//Create variables here
var dog,happyDog,database,foodS,foodStock,dogImg,dogImg1,milkImg
var feed,addFood,feedDog,addTheFood
var lastFed,fedTime
var foodObj
function preload()
{
  //load images here
  dogImg=loadImage("images/dogImg.png")
  dogImg1=loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);
  dog=createSprite(200,200,10,10)
  dog.addImage("dog",dogImg)
  dog.addImage("dog1",dogImg1)
  dog.scale=0.3
  foodObj=new Food()
  database=firebase.database()
  console.log(database)
 

  feed=createButton("Feed the dog")
  feed.position(500,95)
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food")
  addFood.position(600,95)
  addFood.mousePressed(addTheFood)
}


function draw() {  
 background(46,139,87)
 foodObj.display()
 foodStock=database.ref("Food")
 foodStock.on("value",getFoodStock)
 fedTime=database.ref("FeedTime")
 fedTime.on("value",function(data){
   lastFed=data.val()
 })
 fill(255,255,254)
 textSize(15)
 if(lastFed>=12){
   text("LastFed:"+lastFed%12+"PM",350,30)
 }else if(lastFed==0){
   text("last Fed:12 AM",350,30)
 }else{
   text("Last Fed:"+lastFed+"AM",350,30)
 }
  drawSprites();
  //

}
 function getFoodStock(data){
   foodS=data.val();
 }

 function updateFoodStock(x){
   database.ref('/').update({
     Food:x
   })
 }

 function deductFoodStock(x){
  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.changeImage("dog1",dogImg1)
  
 // updateFoodStock(foodS-1)
 foodS=foodS-1
 console.log(foodS)
  database.ref("/").update({
    Food:foodS,
    fedTime:hour()
  })
}

function addTheFood(){
  foodS++
  database.ref("/").update({
    Food:foodS
  })
}



