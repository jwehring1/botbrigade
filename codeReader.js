
//const {NodeVM, VMScript} = require('vm2');
const {NodeVM, VMScript} = require('vm2');
const readline = require('readline');
const randomAI = 'return Math.floor(Math.random() * (7)) + 0;';
const printAI = 'console.log(boardState)';
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

    //Returns this object
    let singleFightObject ={
        defendingCodeName: code2.name,
        code1Wins: 0,
        code2Wins: 0,
        ties: 0,
    }
      
        for(let i = 0; i < games; i++) {
      
          //Initialize game State
        let gameBoard = new gameStates();
      let turn = 0;
        //Initialize A.I
        while (gameBoard.winner == 0){
        console.log("Turn: " + turn);
        turn++;
        gameBoard.printGameBoard();
          let p1Selection = code1.runCodeTurn(gameBoard.gameBoard);
          if (gameBoard.PlaceCheckerAndCheckWinner(p1Selection,1) == -1){
              if  (gameBoard.areAllSlotsFilled()){
                  console.log("Tie Game!");
                  singleFightObject.ties++;
                  return;
              }
              console.log("P1 Messed Up");
              gameBoard.winner = 2;
          }
          let p2Selection = code2.runCodeTurn(gameBoard.gameBoard);
          if(gameBoard.PlaceCheckerAndCheckWinner(p2Selection,2) == -1){
              //console.log("Board: " + gameBoard.gameBoard[0]);
              if  (gameBoard.areAllSlotsFilled()){
                  console.log("Tie Game!");
                  singleFightObject.ties++;
                  return;
              }
              console.log("P2 Messed Up");
              gameBoard.winner = 1;
          }
      
        }
    if (gameBoard.winner === 1){
        singleFightObject.code1Wins++;
    }
    if (gameBoard.winner === 2){
          singleFightObject.code2Wins++;
    }
          //console.log("WINNER: " + gameBoard.winner);
    }
      console.log(code1.name + " Wins: " + singleFightObject.code1Wins);
      console.log(code2.name + " Wins: " + singleFightObject.code2Wins);
      console.log("Ties " + singleFightObject.ties);

      if (singleFightObject.code1Wins > singleFightObject.code2Wins){
        singleFightObject.winner = 1;
      }
      else if (singleFightObject.code2Wins > singleFightObject.code1Wins){
        singleFightObject.winner = 2;
      }
      else{
        singleFightObject.winner = 0;
      }

      return singleFightObject;
}


function roundRobin(challengerCode,rounds){

    //Returns this object
    let tournamentObject ={
        wins: 0,
        losses: 0,
        ties: 0,
        battles: [],
    }

    //Get Top 10 Slots
    let leaderCodes = [];
    leaderCodes.push(new codeReader(randomAI,"Random1"));
    leaderCodes.push(new codeReader(alwaysPlaceAt1,"Place1"));
    leaderCodes.push(new codeReader(randomAI,"Random2"));

    leaderCodes.forEach(defendingCode => {
        let battleObject = AIBattle(challengerCode,defendingCode,rounds);
        tournamentObject.battles.push(battleObject);
        switch (battleObject.winner) {
            case 0:
                tournamentObject.ties++;
                break;
            case 1:
                tournamentObject.wins++;
                break;
            case 2:
                tournamentObject.losses++;
                break;
        }
    });

    return tournamentObject;
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
        if (returnVal < 0 || returnVal > 6){
            console.warn('Player Attempted Placing at ' + returnVal);
        }
        console.log("placing at: " + returnVal);
        return returnVal;
    }

    displayBoard(arg){
        let functionInSandbox = vm.run("module.exports = function(arg) { console.log(arg); }");
        functionInSandbox(arg);
    }
    
};


////////////////////////////////////////////////////
/**
 * readTextFile read data from file
 * @param  string   filepath   Path to file on hard drive
 * @return string              String with file data
 */
function readTextFile(filepath) {
    const fs = require('fs');

    let txtFile = filepath;
    let str = fs.readFileSync(txtFile,'utf8');
    
    return str;
}

////////////////////////////////////////////////////

module.exports = {
    codeReader,
    randomAI,
    alwaysPlaceAt1,
    AIBattle,
    roundRobin,
    readTextFile,
    printAI
  };