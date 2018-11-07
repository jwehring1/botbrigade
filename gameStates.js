class gameStates{

    constructor(){
        this.gameBoard = new Array(6);
        this.winner = 0;
        for (var i = 0; i < this.gameBoard.length; i++){
            this.gameBoard[i] = new Array(7);
            this.gameBoard[i].fill(0);
          }
    }

    printGameBoard(){
        let stringBoi = '';
        let rowText='';
        let gameBoard = this.gameBoard;
        for(let i=0; i<gameBoard.length;i++)
        {
            for(let j=0; j<gameBoard[i].length;j++)
            {
                rowText+=gameBoard[i][j]+' ';
            }
            stringBoi += rowText +"\n";
            rowText = '';
        }
        return stringBoi;
    }

    areAllSlotsFilled(){
        for (let col = 0; col < 7; col++){
            if (this.gameBoard[0][col] == 0){
                return false;
            }
        }
        return true;
    }
    checkForWinner(placedRow,placedColumn) {
        //Vertical
        for (let row = 0; row < 3; row++)
            if (gameStates.checkAdj(this.gameBoard[row][placedColumn], this.gameBoard[row+1][placedColumn], this.gameBoard[row+2][placedColumn], this.gameBoard[row+3][placedColumn]))
                return this.gameBoard[row][placedColumn];
    
        //Horizontal
        for (let col = 0; col < 4; col++)
            if (gameStates.checkAdj(this.gameBoard[placedRow][col], this.gameBoard[placedRow][col+1], this.gameBoard[placedRow][col+2], this.gameBoard[placedRow][col+3]))
                return this.gameBoard[placedRow][col];
    
        //Down Right
        for (let row = 0; row < 3; row++)
            for (let col = 0; col < 4; col++)
                if (gameStates.checkAdj(this.gameBoard[row][col], this.gameBoard[row+1][col+1], this.gameBoard[row+2][col+2], this.gameBoard[row+3][col+3]))
                    return this.gameBoard[row][col];
    
        //Down Left
        for (let row = 3; row < 6; row++)
            for (let col = 0; col < 4; col++)
                if (gameStates.checkAdj(this.gameBoard[row][col], this.gameBoard[row-1][col+1], this.gameBoard[row-2][col+2], this.gameBoard[row-3][col+3]))
                    return this.gameBoard[row][col];
    
        return 0;
    }
    PlaceCheckerAndCheckWinner(col,player){
        if (this.gameBoard[0][col]!=0){
            return -1;
        }
        //Check placement validity
        for(var i = 0; i<6; i++){
          if(this.gameBoard[i][col]!=0){
            break;
          }
        }
        this.gameBoard[i-1][col] = player;

        //Placement is Valid
        if (i != -1){
            let winner = this.checkForWinner(i-1,col);
            this.winner = winner;
        }
    }

    static checkAdj(a,b,c,d) {
        // Check first cell non-zero and all cells match
        return ((a != 0) && (a == b) && (a == c) && (a == d));
    }

    returnBoard(){
        let gameBoard = this.gameBoard;
        let tempBoard = [];
		for (var j = 0; j < gameBoard.length; j++)
            tempBoard[j] = gameBoard[j].slice();
        return tempBoard;
    }
}

module.exports = {
    gameStates
  };