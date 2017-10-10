var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

var playerX = (canvas.width / 2) - 10;
var playerY = (canvas.height / 2) - 25;
var playerMovement = [0, 0, 0, 0];

var playerImg = document.getElementById("human");
var zombieImg = document.getElementById("zombie");

//var zombieDied = new Audio('./sounds/zombieNoise.mp3');
var zombieDied = new Audio('./sounds/zombieNoiseCut.mp3');

var zombieX = [175,1400,175,1400];
var zombieY = [25,25,525,525];
var bulletArr = [[]];

var framesSurvived = 0;
var kills = 0;
var moveRate = 10;
var isDead = false;

window.addEventListener("keydown", startPlayerMovement);
window.addEventListener("keyup", stopPlayerMovement);
canvas.addEventListener("mousedown", fireBullet);
canvas.addEventListener("mousedown", startGame);

update_scores();

context.fillStyle = "black";
context.font = "30px Arial";
context.fillText("Click to start game.", 666, 300);

function startGame(){
    canvas.removeEventListener("mousedown", startGame);
    /**
     * Below determines the refresh rate of the game.
     */
    window.setInterval(function(){
        playerMoved = false;
        context.clearRect(0, 0, canvas.width, canvas.height);

        drawPlayer();
        drawBullets();
        drawZombies(zombieX, zombieY);

        checkKill();
        updateScore();

        updateZombies();
        spawnZombies();
        framesSurvived += 1;
    }, 1000 / 24);
}



/** stopPlayerMovement()
 *
 * @param e: event of a key getting let go.
 */
function stopPlayerMovement(e) {
    switch (e.keyCode) {
        case 37: // left arrow
        case 65: // 'a' key
            playerMovement[0] = 0;
            break;
        case 38: // up arrow
        case 87:// 'w' key
            playerMovement[1] = 0;
            break;
        case 39: // right arrow
        case 68: // 'd' key
            playerMovement[2] = 0;
            break;
        case 40: // down arrow
        case 83: // 's' key
            playerMovement[3] = 0;
            break;
    }
}



/**movePlayer()
 * Set the player to move the direction the user decided.
 *
 * @param e: the event of a key being pressed down
 */
function startPlayerMovement(e) {
    switch (e.keyCode) {
        case 37: // left arrow
        case 65: // 'a' key
            playerMovement[0] = 1;
            break;
        case 38: // up arrow
        case 87:// 'w' key
            playerMovement[1] = 1;
            break;
        case 39: // right arrow
        case 68: // 'd' key
            playerMovement[2] = 1;
            break;
        case 40: // down arrow
        case 83: // 's' key
            playerMovement[3] = 1;
    }
}

/** drawPlayer()
 * Moves the player's coordinates in the directions that are active as long as the direction
 * will not put the player off the canvas.
 */
function drawPlayer() {
    if (playerMovement[0] == 1 && playerX > 0) {
        playerX -= moveRate;
    }
    if (playerMovement[1] == 1 && playerY > -10) {
        playerY -= moveRate;
    }
    if (playerMovement[2] == 1 && playerX < canvas.width - 20) {
        playerX += moveRate;
    }
    if (playerMovement[3] == 1 && playerY < canvas.height - 45) {
        playerY += moveRate;
    }
    context.drawImage(playerImg, playerX, playerY, 50, 50);
}

/**drawZombies()
 * Iterates through the zombie array and draws them onto the canvas.
 *
 * @param zombieX: an array containing all of the x coordinates of the zombies on screen
 * @param zombieY: an array containing all of the x coordinates of the zombies on screen
 */
function drawZombies(zombieX, zombieY) {
    for (i = 0; i < zombieX.length; i++) {
        context.drawImage(zombieImg, zombieX[i], zombieY[i], 50, 50);
    }
}

/**updateZombies()
 * Moves the zombies to follow the player. Includes a protocol to handle collisions between zombies.
 */
