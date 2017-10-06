var canvas = document.getElementId("myCanvas");
var context = canvas.getContext('2d');
var playerX = 0;
var playerY = 0;

window.addEventListener("onkeydown", movePlayer, false);

function movePlayer(e) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    switch (e.keyCode) {
        case 37:                // left arrow
            if (x > 0) {
                x -= 5;
            }
            break;
        case 38:                // up arrow
            if (y > 5) {
                y -= 5;
            }
            break;
        case 39:                // right arrow
            if (x < 595) {
                x += 5;
            }
            break;
        case 40:                // down arrow
            if (y < 595) {
                y += 5;
            }
            break;
    }
}