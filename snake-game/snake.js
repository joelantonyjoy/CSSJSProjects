var canvas = document.getElementById("canvas");
var ctxt = canvas.getContext('2d');
var width= canvas.width/19;
var height = canvas.height/19;
var food_image = new Image();
food_image.src = 'food.png';
var food = {};
food_image.onload = function(){
    food.x=Math.floor(Math.random()*19);
        food.y=Math.floor(Math.random()*19);
        ctxt.drawImage(food_image, width*food.x, height*food.y, width, height);
}
var snake = [
    {   'x' : 5 * width,
        'y' : 10 * height
    },
    {   'x' : 4 * width,
        'y' : 10 * height
    },
    {   'x' : 3 * width,
        'y' : 10 * height
    },
    {   'x' : 2 * width,
        'y' : 10 * height
    }
];
document.addEventListener('keydown',moveSnake);
function moveSnake(e){
    if(e.keyCode==37 && direction!='RIGHT'){
        direction = 'LEFT';
    } else if(e.keyCode==38 && direction!='DOWN'){
        direction = 'UP';
    }else if(e.keyCode==39 && direction!='LEFT'){
        direction = 'RIGHT';
    }else if(e.keyCode==40 && direction!='UP'){
        direction = 'DOWN';
    }
}
var direction = 'RIGHT';
var interval = setInterval(draw,150);
draw();
function draw(){
    if( snake[0].x >= 19*width || 
        snake[0].x < 0 || 
        snake[0].y >= 19*height || 
        snake[0].y < 0){
        alert("Game over");
        clearInterval(interval);
   } else{
    for (var i = 0 ; i <snake.length;i++){
        var posX = snake[i].x;
        var posY = snake[i].y;
        ctxt.fillStyle = i==0?'green':'yellow';
        ctxt.fillRect(posX,posY,width,height)
    }
    if(food.x*width == snake[0].x && snake[0].y == food.y*height){
        snake.push(snake[snake.length-1]);
        food.x=Math.floor(Math.random()*19);
        food.y=Math.floor(Math.random()*19);
        ctxt.drawImage(food_image, width*food.x, height*food.y, width, height);
    }else{
        if(direction == 'RIGHT'){
        var headX = snake[0].x;
        var headY = snake[0].y;
        snake.unshift({'x':headX+width,'y':headY});
        var tail = snake.pop();
        ctxt.clearRect(tail['x'],tail['y'],width,height);
    } else if(direction == 'LEFT'){
        var headX = snake[0].x;
        var headY = snake[0].y;
        snake.unshift({'x':headX-width,'y':headY});
        var tail = snake.pop();
        ctxt.clearRect(tail['x'],tail['y'],width,height);
    } else if(direction == 'UP'){
        var headX = snake[0].x;
        var headY = snake[0].y;
        snake.unshift({'x':headX,'y':headY-height});
        var tail = snake.pop();
        ctxt.clearRect(tail['x'],tail['y'],width,height);
    } else if(direction == 'DOWN'){
        var headX = snake[0].x;
        var headY = snake[0].y;
        snake.unshift({'x':headX,'y':headY+height});
        var tail = snake.pop();
        ctxt.clearRect(tail['x'],tail['y'],width,height);
    }
    }
}
}