/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    ENTER: 13,
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
  };
  
  // Game Item Objects
  var walker = {
    x: 0,
    y: 0,
    speedX: 0,
    speedY: 0
  }

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp); // more copy-pasting      
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem()
    wallCollision()
    redrawGameItem()
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    //console.log(event.keyCode); // works
    if (event.which === KEY.ENTER) {
      console.log("enter pressed");
    }

    // god i hate copy-pasting so much

    if (event.which === KEY.LEFT) {
      console.log("left pressed");

      walker.speedX = -5;
    }

    if (event.which === KEY.RIGHT) {
      console.log("right pressed");

      walker.speedX = 5;
    }

    if (event.which === KEY.UP) {
      console.log("up pressed");

      walker.speedY = -5;
    }

    if (event.which === KEY.DOWN) {
      console.log("down pressed");

      walker.speedY = 5;
    }
  }

  function handleKeyUp(event) {
    //console.log(event.keyCode); // works
    if (event.which === KEY.ENTER) {
      console.log("enter pressed");
    }

    // god i hate copy-pasting so much

    if (event.which === KEY.LEFT) {
      console.log("left pressed");

      walker.speedX = 0;
    }

    if (event.which === KEY.RIGHT) {
      console.log("right pressed");

      walker.speedX = 0;
    }

    if (event.which === KEY.UP) {
      console.log("up pressed");

      walker.speedY = 0;
    }

    if (event.which === KEY.DOWN) {
      console.log("down pressed");

      walker.speedY = 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

  function repositionGameItem() {
    walker.x += walker.speedX;
    walker.y += walker.speedY;
  }

  function redrawGameItem() {
    $("#walker").css("left", walker.x)
    $("#walker").css("top", walker.y)
  }
  
  function wallCollision() {
    if (walker.x < 0) {
      walker.x -= walker.speedX;
      walker.speedX = 0;
    }

    if (walker.x+$("#walker").width() > $("#board").width()) {
      walker.x -= walker.speedX;
      walker.speedX = 0;
    }

    if (walker.y < 0) {
      walker.y -= walker.speedY;
      walker.speedY = 0;
    }

    if (walker.y+$("#walker").height() > $("#board").height()) {
      walker.y -= walker.speedY;
      walker.speedY = 0;
    }
  }
}
