var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function () {
  if (!started) {
    $("#app-level").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function playSound(name) {
  var audio = new Audio("/app/public/sounds/" + name + ".mp3");
  audio.play();
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#app-level").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(200)
    .fadeOut(200)
    .fadeIn(200);
  playSound(randomChosenColour);
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setInterval(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 200);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    $("#app-level").text("Correct!");
    setTimeout(function () {
      $("#app-level").text("Level " + level);
    }, 1000);

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    startOver();
    $("#app-level").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    var wrong = new Audio("/app/public/sounds/wrong.mp3");
    wrong.play();
  }
}

function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
}
