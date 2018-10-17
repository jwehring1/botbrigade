function solve(gameBoard2, givenHeight, player) {
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
				let tempmax = solve(tempBoard,Height-1,2);
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
				let tempmin = solve(tempBoard,Height-1,1);
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

return solve(boardState,3,1);