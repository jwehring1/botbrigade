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

function checkFull(tempBoard)
{
	for(var i=0; i<tempBoard.length; i++)
	{
		if(tempBoard[i][5]==0)
			return false;
	}
	return true;
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

function minimax(gameBoard2, givenHeight, player) {
	let Height = givenHeight;
	let pos = -1;
	if(Height > 0) {
		let min = 99999999;//Not my turn
		if(player == 1) {
			for(let i = 0; i < 7; i++) {
				//console.log("Height P1: "+Height);
				let tempScore = -i;
				if(i>3)
					tempScore += (i-3)*2;
				var tempBoard = [];
				for (var j = 0; j < gameBoard2.length; j++)
    				tempBoard[j] = gameBoard2[j].slice();
				tempBoard = PlaceChecker(tempBoard,i,1);
				//console.log(gameBoard2);
				checkFull(tempBoard);
				if(gameRow==-1) {
					continue;
				}
				if(checkWinner(tempBoard,gameRow,i)==1) {
					tempScore = tempScore - (Height * 7);
				}
				let tempmax = minimax(tempBoard,Height-1,2);
				if(tempScore>0){
				console.log("tempScore + max: "+tempScore + tempmax);
				}
				if(tempmax==99999999)
				{
					tempmax = 0;
					pos = i;
				}
				if(min>tempScore+tempmax) {
					min = tempScore + tempmax;
					pos = i;
				}
			}
			if(Height == 6 && player == 1) {
				return pos;
			}
			else {
				return min;
			}
		}
		let max = -99999999;//AI Turn
		if(player == 2) {
			for(let i = 0; i < 7; i++) {
				//console.log("Height P2: "+Height);
				let tempScore = i;
				if(i>3)
				tempScore -= (i-3)*2;
				var tempBoard = [];
				for (var j = 0; j < gameBoard2.length; j++)
    				tempBoard[j] = gameBoard2[j].slice();
				tempBoard = PlaceChecker(tempBoard,i,2);
				//console.log(gameBoard2);
				if(gameRow==-1) {
					continue;
				}
				if(checkWinner(tempBoard,gameRow,i)==2) {
					tempScore = tempScore + (Height * 7);
					//console.log("YAYYYYY");
				}
				let tempmin = minimax(tempBoard,Height-1,1);
				if(tempScore<0){
				console.log("tempScore + min: "+tempScore + tempmin);
				}
				if(tempmin==-99999999)
				{
					tempmin = 0;
					pos = i;
				}
				if(tempScore+tempmin>max) {
					max=tempScore+tempmin;
					pos=i;
				}
			}
			if(Height == 6 && player == 2) {
				return pos;
			}
			else {
				return max;
			}
		}
	}
	return 0;
}

function greedy(gameBoard2, givenHeight, player) {
	let Height = givenHeight;
	let pos = -1;
	if(Height > 0) {
		let max = -99999999;//AI Turn
		if(player == 2) {
			for(let i = 0; i < 7; i++) {
				//console.log("Height P2: "+Height);
				let tempScore = i;
				if(i>3)
				tempScore -= (i-3)*2;
				var tempBoard = [];
				for (var j = 0; j < gameBoard2.length; j++)
    				tempBoard[j] = gameBoard2[j].slice();
				tempBoard = PlaceChecker(tempBoard,i,player);
				//console.log(gameBoard2);
				if(gameRow==-1) {
					continue;
				}
				if(checkWinner(tempBoard,gameRow,i)==player) {
					tempScore = tempScore + (Height * 7);
					//console.log("YAYYYYY");
				}
				let tempmax = greedy(tempBoard,Height-1,player);
				if(tempScore<0){
				console.log("tempScore + min: "+tempScore + tempmax);
				}
				if(tempmax==-99999999)
				{
					tempmax = 0;
					pos = i;
				}
				if(tempScore+tempmax>max) {
					max=tempScore+tempmax;
					pos=i;
				}
			}
			if(Height == 6 && player == 2) {
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
for(k = 0; k<42; k++)
{
	let p = 0;
	if(k%2==0)
		p = 2;
	else
		p = 1;
	//let pos = minimax(gameBoard,6,p)
	let pos = greedy(gameBoard,6,p);
	gameBoard = PlaceChecker(gameBoard,pos,p);
	console.log(pos);
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
	console.log(" ");
	console.log(" ");
	console.log(" ");
	console.log(" ");
	console.log(" ");
}

