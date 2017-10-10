var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var playerX = (canvas.width / 2) - 10;
var playerY = (canvas.height / 2) - 25;

var playerImg = document.getElementById("human");
var zombieImg = document.getElementById("zombie");

var zombieX = [25,155,200,400];
var zombieY = [25,155,200,400];
var bulletArr = [[]];

var framesSurvived = 0;

context.drawImage(playerImg, playerX, playerY, 50, 50);
window.addEventListener("keydown", movePlayer);
canvas.addEventListener("mousedown", startShooting);

context.fillStyle = "yellow";

window.setInterval(function(){
    playerMoved = false;
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.drawImage(playerImg, playerX, playerY, 50, 50);
    drawBullets();
    drawZombies(zombieX, zombieY);

    checkKill();


    updateZombies();
    spawnZombies();
    framesSurvived += 1;
}, 1000 / 24);

function movePlayer(e) {
    switch (e.keyCode) {

        case 37:                // left arrow
        case 65:
            if (playerX > 0) {
                playerX -= 5;
            }
            break;
        case 38:                // up arrow
        case 87:
            if (playerY > -10) {
                playerY -= 5;
            }
            break;
        case 39:                // right arrow
        case 68:
            if (playerX < canvas.width - 20) {
                playerX += 5;
            }
            break;
        case 40:                // down arrow
        case 83:
            if (playerY < canvas.height - 45) {
                playerY += 5;
            }
            break;
    }
}

function drawZombies(zombieX, zombieY) {
    for (i = 0; i < zombieX.length; i++) {
        context.drawImage(zombieImg, zombieX[i], zombieY[i], 50, 50);
    }
}

function updateZombies() {
    for (i = 0; i < zombieX.length; i++) {
        var collision = false;
        var dist = Math.sqrt(Math.pow(playerY - zombieY[i], 2) + Math.pow(playerX - zombieX[i], 2));
        if (dist < 20) {
            //tune and end game
        }
        proposedX = ( (playerX - zombieX[i]) / (dist / 4));
        proposedY = ( (playerY - zombieY[i]) / (dist / 4));

        for (j = 0; j < zombieX.length; j++) {
            if (Math.abs(proposedX + zombieX[i] - zombieX[j]) < 20 && Math.abs(proposedY + zombieY[i] - zombieY[j]) < 20) {
                if (j != i) {
                    collision = true;
                    break;
                }
            }
        }
        if (!collision) {
            zombieX[i] += proposedX;
            zombieY[i] += proposedY;
        }
        else if (collision) {
            if (Math.random() < .5) {
                zombieX[i] += (proposedX/Math.abs(proposedX) * 2);
            }
            else {
                zombieY[i] += (proposedY/Math.abs(proposedY) * 2);
            }
        }
    }
}

function spawnZombies(){
    if(framesSurvived % 96 == 0){
        zombieX.push(Math.floor((Math.random() * canvas.width - 20) + 0));
        zombieY.push(0);
    }
    else if(framesSurvived % 72 == 0)
    {
        zombieX.push(0);
        zombieY.push(Math.floor((Math.random() * canvas.height - 45) - 10));
    }
    else if(framesSurvived % 48 == 0)
    {
        zombieX.push(Math.floor((Math.random() * canvas.width - 20) + 0));
        zombieY.push(canvas.height);
    }
    else if(framesSurvived % 24 == 0)
    {
        zombieX.push(canvas.width);
        zombieY.push(Math.floor((Math.random() * canvas.height - 45) - 10));
    }

}


function startShooting(e) {
    dx = e.offsetX - playerX;
    dy = e.offsetY - playerY;
    dist = Math.sqrt(dx*dx + dy*dy);
    var temp = [playerX, playerY, dx/(dist/8), dy/(dist/8)];
    bulletArr.push(temp);
    //alert("bullet array at" + e.offsetX + "   " + e.offsetY);
}

function drawBullets() {
    for (i = 1; i < bulletArr.length; i++) {
        bulletArr[i][0] += bulletArr[i][2];
        bulletArr[i][1] += bulletArr[i][3];
        context.beginPath();
        context.arc(bulletArr[i][0], bulletArr[i][1], 3, 0, 2 * Math.PI);
        context.fill();
    }
}

function checkKill(){
    for(j = 0; j<bulletArr.length; j++) {
        for (i = 0; i < zombieX.length; i++) {
            //console.log("for loop");
            if (bulletArr[j][0] - zombieX[i] < 50 && bulletArr[j][0] - zombieX[i] > 0) {
                //console.log("First part with " + (bulletArr2[0] - zombieX[i]));
                if (bulletArr[j][1] - zombieY[i] < 50 && bulletArr[j][1] - zombieY[i] > 0) {
                    console.log("confirmed kill");
                }
            }
        }
    }
}