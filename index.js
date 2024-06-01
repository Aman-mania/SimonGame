var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var started;
var level=0;
function gameSequence() {
    var rand = Math.floor(Math.random() * 4);
    var randCol = buttonColors[rand];
    gamePattern.push(randCol);
    $("#" + randCol).fadeOut(200).fadeIn(200);
    playSound(randCol);
    animatePress(randCol);
    level++;
    $("#level-title").text("Level "+level);
    console.log(gamePattern);
}

$(document).on("keypress", function(e) {
    switch (e.key) {
        case "Enter":if(started!=true)
                {
                    started=true;
                    gameSequence();
                    $("#level-title").text("Level "+level);
                    $("#inst").text("");
                }
            else{}
            break;
        case "W":
            userSequence("green");
            break;
        case "S":
            userSequence("red");
            break;
        case "A":
            userSequence("yellow");
            break;
        case "D":
            userSequence("blue");
            break;
        default:
            console.log("Wrong key pressed");
            break;
    }
});

$('.btn').click(function() {
    var buttonId = $(this).attr('id');
    userSequence(buttonId);
});

function startOver()
{
    level=0;
    gamePattern.length=0;
    userPattern.length=0;
    started=false;
}
function checkAnswer(current)
{
    if(gamePattern[current]===userPattern[current])
    {
        if (userPattern.length === gamePattern.length)
            {
                setTimeout(function(){gameSequence()},1000);
                userPattern=[];
            }
        console.log("Success");
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Score: "+level);
        $("#inst").text("Game Over, Press Enter to Restart");
        startOver();
        console.log("Wrong");
    }
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


function userSequence(buttonId) {
    userPattern.push(buttonId);
    playSound(buttonId);
    animatePress(buttonId);
    checkAnswer(userPattern.length-1);
    console.log(userPattern);
}

function playSound(name) {
    var audio1 = new Audio("sounds/" + name + ".mp3");
    audio1.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}
