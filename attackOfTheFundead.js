var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var playerX = (canvas.width / 2) - 10;
var playerY = (canvas.height / 2) - 25;

var playerImg = document.getElementById("human");
var zombieImg = document.getElementById("zombie");

context.drawImage(playerImg, playerX, playerY, 20, 50);
window.addEventListener("keydown", movePlayer, false);

function movePlayer(e) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    switch (e.keyCode) {
        case 37:                // left arrow
            if (playerX > -0) {
                playerX -= 5;
            }
            break;
        case 38:                // up arrow
            if (playerY > -10) {
                playerY -= 5;
            }
            break;
        case 39:                // right arrow
            if (playerX < canvas.width - 20) {
                playerX += 5;
            }
            break;
        case 40:                // down arrow
            if (playerY < canvas.height - 45) {
                playerY += 5;
            }
            break;
    }
    context.drawImage(playerImg, playerX, playerY, 20, 50);
}