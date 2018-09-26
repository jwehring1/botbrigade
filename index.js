var gameBoard = new Array(6);
for (var i = 0; i < gameBoard.length; i++){
  gameBoard[i] = new Array(7);
  gameBoard[i].fill(0);
}

function PlaceChecker(col,player){
  for(var i = 0; i<6; i++){
    if(gameBoard[i][col]!=0){
      break;
    }
  }
  gameBoard[i-1][col] = player;
  return i-1;
}


function checkAdj(a,b,c,d) {
    // Check first cell non-zero and all cells match
    return ((a != 0) && (a == b) && (a == c) && (a == d));
}

function checkWinner(placedRow,placedColumn) {
    //Vertical
    for (row = 0; row < 3; row++)
		if (checkAdj(gameBoard[row][placedColumn], gameBoard[row+1][placedColumn], gameBoard[row+2][placedColumn], gameBoard[row+3][placedColumn]))
            return gameBoard[row][placedColumn];

    //Horizontal
    for (col = 0; col < 4; col++)
        if (checkAdj(gameBoard[placedRow][col], gameBoard[placedRow][col+1], gameBoard[placedRow][col+2], gameBoard[placedRow][col+3]))
            return gameBoard[placedRow][col];

    //Down Right
    for (row = 0; row < 3; row++)
        for (col = 0; col < 4; col++)
            if (checkAdj(gameBoard[row][col], gameBoard[row+1][col+1], gameBoard[row+2][col+2], gameBoard[row+3][col+3]))
                return gameBoard[row][col];

    //Down Left
    for (row = 3; row < 6; row++)
        for (col = 0; col < 4; col++)
            if (checkAdj(gameBoard[row][col], gameBoard[row-1][col+1], gameBoard[row-2][col+2], gameBoard[row-3][col+3]))
                return gameBoard[row][col];

    return 0;
}/*
PlaceChecker(0,2);
PlaceChecker(0,1);
PlaceChecker(0,2);
PlaceChecker(0,2);
PlaceChecker(1,1);
PlaceChecker(1,2);
PlaceChecker(1,2);
PlaceChecker(2,1);
PlaceChecker(2,2);
PlaceChecker(3,2);*/

PlaceChecker(0,2);
PlaceChecker(1,1);
PlaceChecker(1,2);
PlaceChecker(2,1);
PlaceChecker(2,2);
PlaceChecker(2,2);
PlaceChecker(3,2);
PlaceChecker(3,1);
PlaceChecker(3,2);
PlaceChecker(4,1);
PlaceChecker(3,2);
PlaceChecker(4,2);
PlaceChecker(4,1);
PlaceChecker(4,2);
PlaceChecker(5,1);
PlaceChecker(4,2);

console.log(checkWinner(3,0));

console.log(gameBoard);

const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
