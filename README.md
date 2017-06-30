# Tic-Tac-Toe
[Live@ codepen](https://codepen.io/jjspetz/full/WjaGLd/)  
This is a project done for freeCodeCamp. It is the 3rd project of the advanced front-end projects.
This version fulfills the basic user stories and features a beatable but mostly competitive AI script.
### Built-with
HTML, CSS, and JavaScript


![tic-tac-toe](/TTT.png)

### Biggest Challenge
Deciding what kind of AI script was the hardest challenge for me on this project, so I put it off for a long time. There are many tutorials online on how to write an unbeatable AI script, but that doesn’t make a fun game. I eventually wrote a script that blocks the user from making three in a row and will finish of its own win moves but otherwise places its pieces randomly.

### Sample Code
This code allows the user(s) to click a tile. It checks to make sure the tile isn’t already clicked based off the tiles current background color. I did this because originally I was going to not include Xs or Os as a stylistic choice, but in order to fulfill the required UX set out by freeCodeCamp I later added them. The parameter pos is short for position and it is passed in by the user’s click event on any of the nine squares.

```javascript
function flip(pos) {
  if (
    player == 1 &&
    pos.style.background !== "rgb(247, 185, 0)" &&
    pos.style.background !== "rgb(219, 193, 151)"
  ) {
    pos.style.background = "#F7B900";
    pos.innerHTML = "<div class='center'>" + p1_marker + "</div>";
    player = -player;
    playerId.innerHTML = p2;
    playerMarker.style.background = "#DBC197";
  } else if (
    player == -1 &&
    pos.style.background !== "rgb(247, 185, 0)" &&
    pos.style.background !== "rgb(219, 193, 151)"
  ) {
    pos.style.background = "#DBC197";
    pos.innerHTML = "<div class='center'>" + p2_marker + "</div>";
    player = -player;
    playerId.innerHTML = p1;
    playerMarker.style.background = "#F7B900";
  }
}
```
