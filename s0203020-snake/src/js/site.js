let direction = "right";
const snakeBodyParts = new Array();
let id = 0;
let score = 0;

$(".game-container").prepend('<div class="container-snake-body"></div>');
snakeBodyParts.push($(".container-snake-body"));
$(".snake-logo").hover(function (e) {
    $(".snake-logo").animate({ left: "90%" }, 1000, function () {
        $(this).addClass("flipped");
        $(".snake-logo").animate({ left: "0%" }, 1000, function () { $(this).removeClass("flipped"); });
    });
});


$(document).keydown(e => {
    if (e.code === "ArrowLeft" && direction !== "right")
        direction = "left";

    else if (e.code === "ArrowUp" && direction !== "down")
        direction = "up";

    else if (e.code === "ArrowRight" && direction !== "left")
        direction = "right";

    else if (e.code === "ArrowDown" && direction !== "up")
        direction = "down";

});



moveSnake = () => {
    if (direction === "right") {
        snakeBodyParts[0].css("left", "+=10px");
    } else if (direction === "left") {
        snakeBodyParts[0].css("left", "-=10px");
    } else if (direction === "up") {
        snakeBodyParts[0].css("top", "-=10px");
    } else if (direction === "down") {
        snakeBodyParts[0].css("top", "+=10px");
    }
    var offsetBody = snakeBodyParts[snakeBodyParts.length - 1].offset();
    if (snakeHitItself()) {
        clearInterval(gameSpeed);
    }
    if (appleIsEaten()) {
        spawnApple();
        growSnakeBody(offsetBody);
        score += Math.round(50 * Math.log(snakeBodyParts.length));
        $(".score").html("Score: " + score)

    };
    moveBody();
}

snakeHitItself = () => {
    for (let i = 1; i < snakeBodyParts.length; i++) {
        if (isHeadHittingBody(snakeBodyParts[i].offset().top, snakeBodyParts[i].offset().left)) {
            return true;
        }
    }
    return false;
}

isHeadHittingBody = (bodyPartTop, bodyPartLeft) => {
    return snakeBodyParts[0].offset().top === bodyPartTop && snakeBodyParts[0].offset().left === bodyPartLeft;
}

growSnakeBody = position => {
    $(".container-snake-body").append('<div id="' + id + '" style="left:' + (position.left + 10) + 'px;top:' + (position.top) + 'px;height:10px;width:10px;background-color: greenyellow; position:fixed;"></div>');
    snakeBodyParts.push($("#" + id));
    id++;
}

moveBody = () => {
    if (snakeBodyParts.length > 1) {
        var x = snakeBodyParts[1].offset();
        snakeBodyParts[1].css("left", snakeBodyParts[0].offset().left);
        snakeBodyParts[1].css("top", snakeBodyParts[0].offset().top);
    }

    for (let i = 1; i < snakeBodyParts.length - 1; i++) {
        var y = snakeBodyParts[i + 1].offset();
        snakeBodyParts[i + 1].css("left", x.left);
        snakeBodyParts[i + 1].css("top", x.top);
        x = y;
    }
}

spawnApple = () => {
    let randL = Math.round((Math.random() * 99) + 1);
    let randT = Math.round((Math.random() * 99) + 1);
    $(".container-fruit-body").css("top", randT + "%");
    $(".container-fruit-body").css("left", randL + "%");
}

appleIsEaten = () => {
    var applePos = $(".container-fruit-body").position();
    var snakeHeadPos = $(".container-snake-body").position();
    return isSnakeOnTheApple(applePos, snakeHeadPos)
}

isSnakeOnTheApple = (applePos, snakeHeadPos) => {
    return applePos.top <= snakeHeadPos.top + 10 && applePos.top >= snakeHeadPos.top - 10 && applePos.left <= snakeHeadPos.left + 10 && applePos.left >= snakeHeadPos.left - 10;
}

var gameSpeed = setInterval(moveSnake, 30);

// Let user decide the speed. (make a textbox to use this);
setGameSpeed = (pSpeed) => {
    gameSpeed = pSpeed;
}
