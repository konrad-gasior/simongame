const buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let gamePattern = [];
let level = 0;
let started = false;

$(document).keypress(function() {
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }   
});

$(".btn").click(function() {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    makeSound(userChosenColour);
    animate($("#" + userChosenColour));
    checkAnswer(userClickedPattern.length - 1);                     
});

const checkAnswer = function(currentLevel)
{
    if(userClickedPattern[currentLevel] === (gamePattern[currentLevel]))
    {
        if (userClickedPattern.length === gamePattern.length)
        {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }else{
        makeSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(() => {
        $("body").removeClass("game-over")}, 200);
        startOver(); 
    }
};

const nextSequence = () => {    
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColour);
};

const animate = element => {
    element.addClass("pressed");
    setTimeout(() => {
        element.removeClass("pressed")}, 100);
};

const makeSound = element => {
    let audio = new Audio("sounds/" + element + ".mp3");
    audio.play();
};

const startOver = () => {
    level = 0;
    gamePattern = [];
    started = false;
};