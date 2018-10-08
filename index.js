var gameBoard = new Array(6);
for (var i = 0; i < gameBoard.length; i++){
  gameBoard[i] = new Array(7);
  gameBoard[i].fill(0);
}

function PlaceChecker(col,player,temp){
  if(gameBoard[0][col]!=0){
	  return -1;
  }
  for(var i = 0; i<6; i++){
    if(gameBoard[i][col]!=0){
      break;
    }
  }
  if(!temp) {
	gameBoard[i-1][col] = player;
  }
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
}

function solveV2(givenHeight, player)
{
	for(i=0; i< givenHeight;i++)
	{
		console.log("givenHeight: "+givenHeight);
		solveV2(givenHeight-1,1);
	}
}

function solve(givenHeight, player) {
	Height = givenHeight;
	let pos = -1;
	if(Height > 0) {
		console.log("Height: "+Height);
		min = 99999999;//Not my turn
		if(player == 1) {
			for(i = 0; i < 7; i++) {
				let tempScore = 0;
				let row = PlaceChecker(i,1, true);
				console.log("row: "+row);
				if(row==-1) {
					continue;
				}
				if(checkWinner==1) {
					tempScore = tempScore - (Height * 4);
				}
				let max = solve(Height-1,2);
				console.log("tempScore + max: "+tempScore + max);
				if(min>tempScore+max) {
					min = tempScore + max;
					pos = i;
				}
			}
			return min;
		}
		max = -99999999;//AI Turn
		if(player == 2) {
			for(i = 0; i < 7; i++) {
				let tempScore = 0;
				let row = PlaceChecker(i,2, true);
				if(row==-1) {
					continue;
				}
				if(checkWinner==2) {
					tempScore = tempScore + (Height * 3);
				}
				let min = solve(Height-1,1);
				if(tempScore+min>max) {
					max=tempScore+min;
					pos=i;
				}
			}
			if(Height == 10) {
				return pos;
			}
			else {
				return max;
			}
		}
	}
	return 0;
}
/*
PlaceChecker(0,2);
PlaceChecker(0,1);
PlaceChecker(0,2);
PlaceChecker(0,2);
PlaceChecker(1,1);
PlaceChecker(1,2);
PlaceChecker(1,2);
PlaceChecker(2,1);
PlaceChecker(2,2);
PlaceChecker(3,2);

PlaceChecker(0,2);
PlaceChecker(0,1);
PlaceChecker(0,2);
PlaceChecker(0,1);
PlaceChecker(0,2);
PlaceChecker(0,2);
console.log(PlaceChecker(0,2));
PlaceChecker(3,1);
PlaceChecker(3,1);
PlaceChecker(4,1);
PlaceChecker(3,2);
PlaceChecker(4,1);*/
console.log(gameBoard);
//console.log("Pos: "+solve(10,1));
solveV2(10,1);

console.log("Winner: "+checkWinner(3,0));

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
