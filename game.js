// alert("hello World");

/*

The great majority of web pages don't have any special
requirements that would indicate moving the js to the top.
Therefore, the case that usually works the best
(js at the bottom) should be employed unless something
comes up to invalidate the use of the default. Premature
optimization is spending time worrying about speed. A
default of putting js at the bottom requires not extra
thought or effort.

Top: When having JavaScript events function on elements
immediately is more important (so if you use a DOM Ready
event to load everything, this is the wrong place)

Bottom: When loading the content is more important

*/

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title2").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title2").text("Game Over, Press Any Keyboard Key to Restart");

    //19. Call startOver() if the user gets the sequence wrong.
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];

  level++;

  $("#level-title2").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}