// color array
var colors = ['#103C89', '#1153A0', '#F7B900', '#F5F5F5', '#DBC197'];
// variable to keep track of player
var player = 1;
// variables for holding player names
var p1, p2, p1_marker, p2_marker;
// intializes counr variable for handling 2 player draws
var count = 0;
// AI off on start
var AI = false;
// tracks victory condition
var victoryArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// set up elements for manipulation
var square = document.getElementsByClassName('flex-item')
var one = document.getElementById('one');
var two = document.getElementById('two');
var three = document.getElementById('three');
var four = document.getElementById('four');
var five = document.getElementById('five');
var six = document.getElementById('six');
var seven = document.getElementById('seven');
var eight = document.getElementById('eight');
var nine = document.getElementById('nine');
var reset = document.getElementById('reset');
var playerId = document.getElementById('player');
var playerMarker = document.getElementById('playermarker');
var start = document.getElementById('modal-button');
var exit = document.getElementById('win-exit');
var win_modal = document.getElementById('win-modal');
var win_msg = document.getElementById('win-msg');
var main_modal = document.getElementById('modal-dialog');

// defines an array of all the divs
var elementArray = [one, two, three, four, five, six, seven, eight, nine];

// player one clicks argument is button id
function flip(pos) {
  if (player == 1 && pos.style.background !== 'rgb(247, 185, 0)' && pos.style.background !== 'rgb(219, 193, 151)') {
    pos.style.background = '#F7B900';
    pos.innerHTML = "<div class='center'>"+p1_marker+"</div>";
    player = -player;
    playerId.innerHTML = p2;
    playerMarker.style.background = '#DBC197';
  }
  else if (player == -1 && pos.style.background !== 'rgb(247, 185, 0)' && pos.style.background !== 'rgb(219, 193, 151)'){
    pos.style.background = '#DBC197';
    pos.innerHTML = "<div class='center'>"+p2_marker+"</div>";
    player = -player;
    playerId.innerHTML = p1;
    playerMarker.style.background = '#F7B900';
  }
}

// click event listeners
/*
    An attempt to handle all the square clicks in one go.
    loops through all possible clicks and pulls the string name
    of the event that is clicked

*/
 Array.from(square).forEach(function(element) {
  // listens for player clicks
  element.addEventListener('click', function(event) {
    // saves string of div value
    var elem = event.path[0].getAttribute('data-value');
    elem = elem-1;
    // checks player and inserts correct token into victory array
    if (player == 1)
      victoryArray[elem] = p1_marker;
    else
      victoryArray[elem] = p2_marker;
    console.log(elementArray[elem]);
    flip(elementArray[elem]);

    if (check()) {
      return win();
    }

    if (AI && player == -1) {
      AIMove();
    }

    if (count >= 9 && !check())
      return draw();
 });
});

// function that resets the game board to its starting position
var restart = function() {
  // loops over the array and resets
  elementArray.forEach(function(val) {
    val.style.background = '#1153A0';
    val.innerHTML = "<div class='center'></div>";
  });
  // resets player
  player = 1;
  playerId.innerHTML = "Player 1";
  playerMarker.style.background = '#F7B900';

  // reset AI
  AI = false;

  // reset count
  count = 0;

  // resets victory array
  victoryArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  // redisplays main modal
  main_modal.style.display = 'block';
}

// handles all functionality of the reset button
reset.addEventListener('click', restart);

// listens to start game and close modal
start.addEventListener('click', function() {
  p1 = document.getElementById('p1').value;
  p2 = document.getElementById('p2').value;
  AI = document.getElementById('ai').checked;
  let x_or_o = document.getElementById('x').checked;
  if (x_or_o) {
    p1_marker = 'X';
    p2_marker = 'O';
  } else {
    p1_marker = 'O';
    p2_marker = 'X';
  }
  main_modal.style.display = 'none';
  playerId.innerHTML = p1;
});

// Victory Check
// loop through arrays
function check() {
  // shorten variable name
  var vA = victoryArray;
  // row check
  for (let i=1; i<9; i+=3) {
    if (vA[i-1] == vA[i] && vA[i] == vA[i+1]) {
      return true;
    }
  }
  // column check
  for (let i=0; i<3; i++) {
    if (vA[i] == vA[i+3] && vA[i] == vA[i+6]) {
      return true;
    }
  }

  // diagonal checks
  if (vA[0] == vA[4] && vA[4] == vA[8]) {
    return true;
  }
  if (vA[2] == vA[4] && vA[4] == vA[6]) {
    return true;
  }
  // ups count on turns that noone wins
  count++;

  // if no checks return true
  return false;
}

// win screen exit event listener
// closes win-modal on click and reopens main-modal
exit.addEventListener('click', function(){
  restart();
  win_modal.style.display = 'none';
  main_modal.style.display = 'block';
});

// function that handles wins
function win() {
  win_modal.style.display = 'block'

      if (player == 1)
        win_msg.innerHTML = p2 + ' wins!'
      else
        win_msg.innerHTML = p1 + ' wins!'
}

// function that handles draws
function draw() {
  win_msg.innerHTML = "It's a draw.";
  win_modal.style.display = 'block'
}

 /*
  1) make AI code more sophisticated

    The code below handles the AI
 */
 // AI Check
 // loop through arrays
 var AIcheck = function() {
   // shorten variable name
   var vA = victoryArray;
   // row check
   for (let i=1; i<9; i+=3) {
     if (vA[i] == vA[i+1]) {
       return i-1;
     }
     if (vA[i-1] == vA[i+1]) {
       return i;
     }
     if (vA[i-1] == vA[i]) {
       return i+1;
     }
   }
   // column check
   for (let i=0; i<3; i++) {
     if (vA[i+3] == vA[i+6]) {
       return i;
     }
     if (vA[i] == vA[i+6]) {
       return i+3;
     }
     if (vA[i] == vA[i+3]) {
       return i+6;
     }
   }

   // diagonal checks
   if (vA[4] == vA[8]) {
     return 0;
   }
   if (vA[0] == vA[8]) {
     return 4;
   }
   if (vA[0] == vA[4]) {
       return 8;
   }
   if (vA[4] == vA[6]) {
     return 2;
   }
   if (vA[2] == vA[6]) {
     return 4;
   }
   if (vA[2] == vA[4]) {
     return 6;
   }

   // if no checks return true
   return false;
 }

function AIMove() {
   // gets random index for the positions left
   let arr = [];

   victoryArray.forEach(function(element) {
     if (/[0-9]/.test(element)) {
       arr.push(element);
     }
   });

   if (arr.length === 0) {
      return draw();
   }
   console.log('arr: ' + arr);

   var index = AIcheck();
   if (index) {
     index = index;
   } else {
     index = Math.floor(Math.random() * arr.length);
   }
   console.log(index);
   var elem = arr[index] - 1;
   console.log('comp choice: ' + (elem + 1));
   console.log('at index: ' + index);
   victoryArray[elem] = p2_marker;
   console.log(victoryArray);
   flip(elementArray[elem]);

   if (check()) {
      return win();
    }
}
