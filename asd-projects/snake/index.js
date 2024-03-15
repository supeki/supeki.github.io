/* global $, sessionStorage*/

////////////////////////////////////////////////////////////////////////////////
///////////////////////// VARIABLE DECLARATIONS ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// HTML jQuery Objects
var board = $("#board");
var scoreElement = $("#score");
var highScoreElement = $("#highScore");

// TODO 4a: Create the snake, apple and score variables
// Game Variables
var snake = [];
var apple = [];
var rapple = [];
var score = 0;
var rappletimer = 0;
var rapplertimer = 0;
var snakeinv = 0;

// Constant Variables
var ROWS = 20;
var COLUMNS = 20;
var SQUARE_SIZE = 20;
var KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};

// interval variable required for stopping the update function when the game ends
var updateInterval;

// variable to keep track of the key (keycode) last pressed by the user
var activeKey;

////////////////////////////////////////////////////////////////////////////////
////////////////////////////// GAME SETUP //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// TODO: turn on keyboard inputs
$("body").on("keydown", handleKeyDown);

// start the game
init();

function init() {
  // TODO 4c-2: initialize the snake
  snake.body = [];
  makeSnakeSquare(10, 10);
  snake.head = snake.body[0];
  // TODO 4b-2: initialize the apple
  makeApple();
  makeRainbowApple();
  // TODO 5a: Initialize the interval
  updateInterval = setInterval(update, 100);
}

////////////////////////////////////////////////////////////////////////////////
///////////////////////// PROGRAM FUNCTIONS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/*
 * On each update tick update each bubble's position and check for
 * collisions with the walls.
 */

var colortable = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple"
];

function update() {
  moveSnake();

  if (hasHitWall() || (hasCollidedWithSnake() && !snakeinv)) {
    endGame();
    return;
  }

  if (hasCollidedWithApple()) {
    handleAppleCollision();
  }

  if (hasCollidedWithRainbowApple()) {
    handleRainbowAppleCollision();
  }
  
  if ($(".rapple").length === 0) {
    if (rappletimer >= Math.max(150, Math.random()*250)) {
      makeRainbowApple();
      rappletimer = 0;
    } else {
      rappletimer++;
    }
  } 

  let c = rapplertimer % 7;
  rapple.element.css("background-color", colortable[c]);
  rapplertimer++;

  if (snakeinv > 0) {
    $(".snake").css("background-color", colortable[c]);
    $("#snake-tail").css("background-color", "dark"+colortable[c]);
    $("#snake-head").css("background-color", "light"+colortable[c]);
    snakeinv--;
  } else {
    $(".snake").css("background-color", "green");
    $("#snake-tail").css("background-color", "darkgreen");
    $("#snake-head").css("background-color", "lightgreen");

  }
}

function checkForNewDirection(event) {
  /* 
  TODO 6b: Update snake.head.direction based on the value of activeKey.
  
  BONUS: Only allow direction changes to take place if the new direction is
  perpendicular to the current direction
  */

  if (activeKey === KEY.LEFT) {
    snake.head.direction = "left";
  }

  if (activeKey === KEY.RIGHT) {
    snake.head.direction = "right";
  }

  if (activeKey === KEY.UP) {
    snake.head.direction = "up";
  }

  if (activeKey === KEY.DOWN) {
    snake.head.direction = "down";
  }

  // FILL IN THE REST

  // console.log(snake.head.direction);     // uncomment me!
}

function moveSnake() {
  /* 
  TODO 11: Move each part of the snake's body such that it's body follows the head.
  
  HINT: To complete this TODO we must figure out the next direction, row, and 
  column for each snakeSquare in the snake's body. The parts of the snake are 
  stored in the Array snake.body and each part knows knows its current 
  column/row properties. 
  
  */

  for (let i = snake.body.length; i > 1; i--) {
    var snakeSquare = snake.body[i-1];

    var nextSnakeSquare = snake.body[i-2];
    var nextRow = nextSnakeSquare.row;
    var nextColumn = nextSnakeSquare.column;
    var nextDirection = nextSnakeSquare.direction;

    snakeSquare.direction = nextDirection;
    snakeSquare.row = nextRow;
    snakeSquare.column = nextColumn;
    repositionSquare(snakeSquare);
  }

  //Before moving the head, check for a new direction from the keyboard input
  checkForNewDirection();

  /* 
  TODO 7: determine the next row and column for the snake's head
  
  HINT: The snake's head will need to move forward 1 square based on the value
  of snake.head.direction which may be one of "left", "right", "up", or "down"
  */

  if (snake.head.direction === "left") {
    snake.head.column = snake.head.column - 1;
  }
  if (snake.head.direction === "right") {
    snake.head.column = snake.head.column + 1;
  }
  if (snake.head.direction === "up") {
    snake.head.row = snake.head.row - 1;
  }
  if (snake.head.direction === "down") {
    snake.head.row = snake.head.row + 1;
  }
  repositionSquare(snake.head);
}

