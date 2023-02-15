

/**
 * method to draw a snake
 * @param snake
 */

function drawSnake(snake){
    for (var i = 0; i < snake.snakePos.length; i++){
        if(!snake.snakePos[i].domContent){
            snake.snakePos[i].domContent =document.createElement("div");
            snake.snakePos[i].domContent.style.position = "absolute";
            snake.snakePos[i].domContent.style.width = snakeBody + "px";
            snake.snakePos[i].domContent.style.height = snakeBody + "px";
            snake.snakePos[i].domContent.style.left = snake.snakePos[i].x * snakeBody + "px";
            snake.snakePos[i].domContent.style.top = snake.snakePos[i].y * snakeBody + "px";

            if(snake.snakePos[i].flag === 'head'){
                //snake's head
                snake.snakePos[i].domContent.style.background =`
                    url("/images/boat.png") center/contain no-repeat
                `;
                //according to the direction, rotate the head
                switch(snake.direction.flag){
                    case 'top':{
                        snake.snakePos[i].domContent.style.transform = `
                            rotate(-90deg)
                        `;
                        break;
                    }
                    case 'bottom':{
                        snake.snakePos[i].domContent.style.transform = `
                            rotate(90deg)
                        `;
                        break;
                    }
                    case 'left':{
                        snake.snakePos[i].domContent.style.transform = `
                            rotate(180deg)
                        `;
                        break;
                    }
                    case 'right':{
                        snake.snakePos[i].domContent.style.transform = `
                            rotate(0deg)
                        `;
                        break;
                    }
                }
            }else {
                //snake's body
                snake.snakePos[i].domContent.style.background =`
                    url("/images/present2.png") center/contain no-repeat
                `;
                //snake.snakePos[i].domContent.style.borderRadius = '50%';
            }
        }
        //add dom element to container
        document.querySelector(".container").append(snake.snakePos[i].domContent);
    }
}

/**
 *
 * initiate foods
 */
function drawFood(){
    //1.random the location for foods
    //2. not able to exceed the area and the location of the snake body

    while(true){
        var isRepeat = false;
        randomNum1 = Math.floor(Math.random()* foodArray.length);
        food.x = Math.floor(Math.random()* tr);
        food.y = Math.floor(Math.random()* tr);
        for(var i = 0; i < snake.snakePos.length;i++){
            if(snake.snakePos[i].x === food.x && snake.snakePos[i].y === food.y){
                //snake's body conflict with food
                isRepeat = true;
                break;
            }
        }
        if(!isRepeat){
            //go out from while loop
            break;
        }
    }
    //otherwise, the food location is okay

    document.querySelector('.container').append(food.domContent);


    food.domContent.style.left = food.x * snakeBody +"px";
    food.domContent.style.top = food.y * snakeBody +"px";


    //TODO: draw another food after every 10 seconds
    // while(second > 0){

    //     if(second % 10 === 0) {
    //         food.x = Math.floor(Math.random() * tr);
    //         food.y = Math.floor(Math.random() * tr);
    //         for (var j = 0; j < snake.snakePos.length; j++) {
    //             if (snake.snakePos[j].x === food.x && snake.snakePos[j].y === food.y) {
    //                 //snake's body conflict with food
    //                 isRepeat = true;
    //                 break;
    //             }
    //         }
    //         if(!isRepeat){
    //             //go out from while loop
    //             break;
    //         }
    //     }


    //     document.querySelector('.container').append(foodArray[randomNum2].domContent);


    //     food.domContent.style.left = foodArray[randomNum2].x * snakeBody +"px";
    //     foodArray[randomNum2].domContent.style.top = foodArray[randomNum2].y * snakeBody +"px";
    // }
}

/*
* Timer functions
* */

function resetTimer(){
    clearInterval(clock);
    second = 180;
    document.getElementById('timeValue').innerHTML=second;
}

function startTimer()
{
    clock=setInterval(timer,1000);
}

function stopTimer() {
    clearInterval(clock);
    document.getElementById('timeValue').innerHTML=second;
}
function timer(){
    second-=1;
    document.getElementById('timeValue').innerHTML=second;
}


/*
*initialize function for game
 */
function initGame(){
    startTimer();
    //1.map
    for (var i = 0; i < tr; i++){
        for(var j = 0; j < td; j++){
            gridData.push({
               x : j,
               y : i
            });
        }
    }
    //console.log(gridData);
    //2.initialize snake
    drawSnake(snake);
    //3.initialize food
    drawFood();
}

