var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var fedTime,lastFed
//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
 
  createCanvas(1000,400);
  database = firebase.database();

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed = createSprite(800,200,150,150)
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

 
}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  fedTime = database.ref("FeedTime");
  feedTime.on("value",function(data){
    lastfeed = data.val();
  })
 
  //write code to display text lastFed time here
fill(255,255,256);
textSizw(15);

if(lastFed >=12){
  text("last Feed :" +lastFed %12 + "PM",350,30)
}
else if(lastFed == 0){
  text("last feed : 12AM",350,30)
}
 else{
   text("last feed:" + lastfed +"AM",350,30);
 }
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    Food: foodObj.getFoodStock(),
    FeedTime : hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
