var canvas = document.getElementById("canvas");
var ctxt = canvas.getContext('2d');
var width= canvas.width / 19;
var height = canvas.height / 19;
var snake;

var body_image = new Image();
body_image.src = 'images/body.png';

var right_head_image = new Image();
right_head_image.src = 'images/right-head.png';


var left_head_image = new Image();
left_head_image.src = 'images/left-head.png';

var up_head_image = new Image();
up_head_image.src = 'images/up-head.png';


var down_head_image = new Image();
down_head_image.src = 'images/down-head.png';

var food_image = new Image();
food_image.src = 'images/food.png';

var food = {};
food_image.onload = () => loadFood();

document.addEventListener('keydown',moveSnake);
var score = document.getElementById('score');
var bestScore = document.getElementById('bestScore');

var direction,scoreValue,bestScoreValue;
startGame();
function startGame(){
    scoreValue = 0;
    bestScoreValue = 0;
    loadBestScorefromLocalStorage();
    direction = 'RIGHT';
    initializeSnake();
    var gameInterval = setInterval(draw,150);
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
        if (i == 0) {
            if(direction == 'RIGHT'){
                ctxt.drawImage(right_head_image, posX, posY, width, height);
            } else if(direction == 'UP'){
                ctxt.drawImage(up_head_image, posX, posY, width, height);
            } else if(direction == 'DOWN'){
                ctxt.drawImage(down_head_image, posX, posY, width, height);
            } else if(direction == 'LEFT'){
                ctxt.drawImage(left_head_image, posX, posY, width, height);
            } 
            
        } else {
              ctxt.drawImage(body_image, posX, posY, width, height);
            // ctxt.fillRect(posX, posY, width, height)
        }
        
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
    return snake[0].x >= 19*width || snake[0].x < 0 || snake[0].y >= 19*height || snake[0].y < 0 || isCollision();
}

function isCollision(){
    return JSON.stringify(snake.slice(1)).includes(JSON.stringify(snake[0]));
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
    var popup = document.getElementById('gameOverPopup');
    popup.style.display = "flex";
    popup.children[1].children[0].innerText = scoreValue;
    popup.children[2].children[0].innerText = bestScoreValue;
    var container = document.getElementsByClassName('container')[0];
    container.style.opacity = 0.3;
    ctxt.clearRect(0,0,608,608);
    // alert("Game over!!!!\n\nYour Score is " + scoreValue + "\nBest Score : " + bestScoreValue);
}

function loadNewGame(){
    var popup = document.getElementById('gameOverPopup');
    popup.style.display = "none";
    var container = document.getElementsByClassName('container')[0];
    container.style.opacity = 1;
    score.innerText = 0;
    startGame();
    loadFood()
}