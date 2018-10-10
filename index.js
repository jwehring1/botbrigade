var gameRow =-1;
var gameBoard = new Array(6);
for (var i = 0; i < gameBoard.length; i++){
  gameBoard[i] = new Array(7);
  gameBoard[i].fill(0);
}

function PlaceChecker(tempBoard,col,player){
  if(tempBoard[0][col]!=0){
	  gameRow = -1;
	  return tempBoard;
  }
  for(var i = 0; i<6; i++){
    if(tempBoard[i][col]!=0){
      break;
    }
  }
  tempBoard[i-1][col] = player;
  gameRow = i-1;
  return tempBoard;
}

function checkAdj(a,b,c,d) {
    // Check first cell non-zero and all cells match
    return ((a != 0) && (a == b) && (a == c) && (a == d));
}

function checkWinner(gameBoard,placedRow,placedColumn) {
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

function solve(gameBoard2, givenHeight, player) {
	let Height = givenHeight;
	let pos = -1;
	if(Height > 0) {
		let min = 99999999;//Not my turn
		if(player == 1) {
			for(let i = 0; i < 7; i++) {
				console.log("Height P1: "+Height);
				let tempScore = 0;
				var tempBoard = [];
				for (var j = 0; j < gameBoard2.length; j++)
    				tempBoard[j] = gameBoard2[j].slice();
				tempBoard = PlaceChecker(tempBoard,i,1);
				//console.log(gameBoard2);
				if(gameRow==-1) {
					continue;
				}
				if(checkWinner(tempBoard,gameRow,i)==1) {
					tempScore = tempScore - (Height * 4);
				}
				let max = solve(tempBoard,Height-1,2);
				if(tempScore>0){
				console.log("tempScore + max: "+tempScore + max);
				}
				if(min>tempScore+max) {
					min = tempScore + max;
					pos = i;
				}
			}
			if(Height == 4) {
				return pos;
			}
			else {
				return min;
			}
		}
		let max = -99999999;//AI Turn
		if(player == 2) {
			for(let i = 0; i < 7; i++) {
				console.log("Height P2: "+Height);
				let tempScore = 0;
				var tempBoard = [];
				for (var j = 0; j < gameBoard2.length; j++)
    				tempBoard[j] = gameBoard2[j].slice();
				tempBoard = PlaceChecker(tempBoard,i,2);
				//console.log(gameBoard2);
				if(gameRow==-1) {
					continue;
				}
				if(checkWinner(tempBoard,gameRow,i)==2) {
					tempScore = tempScore + (Height * 3);
					//console.log("YAYYYYY");
				}
				let min = solve(tempBoard,Height-1,1);
				if(tempScore<0){
				console.log("tempScore + min: "+tempScore + min);
				}
				if(tempScore+min>max) {
					max=tempScore+min;
					pos=i;
				}
			}
			if(Height == 4) {
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
gameBoard = PlaceChecker(gameBoard,0,2);
gameBoard = PlaceChecker(gameBoard,1,1);
gameBoard = PlaceChecker(gameBoard,1,2);
gameBoard = PlaceChecker(gameBoard,2,1);
gameBoard = PlaceChecker(gameBoard,2,2);
gameBoard = PlaceChecker(gameBoard,2,2);
gameBoard = PlaceChecker(gameBoard,3,2);
gameBoard = PlaceChecker(gameBoard,3,1);
gameBoard = PlaceChecker(gameBoard,3,1);*/

let arrText='';
for(i=0; i<gameBoard.length;i++)
{
	for(j=0; j<gameBoard[i].length;j++)
	{
		arrText+=gameBoard[i][j]+' ';
    }
    console.log(arrText);
    arrText='';
}
console.log(solve(gameBoard,4,1))
//gameBoard = PlaceChecker(gameBoard,solve(gameBoard,4,1),1);
console.log(gameBoard);
