
//const {NodeVM, VMScript} = require('vm2');
const {NodeVM, VMScript} = require('vm2');
const readline = require('readline');
const randomAI = 'return Math.floor(Math.random() * (7)) + 0;';
const alwaysPlaceAt1 = 'return 1;';
const {gameStates} = require('./gameStates.js');

const vm = new NodeVM({
    console: 'inherit',
    sandbox: {},
    require: {
        external: true,
        builtin: ['fs', 'path'],
        root: "./",
        mock: {
            fs: {
                readFileSync() { return 'Nice try!'; }
            }
        }
    }
});


    function AIBattle(code1,code2,games){
        let ties = 0;
        let p1Wins = 0;
        let p2Wins = 0;
      
        for(let i = 0; i < games; i++) {
      
          //Initialize game State
        let gameBoard = new gameStates();
      
        //Initialize A.I
        let codeRunnerP1 = new codeReader(code1);
        let codeRunnerP2 = new codeReader(code2);
        while (gameBoard.winner == 0){
          let p1Selection = codeRunnerP1.runCodeTurn();
          if (gameBoard.PlaceCheckerAndCheckWinner(p1Selection,1) == -1){
              //console.log("Board: " + gameBoard.gameBoard[0]);
              if  (gameBoard.areAllSlotsFilled()){
                  console.log("Tie Game!");
                  ties++;
                  return;
              }
              //console.log("P1 Messed Up");
              gameBoard.winner = 2;
          }
          let p2Selection = codeRunnerP2.runCodeTurn();
          if(gameBoard.PlaceCheckerAndCheckWinner(p2Selection,2) == -1){
              //console.log("Board: " + gameBoard.gameBoard[0]);
              if  (gameBoard.areAllSlotsFilled()){
                  console.log("Tie Game!");
                  ties++;
                  return;
              }
              //console.log("P2 Messed Up");
              gameBoard.winner = 1;
          }
      
        }
        if (gameBoard.winner === 1){
          p1Wins++;
        }
      if (gameBoard.winner === 2){
          p2Wins++;
      }
          //console.log("WINNER: " + gameBoard.winner);
    }
      console.log("P1 Wins: " + p1Wins);
      console.log("P2 Wins: " + p2Wins);
      console.log("Ties " + ties);

      if (p1Wins > p2Wins){
          return 1;
      }
      else if (p2Wins > p1Wins){
          return 2;
      }
      else{
          return 0;
      }
}


function roundRobin(challengerCode){
    //Get Top 10 Slots
    let leaderCodes = [];
    leaderCodes.push(randomAI);
}
class codeReader{
    constructor(AICode,name){
        this.code = 'module.exports = function(boardState) { '+ AICode + ' }';
        this.name = name;
    }

    saveScript(codeArg){
        try {
            this.P1Code = new VMScript(this.code);
        } catch (err) {
            console.error('Failed to save script.', err);
        }
    }

    runCodeTurn(boardState){
        let returnVal = -1;
        try{
            let p1functionInSandbox = vm.run(this.code);
            returnVal = p1functionInSandbox(boardState);
        } catch (err) {
            //Return Debugging Errors here
            console.error('Failed to execute script.', err);
        }
        return returnVal;
    }
    
};

module.exports = {
    codeReader,
    randomAI,
    alwaysPlaceAt1,
    AIBattle
  };