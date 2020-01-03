var direction = "right";
var snakeBodyParts = new Array();
var id = 0;
var score = 0;
$(".game-container").prepend('<div class="container-snake-body"></div>');
snakeBodyParts.push($(".container-snake-body"));
$(".snake-logo").hover(function(e) {
    $(".snake-logo").animate({ left: "90%" }, 1000, function() {
        $(this).addClass("flipped");
        $(".snake-logo").animate({ left: "0%" }, 1000, function() { $(this).removeClass("flipped"); });
    });
});




$(document).keydown(function(e) {
    if ((e.which === 37 || e.which === 97) && direction !== "right")
        direction = "left";

    else if ((e.which === 38 || e.which === 119) && direction !== "down") // up
        direction = "up";

    else if ((e.which === 39 || e.which === 100) && direction !== "left") // right
        direction = "right";

    else if ((e.which === 40 || e.which === 115) && direction !== "up") // down
        direction = "down";

});



function moveSnake() {
    if (direction == "right") {
        snakeBodyParts[0].css("left", "+=10px");
    } else if (direction == "left") {
        snakeBodyParts[0].css("left", "-=10px");
    } else if (direction == "up") {
        snakeBodyParts[0].css("top", "-=10px");
    } else if (direction == "down") {
        snakeBodyParts[0].css("top", "+=10px");
    }
    var offsetBody = snakeBodyParts[snakeBodyParts.length - 1].offset();
    if (snakeHitItself() == true) {
        clearInterval(runGame);
    }
    if (ateApple()) {
        spawnApple();
        addToBody(offsetBody);
        score += 50;
        $(".score").html("Score: " + score)

    };
    moveBody();
}

function snakeHitItself() {
    for (let i = 1; i < snakeBodyParts.length; i++) {
        if (snakeBodyParts[0].offset().top == snakeBodyParts[i].offset().top &&
            snakeBodyParts[0].offset().left == snakeBodyParts[i].offset().left) {
            return true;
        }
    }
    return false;
}

function addToBody(position) {
    $(".container-snake-body").append('<div id="' + id + '" style="left:' + (position.left + 10) + 'px;top:' + (position.top) + 'px;height:10px;width:10px;background-color: greenyellow; position:fixed;"></div>');
    snakeBodyParts.push($("#" + id));
    id++;
}

function moveBody() {
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

function spawnApple() {
    let randL = (Math.random() * 99) + 1;
    let randT = (Math.random() * 99) + 1;
    $(".container-fruit-body").css("top", randT + "%");
    $(".container-fruit-body").css("left", randL + "%");
    console.log("spawned");
}

function ateApple() {
    var applePos = $(".container-fruit-body").position();
    var snakeHeadPos = $(".container-snake-body").position();
    return applePos.top <= snakeHeadPos.top + 10 && applePos.top >= snakeHeadPos.top - 10 && applePos.left <= snakeHeadPos.left + 10 && applePos.left >= snakeHeadPos.left - 10
}

var runGame = setInterval(moveSnake, 30);
