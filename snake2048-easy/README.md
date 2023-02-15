# Snake2048--Easy Version

## 简单版游戏规则：
1. 以2开始，计时180秒。
2. 食物为2，4，8，16，32. 每次只生成一个食物，吃掉一个以后再生成一个新的食物。
3. 如果食物和蛇身的第一个元素相等，则蛇身个数不变，两个元素合并为一个元素（e.g：2+2=4，4为新的蛇身）。如果元素不同，则长度+1
4. 计分规则：所有元素累加在一起。
5. 游戏结束：撞墙、撞身、时间到。


## ACTION NEEDED:

1. Add a timer (Time limit: 180s).（done）

2. Rewrite the score calculation. Total score = sum of scores from all nodes.（done）

3. Replace body with numbers, and also add a score in the head.

4. Revise the mechanism of the game: if eats the same number, the number adds up but the length of change.

 
 
## Coding Part:

### snake.js:
**function drawSnake(snake)**: 

Helper function that generates snake's body and head. The head can also switch the rotation as it moves to different directions.

**function drawFood()**: 

Helper function that randomly distribute the food. The food cannot exceed the boundary or inside the snake's body.

**function initGmae()**: 

Function for initialization. Update map's information to gridData using double for loop. Also use two helper function above.

**function isCollide(newHead)**: 

Helper function that determine whether a snake is collided or not. There are two cases: collide with the wall or collide with itself.
This function also determines whether it eats a food or not: if it eats one, add one point.

**function snakeMove()**:

1. Switch old head to body.
2. According to direction, calculate a new position of the snake.
3. Using helper function to check if it collides or not. If so, pop up a window and notify that game over.
4. determine whether eat something. If the snake eats a food, then the food will be reenerated.

**function startGame()**:

Set the speed that the snake moves.

**function bindEvent()**:

1. keyboard actions: press w,s,a,d so that the snake can move
2. use timer to get the snake's movement
3. click the map to pause the game, and click the pause button to continue.

**function main()**

1. Start with a start game button
2. Call the initialize game function and bind Event function.

### config.js:

Some configuations about the game, including some variables

### index.html

Setup for the html window.

### index.css

Setup for containers and buttons