function isCollide(newHead){
    var collideCheckInfo = {
        isCollide : false,
        isEat : false
    }
    //check the collision to the wall
    if(newHead.x < 0 || newHead.x >=td || newHead.y < 0 || newHead.y >= tr){
        collideCheckInfo.isCollide = true;
        return collideCheckInfo;
    }
    //check the collision to itself
    for(var i = 0; i < snake.snakePos.length; i++){
        if(snake.snakePos[i].x === newHead.x && snake.snakePos[i].y===newHead.y){
            collideCheckInfo.isCollide = true;
            return collideCheckInfo;
        }
    }
    //check if it eats something

    if(newHead.x===food.x && newHead.y===food.y){
        collideCheckInfo.isEat = true;
        score = score + 2;
    }


    return collideCheckInfo;
}


function snakeMove(){
    //switch old head to body
    var oldHead = snake.snakePos[snake.snakePos.length - 1];

    //according to direction, calculate a new position of the snake.

    var newHead = {
        domContent : "",
        x: snake.snakePos[snake.snakePos.length - 1].x + snake.direction.x,
        y: snake.snakePos[snake.snakePos.length - 1].y + snake.direction.y,
        flag : 'head'
    }
    var collideCheckResult = isCollide(newHead);
    if(collideCheckResult.isCollide || second == 0){
        //collide the wall
        stopTimer();
        if(window.confirm(`
            GAME OVER! Your score is: ${score}. Would you like to restart?
        `)){
            //restart the game
            document.querySelector('.container').innerHTML = `
                <button class="startBtn" style = "display: none"></button>
                <button class="pauseBtn" style = "display: none"></button>
            `;
            resetTimer();
            score = 2;
            snake = {
                direction : directionNum.right,
                //initial position
                snakePos: [
                    {x:xpos,y:ypos,domContent:"",flag:'body'},
                    {x:xpos+1,y:ypos,domContent:"",flag:'head'},
                ]
            }
            ball2 = {
                x:0, y:0, domContent:document.createElement("div")
            }
            initGame();
        }else{
            //game over
            document.onkeydown = null;
            clearInterval(movingRate);
        }
        return;
    }
    //if the snake eat something, the old head will become its body, and a new head will appear.
    oldHead.flag = 'body';
    oldHead.domContent.style.background = `
         url("/images/present2.png") center/contain no-repeat`
    ;
    //oldHead.domContent.style.borderRadius = "50%";
    snake.snakePos.push(newHead);
    //determine whether eat something
    if(collideCheckResult.isEat){
        //regenerate a new food
        drawFood();
    }else{
        //not eat a food, eliminate the last one
        document.querySelector(".container").removeChild(snake.snakePos[0].domContent);
        snake.snakePos.shift();
    }
    drawSnake(snake);
}

function startGame(){
    movingRate = setInterval(function () {
        snakeMove()
    },500)
}

function bindEvent(){
    //keyboard actions: press w,s,a,d so that the snake can move
    document.onkeydown = function (e){
        if((e.key==="ArrowUp" || e.key.toLowerCase() === "w") && snake.direction.flag !== "bottom"){
            //user press up
            snake.direction = directionNum.top;
        }
        if((e.key==="ArrowDown" || e.key.toLowerCase() === "s") && snake.direction.flag !== "up"){
            //user press down
            snake.direction = directionNum.bottom;
        }
        if((e.key==="ArrowLeft" || e.key.toLowerCase() === "a") && snake.direction.flag !== "right"){
            //user press left
            snake.direction = directionNum.left;
        }
        if((e.key==="ArrowRight" || e.key.toLowerCase() === "d") && snake.direction.flag !== "left"){
            //user press right
            snake.direction = directionNum.right;
        }
        snakeMove();
    }
    //use timer to get the snake's movement
    startGame();

    //click the map to pause the game


    //when clicking the container, it can start or pause the game
    document.querySelector('.container').onclick = function (e){
        //check whether the user click the button or the whole container
        if(e.target.className === "container"){
            document.querySelector('.pauseBtn').style.display = 'block';
            stopTimer();
            clearInterval(movingRate);
        }else{
            document.querySelector('.pauseBtn').style.display = 'none';
            startTimer();
            startGame();
        }
    }

}

/**
 * main function for the game
 * */

function main(){
    //start the game button
    document.querySelector('.startBtn').onclick = function (e){

        e.stopPropagation();
        //initialize the game
        document.querySelector('.startBtn').style.display = 'none';
        initGame();
        //bind event
        bindEvent();
    }
}
main();