// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  //applyFilter(reddify);
  //applyFilterNoBackground(decreaseBlue);
  //applyFilterNoBackground(increaseGreenByBlue);
  //applyFilter(increaseRedByGreenAndDecreaseGreen);
  smudge();
  

  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter(filterFunction) {
  for (y = 0; y < image.length; y++) {
    for (x = 0; x < image[y].length; x++) {
      var rgbString = image[y][x];
      var rgbNumbers = rgbStringToArray(rgbString);
      
      filterFunction(rgbNumbers);

      rgbString = rgbArrayToString(rgbNumbers);
      image[y][x] = rgbString;
    }
  }
}

// TODO 7: Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction) {
  var bgcolor = image[0][0]

  for (y = 0; y < image.length; y++) {
    for (x = 0; x < image[y].length; x++) {
      var rgbString = image[y][x];
      var rgbNumbers = rgbStringToArray(rgbString);
      
      if (image[y][x] !== bgcolor) {
        filterFunction(rgbNumbers);
      }

      rgbString = rgbArrayToString(rgbNumbers);
      image[y][x] = rgbString;
    }
  }
}

// TODO 5: Create the keepInBounds function
function keepInBounds(number) {
  number = Math.max(number, 0);
  number = Math.min(number, 255);

  return number;
}

// TODO 3: Create reddify function
function reddify(rgbNumbers) {
  rgbNumbers[RED] = 200;
}

// TODO 6: Create more filter functions
function decreaseBlue(rgbNumbers) {
  rgbNumbers[BLUE] = keepInBounds(rgbNumbers[BLUE] - 50);
}

function increaseGreenByBlue(rgbNumbers) {
  rgbNumbers[GREEN] = keepInBounds(rgbNumbers[GREEN] + rgbNumbers[BLUE]);
}

function increaseRedByGreenAndDecreaseGreen(rgbNumbers) {
  rgbNumbers[RED] = keepInBounds(rgbNumbers[RED] + rgbNumbers[GREEN]);
  rgbNumbers[GREEN] = keepInBounds(rgbNumbers[GREEN] - 50);
}

// CHALLENGE code goes below here
function smudge() {
  for (y = 0; y < image.length; y++) {
    for (x = 0; x < image[y].length; x++) {
      var rgbString = image[y][x];
      var rgbNumbers = rgbStringToArray(rgbString);

      if (x > 0 && y > 0) {
        var rgbStringNeighbor = image[y-1][x-1];
        var rgbNumbersNeighbor = rgbStringToArray(rgbStringNeighbor);
        rgbNumbers[RED] += rgbNumbersNeighbor[RED]/8;
        rgbNumbers[BLUE] += rgbNumbersNeighbor[BLUE]/8;
        rgbNumbers[GREEN] += rgbNumbersNeighbor[GREEN]/8;
        keepInBounds(rgbNumbers[RED]);
        keepInBounds(rgbNumbers[BLUE]);
        keepInBounds(rgbNumbers[GREEN]);
      }

      rgbString = rgbArrayToString(rgbNumbers);
      image[y][x] = rgbString;
    }
  }
}