function updateZombies() {
    for (i = 0; i < zombieX.length; i++) {
        var collision = false;
        var dist = Math.sqrt(Math.pow(playerY - zombieY[i], 2) + Math.pow(playerX - zombieX[i], 2));
        if (dist < 20) {
            if(!isDead) {
                isDead = true;
                alert("You died. Get gooder.\nYou survived " +
                    Math.floor(framesSurvived / 24) + " seconds!");
                highscore(kills);
                window.location.reload();
            }
        }
        proposedX = ( (playerX - zombieX[i]) / (dist / 8));
        proposedY = ( (playerY - zombieY[i]) / (dist / 8));

        for (j = 0; j < zombieX.length; j++) {
            if (Math.abs(proposedX + zombieX[i] - zombieX[j]) < 20 &&
                Math.abs(proposedY + zombieY[i] - zombieY[j]) < 20) {
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

/**spawnZombies()
 * Adds new zombies to the canvas at the edges of the screen.
 */
function spawnZombies(){
    numSpawn = Math.floor(framesSurvived/96);
    if(framesSurvived % 96 == 0){
        for(i = 0; i<numSpawn; i++) {
            zombieX.push(Math.floor((Math.random() * canvas.width - 20) + 0));
            zombieY.push(0);
        }
    }
    else if(framesSurvived % 72 == 0)
    {
        for(i = 0; i<numSpawn; i++) {
            zombieX.push(0);
            zombieY.push(Math.floor((Math.random() * canvas.height - 45) - 10));
        }
    }
    else if(framesSurvived % 48 == 0)
    {
        for(i = 0; i<numSpawn; i++) {
            zombieX.push(Math.floor((Math.random() * canvas.width - 20) + 0));
            zombieY.push(canvas.height);
        }
    }
    else if(framesSurvived % 24 == 0)
    {
        for(i = 0; i<numSpawn; i++) {
            zombieX.push(canvas.width);
            zombieY.push(Math.floor((Math.random() * canvas.height - 45) - 10));
        }
    }

}

/**fireBullet
 * Called when the mouse is clicked. Creates a new bullet that will travel to where
 * the mouse was clicked.
 *
 * @param e: Event of the click; Holds coordinates of the mouse during the event.
 */
function fireBullet(e) {
    dx = e.offsetX - playerX;
    dy = e.offsetY - playerY;
    dist = Math.sqrt(dx*dx + dy*dy);
    //var temp = [playerX, playerY, dx/(dist/18), dy/(dist/18)];
    bulletArr.push([playerX + 25, playerY + 25, dx/(dist/18), dy/(dist/18)]);
    //alert("bullet array at" + e.offsetX + "   " + e.offsetY);
}

/** drawBullets()
 * Iterates through bulletArr and draws each element onto the canvas after updating its position
 * to move towards where the mouse was pointing at when the element was first created.
 */
function drawBullets() {
    for (i = 1; i < bulletArr.length; i++) {
        bulletArr[i][0] += bulletArr[i][2];
        bulletArr[i][1] += bulletArr[i][3];
        context.fillStyle = "yellow";
        context.beginPath();
        context.arc(bulletArr[i][0], bulletArr[i][1], 6, 0, 2 * Math.PI);
        context.fill();
        if(bulletArr[i][0] < -50 || bulletArr[i][0] > canvas.width + 50 || bulletArr[i][1] < -50 || bulletArr[i][1] > canvas.height+50){
            bulletArr.splice(i, 1);
        }
    }
}

/**checkKill()
 * Checks whether or not a bullet has collided with a zombie. Deletes the zombie from the canvas
 * if there is a collision between the bullet and a zombie.
 */
function checkKill(){
    for(j = 0; j<bulletArr.length; j++) {
        for (i = 0; i < zombieX.length; i++) {
            //console.log("for loop");
            if (bulletArr[j][0] - zombieX[i] < 50 && bulletArr[j][0] - zombieX[i] > 0) {
                //console.log("First part with " + (bulletArr2[0] - zombieX[i]));
                if (bulletArr[j][1] - zombieY[i] < 50 && bulletArr[j][1] - zombieY[i] > 0) {
                    zombieX.splice(i, 1);
                    zombieY.splice(i, 1);
                    zombieDied.play();
                    kills += 1;
                    updateScore();
                }
            }
        }
    }
}

/** updateScore()
 * Displays the score (number of zombie kills) the player has earned in the top left of the canvas.
 */
function updateScore() {
    context.fillStyle = "black";
    context.font = "30px Arial";
    context.fillText("Score: " + kills, 30, 50);
}