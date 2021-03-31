var canvas = document.getElementById("canvas");
var ctxt = canvas.getContext('2d');
var width= canvas.width / 19;
var height = canvas.height / 19;
var snake;

var food_image = new Image();
food_image.src = 'food.png';
var food = {};
food_image.onload = () => loadFood();

initializeSnake();
document.addEventListener('keydown',moveSnake);

var direction = 'RIGHT';
var scoreValue = 0;
var score = document.getElementById('score');
var bestScore = document.getElementById('bestScore');
var bestScoreValue = 0;
loadBestScorefromLocalStorage();
var gameInterval = setInterval(draw,150);
draw();
function draw() {
    if (gameOverConditions()) {
        updateBestScore();
        gameOverPopup();
        clearInterval(gameInterval);
   } else {
       drawSnake();
       if (isFoodEaten()) {
            eatFoodAndUpdateScore();
        } else {
            controlMovements();
        }  
    }
}

//Initialize Snake
function initializeSnake() {
    snake = [
        {   'x' : 5 * width,
            'y' : 10 * height
        },
        {   'x' : 4 * width,
            'y' : 10 * height
        },
        {   'x' : 3 * width,
            'y' : 10 * height
        }
    ];
}

//Draw Snake body
function drawSnake(){
    for (var i = 0 ; i < snake.length; i++) {
        var posX = snake[i].x;
        var posY = snake[i].y;
        ctxt.fillStyle = i == 0 ? 'green' : 'yellow';
        ctxt.fillRect(posX, posY, width, height)
     }
}

//Movemements for snake
function moveSnake(e) {
    if (e.keyCode == 37 && direction != 'RIGHT') {
        direction = 'LEFT';
    } else if (e.keyCode == 38 && direction != 'DOWN') {
        direction = 'UP';
    } else if (e.keyCode == 39 && direction != 'LEFT') {
        direction = 'RIGHT';
    } else if (e.keyCode == 40 && direction != 'UP') {
        direction = 'DOWN';
    }
}

// Load Best Score from localStorage
function loadBestScorefromLocalStorage() {
    if (localStorage.getItem('bestScoreValue') == null) {
        localStorage.setItem('bestScoreValue', 0);
    } else {
        bestScoreValue = localStorage.getItem('bestScoreValue');
        bestScore.innerText = bestScoreValue;
    }
}

//Load food at random position
function loadFood() {
    food.x = Math.floor(Math.random() * 19);
    food.y = Math.floor(Math.random() * 19);
    ctxt.drawImage(food_image, width*food.x, height*food.y, width, height);
}

//Cheack if food is eaten
function isFoodEaten(){
    return snake[0].x == food.x * width && snake[0].y == food.y * height;
}

//Update snake size and score
function eatFoodAndUpdateScore(){
    snake.push(snake[snake.length - 1]);
    loadFood();
    score.innerText = ++scoreValue;
}

//Update Scores on Gameover
function updateBestScore() {
    if (bestScoreValue<scoreValue) {
        bestScoreValue = scoreValue;
        bestScore.innerText = bestScoreValue;
        localStorage.setItem('bestScoreValue', bestScoreValue);
    }
}

//Game over conditions
function gameOverConditions() {
    return snake[0].x >= 19*width || snake[0].x < 0 || snake[0].y >= 19*height || snake[0].y < 0;
}

//Control Movements
function controlMovements(){
    if (direction == 'RIGHT') {
        var headX = snake[0].x;
        var headY = snake[0].y;
        snake.unshift({'x' : headX + width, 'y' : headY});
        var tail = snake.pop();
        ctxt.clearRect(tail['x'], tail['y'], width, height);
    } else if (direction == 'LEFT') {
        var headX = snake[0].x;
        var headY = snake[0].y;
        snake.unshift({'x' : headX - width, 'y' : headY});
        var tail = snake.pop();
        ctxt.clearRect(tail['x'], tail['y'], width, height);
    } else if (direction == 'UP') {
        var headX = snake[0].x;
        var headY = snake[0].y;
        snake.unshift({'x' : headX, 'y' : headY - height});
        var tail = snake.pop();
        ctxt.clearRect(tail['x'], tail['y'], width, height);
    } else if (direction == 'DOWN') {
        var headX = snake[0].x;
        var headY = snake[0].y;
        snake.unshift({'x' : headX, 'y' : headY + height});
        var tail = snake.pop();
        ctxt.clearRect(tail['x'], tail['y'], width, height);
    }
}

function gameOverPopup() {
    alert("Game over!!!!\n\nYour Score is " + scoreValue + "\nBest Score : " + bestScoreValue);
}