function hasHitWall() {
  /* 
  TODO 8: Should return true if the snake's head has collided with the four walls of the
  board, false otherwise.
  
  HINT: What will the row and column of the snake's head be if this were the case?
  */

  if (snake.head.row < 0) {
    return true;
  }

  if (snake.head.row > ROWS) {
    return true;
  }

  if (snake.head.column < 0) {
    return true;
  }

  if (snake.head.column > COLUMNS) {
    return true;
  }

  return false;
}

function hasCollidedWithRainbowApple() {
  /* 
  TODO 9: Should return true if the snake's head has collided with the apple, 
  false otherwise
  
  HINT: Both the apple and the snake's head are aware of their own row and column
  */

  if (rapple.row === snake.head.row && rapple.column === snake.head.column) {
    return true;
  }

  return false;
}

function hasCollidedWithApple() {
  /* 
  TODO 9: Should return true if the snake's head has collided with the apple, 
  false otherwise
  
  HINT: Both the apple and the snake's head are aware of their own row and column
  */

  if (apple.row === snake.head.row && apple.column === snake.head.column) {
    return true;
  }

  return false;
}

function handleAppleCollision() {
  // increase the score and update the score DOM element
  score++;
  scoreElement.text("Score: " + score);

  // Remove existing Apple and create a new one
  apple.element.remove();
  makeApple();

  /* 
  TODO 10: determine the location of the next snakeSquare based on the .row,
  .column and .direction properties of the snake.tail snakeSquare
  
  HINT: snake.tail.direction will be either "left", "right", "up", or "down".
  If the tail is moving "left", place the next snakeSquare to its right. 
  If the tail is moving "down", place the next snakeSquare above it.
  etc...
  */
  var row = 0;
  var column = 0;

  // code to determine the row and column of the snakeSquare to add to the snake
  if (snake.tail.direction === "left") {
    column = snake.tail.column + 1;
    row = snake.tail.row
  }
  if (snake.tail.direction === "right") {
    column = snake.tail.column - 1;
    row = snake.tail.row
  }
  if (snake.tail.direction === "up") {
    column = snake.tail.column
    row = snake.tail.row + 1;
  }
  if (snake.tail.direction === "down") {
    column = snake.tail.column
    row = snake.tail.row - 1;
  }

  makeSnakeSquare(row, column);
}

function handleRainbowAppleCollision() {
  // increase the score and update the score DOM element
  score = score + 10;
  scoreElement.text("Score: " + score);
  snakeinv = 50;

  // Remove existing Apple and create a new one
  rapple.element.remove();
}

function hasCollidedWithSnake() {
  /* 
  TODO 12: Should return true if the snake's head has collided with any part of the
  snake's body.
  
  HINT: Each part of the snake's body is stored in the snake.body Array. The
  head and each part of the snake's body also knows its own row and column.
  
  */

    for (let i = 1; i < snake.body.length; i++) {
      if (snake.head.row === snake.body[i].row && snake.head.column === snake.body[i].column) {
        return true;
      }
    }

  return false;
}

