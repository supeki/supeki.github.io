$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }
    //create walls
    createPlatform(-50, -50, canvas.width + 100, 50); //top
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200); //right
    createPlatform(-50, -50, 50, canvas.height + 500); //bottom
    createPlatform(canvas.width, -50, 50, canvas.height + 100);

    /**
     * Uncomment the loops below to add a "grid" to your platformer game's screen
     * The grid will place both horizontal and vertical platforms incremented 100 pixels apart
     * This can give you a better idea of where to create new platforms
     * Comment the lines out to remove the grid
     */

    for (let i = 100; i < canvas.width; i += 100) {
      createPlatform(i, canvas.height, -1, -canvas.height);
    }
    for (let i = 100; i < canvas.height; i += 100) {
      createPlatform(canvas.width, i, -canvas.width, -1);
    }

    /////////////////////////////////////////////////
    //////////ONLY CHANGE BELOW THIS POINT///////////
    /////////////////////////////////////////////////

    // TODO 1
    // Create platforms
    // You must decide the x position, y position, width, and height of the platforms
    // example usage: createPlatform(x,y,width,height)

    let starty = 200;

    // Top
    createPlatform(0,starty,350,25);
    createPlatform(350,starty+25,250,25);
    createPlatform(600,starty+50,250,25);
    createPlatform(850,starty+75,250,25);

    // Middle 1
    createPlatform(1050,starty+150,350,25);
    createPlatform(800,starty+175,250,25);
    createPlatform(550,starty+200,250,25);
    createPlatform(300,starty+225,250,25);

    // Middle 2
    createPlatform(0,starty+300,350,25);
    createPlatform(350,starty+325,250,25);
    createPlatform(600,starty+350,250,25);
    createPlatform(850,starty+375,250,25);

    // Bottom
    createPlatform(1050,starty+450,350,25);
    createPlatform(800,starty+475,250,25);
    createPlatform(550,starty+500,250,25);
    createPlatform(0,starty+525,550,25);
    
    // TODO 2
    // Create collectables
    // You must decide on the collectable type, the x position, the y position, the gravity, and the bounce strength
    // Your collectable choices are 'database' 'diamond' 'grace' 'kennedi' 'max' and 'steve'; more can be added if you wish
    // example usage: createCollectable(type, x, y, gravity, bounce)

    createCollectable('grace', 150, starty + 150, 0, 0);

    createCollectable('steve', 850, starty, 0, 0);
    createCollectable('diamond', 1250, starty+400, 0, 0);


    // TODO 3
    // Create cannons
    // You must decide the wall you want the cannon on, the position on the wall, and the time between shots in milliseconds
    // Your wall choices are: 'top' 'left' 'right' and 'bottom'
    // example usage: createCannon(side, position, delay, width, height)

    createCannon('left', 0, 3000, 64, 64);
    createCannon('right', 100, 3000, 64, 64);



    /////////////////////////////////////////////////
    //////////ONLY CHANGE ABOVE THIS POINT///////////
    /////////////////////////////////////////////////
  }

  registerSetup(setup);
});
