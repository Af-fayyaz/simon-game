document.querySelector(".myButton").addEventListener("click", startgame);


var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = "false"; //To keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var level = 0;
var highscore = 0;
var score = level;

function startgame() {
  if (!started) {
    nextSequence();
    started = true;
  }
}

//jQuery to detect when any of the squares are clicked
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id"); //stores the id of the button that got clicked.
  userClickedPattern.push(userChosenColor); //Add it to the end of userClickedPattern array

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1); //Call checkAnswer(), passing in the index of the last answer in the user's sequence
});



function checkAnswer(currentLevel) {

  //check if the most recent user answer is the same as the game pattern. If true then log "success", otherwise log "wrong"
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    //4. If the user got the most recent answer right, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      if (level > highscore) {
        highscore = level;
      }
      $(".hscore").text("High Score: " + highscore);

      //if current sequence is finished, give another color button:
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  } else {
    console.log("wrong");

    if (score > highscore) {

      score = highscore;

    }
    $(".hscore").text("High Score: " + highscore);

    //Play this sound if the user got the answer wrong.
    var wrong = new Audio("sounds/wrong.ogg");
    wrong.play();

    //apply "game-over" class  then remove it after 200 milliseconds.
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    //Change the h1 title to "Game Over".
    $("h1").text("Game Overt");

    startOver();
  }
}


function nextSequence() {
  //Reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  //increase the level by 1 every time nextSequence() is called
  level++;
  $("#level-title").text("Level " + level); //When the game starts change the h1 tag to the "level"


  //Generate a random number between 0 and 3, and store it in a variable called randomNumber
  var randomNumber = Math.floor(Math.random() * 4);

  //Use the randomNumber to select a random colour from the buttonColours array.
  var randomChoosenColor = buttonColors[randomNumber];

  //Add the randomChosenColour generated to the end of the gamePattern
  gamePattern.push(randomChoosenColor);

  //Use jQuery to select the button with the same id as the randomChosenColour and animate a flash to the button selected
  $("#" + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

//play the corresponding sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".ogg");
  audio.play();
}

//animate the color button pressed
function animatePress(currentColor) {

  //jQuery to add the pressed class to the button that gets clicked
  $("#" + currentColor).addClass("pressed");

  //remove the pressed class after a 100 milliseconds.
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  //reset the values
  level = 0;
  gamePattern = [];
  started = false;
}
