
var gridData = []; //store map's information

//rows and columns
var tr = 18;
var td = 18;

//snake's body size

var snakeHead = 35;
var snakeBody = 35;

//Time Limit: 180 seconds
var clock;
var second = 180;

//re-calculate the new position of the snake after it moves
var directionNum={
    left : {x : -1, y : 0, flag: 'left' },
    right : {x : 1, y : 0, flag: 'right' },
    top : {x : 0, y : -1, flag: 'top' },
    bottom : {x : 0, y : 1, flag: 'bottom' },
}
//configure for snake

var xpos = Math.floor(Math.random()*24);
var ypos = Math.floor(Math.random()*24);


var snake = {
    direction : directionNum.right,
    //initial position
    snakePos: [
        {x:xpos,y:ypos,domContent:"",flag:'body'},
        {x:xpos+1,y:ypos,domContent:"",flag:'head'},
    ]
}

//configure food
var food = {
    x:0, y:0, domContent:"", score:2
}



/*class foods{
    constructor(name,x,y,score,domContent) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.score = score;
        this.domContent = domContent;
    }

    getScore(){
        return this.score;
    }

    addScore(newScore){
        return this.score + newScore;
    }
}

 */

var ball2 = {x : 0, y : 0, score : 2,domContent: document.createElement("div")};

var ball4 = {x : 0, y : 0, score : 4,domContent: document.createElement("div")};

var ball8 = {x : 0, y : 0, score : 8,domContent: document.createElement("div")};

var ball16 = {x : 0, y : 0, score : 26,domContent: document.createElement("div")};

var ball32 = {x : 0, y : 0, score : 32,domContent: document.createElement("div")};

var ball64 = {x : 0, y : 0, score : 64,domContent: document.createElement("div")};

var ball128 = {x : 0, y : 0, score : 128,domContent: document.createElement("div")};

var ball256 = {x : 0, y : 0, score : 256,domContent: document.createElement("div")};

var ball512 = {x : 0, y : 0, score : 512,domContent: document.createElement("div")};

var ball1024 = {x : 0, y : 0, score : 1024,domContent: document.createElement("div")};

var ball2048 = {x : 0, y : 0, score : 2048,domContent: document.createElement("div")};

ball2.domContent.style.width = snakeBody + "px";
ball2.domContent.style.height = snakeBody + "px";
ball2.domContent.style.position = "absolute";
ball2.domContent.style.background = `
            url("/images/present2.png") center/contain no-repeat
        `;

ball4.domContent.style.width = snakeBody + "px";
ball4.domContent.style.height = snakeBody + "px";
ball4.domContent.style.position = "absolute";
ball4.domContent.style.background = `
            url("/images/present4.png") center/contain no-repeat
        `;

ball8.domContent.style.width = snakeBody + "px";
ball8.domContent.style.height = snakeBody + "px";
ball8.domContent.style.position = "absolute";
ball8.domContent.style.background = `
            url("/images/present8.png") center/contain no-repeat
        `;

ball16.domContent.style.width = snakeBody + "px";
ball16.domContent.style.height = snakeBody + "px";
ball16.domContent.style.position = "absolute";
ball16.domContent.style.background = `
            url("/images/present16.png") center/contain no-repeat
        `;

ball32.domContent.style.width = snakeBody + "px";
ball32.domContent.style.height = snakeBody + "px";
ball32.domContent.style.position = "absolute";
ball32.domContent.style.background = `
            url("/images/present32.png") center/contain no-repeat
        `;

ball64.domContent.style.width = snakeBody + "px";
ball64.domContent.style.height = snakeBody + "px";
ball64.domContent.style.position = "absolute";
ball64.domContent.style.background = `
            url("/images/present64.png") center/contain no-repeat
        `;

ball128.domContent.style.width = snakeBody + "px";
ball128.domContent.style.height = snakeBody + "px";
ball128.domContent.style.position = "absolute";
ball128.domContent.style.background = `
            url("/images/present128.png") center/contain no-repeat
        `;

ball256.domContent.style.width = snakeBody + "px";
ball256.domContent.style.height = snakeBody + "px";
ball256.domContent.style.position = "absolute";
ball256.domContent.style.background = `
            url("/images/present256.png") center/contain no-repeat
        `;

ball512.domContent.style.width = snakeBody + "px";
ball512.domContent.style.height = snakeBody + "px";
ball512.domContent.style.position = "absolute";
ball512.domContent.style.background = `
            url("/images/present512.png") center/contain no-repeat
        `;

ball1024.domContent.style.width = snakeBody + "px";
ball1024.domContent.style.height = snakeBody + "px";
ball1024.domContent.style.position = "absolute";
ball1024.domContent.style.background = `
            url("/images/present1024.png") center/contain no-repeat
        `;

ball2048.domContent.style.width = snakeBody + "px";
ball2048.domContent.style.height = snakeBody + "px";
ball2048.domContent.style.position = "absolute";
ball2048.domContent.style.background = `
            url("/images/present2048.png") center/contain no-repeat
        `;

var foodArray = new Array();

foodArray = [ball2,ball4,ball8,ball16,ball32,ball64,ball128,ball256,ball512,ball1024,ball2048];

var tempArray = new Array();
tempArray = [];

//score for the game

var score = 2;

var countFood = 0;


var movingRate = null;

var randomNum1 = Math.floor(Math.random()* foodArray.length);

var randomNum2 = Math.floor(Math.random()* foodArray.length);