function endGame() {
  // stop update function from running
  clearInterval(updateInterval);

  // clear board of all elements
  board.empty();

  // update the highScoreElement to display the highScore
  highScoreElement.text("High Score: " + calculateHighScore());
  scoreElement.text("Score: 0");
  score = 0;

  // restart the game after 500 ms
  setTimeout(init, 500);
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/* Create an HTML element for the apple using jQuery. Then find a random
 * position on the board that is not occupied and position the apple there.
 */
function makeApple() {
  // make the apple jQuery Object and append it to the board
  apple.element = $("<div>").addClass("apple").appendTo(board);

  // get a random available row/column on the board
  var randomPosition = getRandomAvailablePosition();

  // initialize the row/column properties on the Apple Object
  apple.row = randomPosition.row;
  apple.column = randomPosition.column;

  // position the apple on the screen
  repositionSquare(apple);
}

function makeRainbowApple() {
  // make the apple jQuery Object and append it to the board
  rapple.element = $("<div>").addClass("rapple").appendTo(board);

  // get a random available row/column on the board
  var randomPosition = getRandomAvailablePosition();

  // initialize the row/column properties on the Apple Object
  rapple.row = randomPosition.row;
  rapple.column = randomPosition.column;

  // position the apple on the screen
  repositionSquare(rapple);
}

/* Create an HTML element for a snakeSquare using jQuery. Then, given a row and
 * column on the board, position it on the screen. Finally, add the new
 * snakeSquare to the snake.body Array and set a new tail.
 */
function makeSnakeSquare(row, column) {
  // initialize a new snakeSquare Object
  var snakeSquare = {};

  // make the snakeSquare.element Object and append it to the board
  snakeSquare.element = $("<div>").addClass("snake").appendTo(board);

  // initialize the row and column properties on the snakeSquare Object
  snakeSquare.row = row;
  snakeSquare.column = column;

  // set the position of the snake on the screen
  repositionSquare(snakeSquare);

  // if this is the head, add the snake-head id
  if (snake.body.length === 0) {
    snakeSquare.element.attr("id", "snake-head");
  }

  if (snake.body.length > 1) {
    snake.body[snake.body.length-1].element.attr("id", "");
    snakeSquare.element.attr("id", "snake-tail");
  }

  // add snakeSquare to the end of the body Array and set it as the new tail
  snake.body.push(snakeSquare);
  snake.tail = snakeSquare;
}

/* 
  event.which returns the keycode of the key that is pressed when the
  keydown event occurs
  
  The KEY Object creates a map for the Arrow Keys to their keycode:

    KEY.LEFT = 37
    KEY.UP = 38
    KEY.RIGHT = 39
    KEY.DOWN = 40
*/
function handleKeyDown(event) {
  // TODO 6a: make the handleKeyDown function register which key is pressed
  activeKey = event.which;

  if (activeKey === KEY.LEFT) {
    snake.head.direction = "left";
  }
  if (activeKey === KEY.RIGHT) {
    snake.head.direction = "right";
  }
  if (activeKey === KEY.UP) {
    snake.head.direction = "up";
  }
  if (activeKey === KEY.DOWN) {
    snake.head.direction = "down";
  }
}

/* Given a gameSquare (which may be a snakeSquare or the apple), position
 * the gameSquare on the screen.
 */
function repositionSquare(square) {
  var squareElement = square.element;
  var row = square.row;
  var column = square.column;

  var buffer = 20;

  // position the square on the screen according to the row and column
  squareElement.css("left", column * SQUARE_SIZE + buffer);
  squareElement.css("top", row * SQUARE_SIZE + buffer);
}

/* Returns a (row,column) Object that is not occupied by another game component
 */
function getRandomAvailablePosition() {
  var spaceIsAvailable;
  var randomPosition = {};

  /* Generate random positions until one is found that doesn't overlap with the snake */
  while (!spaceIsAvailable) {
    randomPosition.column = Math.floor(Math.random() * COLUMNS);
    randomPosition.row = Math.floor(Math.random() * ROWS);
    spaceIsAvailable = true;

    /*
    TODO 13: After generating the random position determine if that position is
    not occupied by a snakeSquare in the snake's body. If it is then set 
    spaceIsAvailable to false so that a new position is generated.
    */
    for (let i = 0; i < snake.body.length; i++) {
      if (randomPosition.column === snake.body[i].column && randomPosition.row === snake.body[i].row) {
        spaceIsAvailable = false;
      }
    }
  }

  return randomPosition;
}

function calculateHighScore() {
  // retrieve the high score from session storage if it exists, or set it to 0
  var highScore = sessionStorage.getItem("highScore") || 0;

  if (score > highScore) {
    sessionStorage.setItem("highScore", score);
    highScore = score;
    alert("New High Score!");
  }

  return highScore;
}
