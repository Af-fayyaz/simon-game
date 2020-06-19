document.querySelector(".myButton").addEventListener("click", startgame);


var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
var highscore = 0;
var score = level;

function startgame() {
  if (!started) {
    nextSequence();
    started = true;
  }
}

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});



function checkAnswer(currentLevel) {


  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {


    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      if (level > highscore) {
        highscore = level;
      }
      $(".hscore").text("High Score: " + highscore);

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

    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Start");
    $(".myButton").text("Play Again");

    startOver();
  }

}

function nextSequence() {

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
