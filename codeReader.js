
//const {NodeVM, VMScript} = require('vm2');
const {NodeVM, VMScript} = require('vm2');
const readline = require('readline');
const performance = require('perf_hooks').performance;
const randomAI = 'return Math.floor(Math.random() * (7)) + 0;';
const printAI = 'console.log(boardState)';
const alwaysPlaceAt1 = 'return 1;';
const {gameStates} = require('./gameStates.js');
Object.prototype.isEmpty = function() {
    for(var key in this) {
        if(this.hasOwnProperty(key))
            return false;
    }
    return true;
}
const vm = new NodeVM({
    console: 'redirect',
    sandbox: {},
    timeout: 1000,
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


    function AIBattle(code1,code2,games,printDebug,oneIsOnFirst){

    //Returns this object
    let singleFightObject ={
        defendingCodeName: code2.name,
        code1Wins: 0,
        code2Wins: 0,
        ties: 0,
        gameText: [],
        gameStats: [],
        gameStates: [],
        errors: [],
        orderedReport: [],
        p1TimeTaken: 0.0000,
        p2TimeTaken: 0.0000,
    };
    for(let i = 0; i < games; i++) {
        //Initialize game State
        let gameBoard = new gameStates();
        let turn = 1;
        let log = "Now Starting Fight: " + code1.name +" vs " + code2.name + '\n';
        if (oneIsOnFirst){
            log+= code1.name + " will go first. Start! \n \n";
        }
        else{
            log+= code2.name + " will go first. Start! \n \n";
        }
        console.log(log);
        singleFightObject.gameText.push(log);
        singleFightObject.orderedReport.push(log);


        //Initialize A.I
        function p1Turn(){
                let initTime = performance.now();
                let p1Selection = code1.runCodeTurn(gameBoard.gameBoard,1);
                let postTime = performance.now();
                singleFightObject.p1TimeTaken+=postTime-initTime;
                let error = gameBoard.PlaceCheckerAndCheckWinner(p1Selection,1);
                let winner = gameBoard.winner;
          if (error == -1){
              if  (gameBoard.areAllSlotsFilled()){
                  if (printDebug > 2){
                    let log = ("Tie Game!");
                    console.log(log);
                    singleFightObject.gameText.push(log);
                    singleFightObject.orderedReport.push(log);
                  }
                  singleFightObject.ties++;
                  return;
              }
              if (printDebug > 3){
                if (code1.currentError.isEmpty()){
                    let log = "P1 attempted to place at slot " + p1Selection + ", but this is already full";
                    console.log(log);
                    singleFightObject.gameText.push(log);
                    singleFightObject.orderedReport.push(log);
                }
                else{
                let log = "P1 Messed Up";
                console.log(log);
                singleFightObject.gameText.push(log);
                singleFightObject.orderedReport.push(log);
                singleFightObject.orderedReport.push(code1.currentError);
                singleFightObject.errors.push(code1.currentError);
                }
              }
              gameBoard.winner = 2;
              return gameBoard.winner;
          }
          return gameBoard.winner;
        }


        function p2Turn(){
            let initTime = performance.now();
            let p2Selection = code2.runCodeTurn(gameBoard.gameBoard,2);
            let postTime = performance.now();
            singleFightObject.p2TimeTaken+=postTime-initTime;
            let error = gameBoard.PlaceCheckerAndCheckWinner(p2Selection,2);
            let winner = gameBoard.winner;
            if(error == -1){
                if  (gameBoard.areAllSlotsFilled()){
                  if (printDebug > 2){
                      console.log("Tie Game!");
                      singleFightObject.gameText.push("Tie Game!");
                      singleFightObject.orderedReport.push(log);
                  }
                    singleFightObject.ties++;
                    return;
                }
                if (printDebug > 3){
                    if (code2.currentError.isEmpty()){
                        let log = "P2 attempted to place at slot " + p2Selection + " ,but this is already full";
                        console.log(log);
                        singleFightObject.gameText.push(log);
                        singleFightObject.orderedReport.push(log);
                    }
                    else{
                    let log = "P2 Messed Up";
                    console.log(log);
                    singleFightObject.gameText.push(log);
                    singleFightObject.orderedReport.push(log);
                    singleFightObject.orderedReport.push(code2.currentError);
                    singleFightObject.errors.push(code2.currentError);
                    }
                }
                gameBoard.winner = 1;
                return gameBoard.winner;
              }
            return gameBoard.winner;
        }

        while (1){
            if (printDebug > 1){
                let log = "Turn: " + turn;
                console.log(log);
                singleFightObject.gameText.push(log);
                singleFightObject.orderedReport.push(log);
            }
            if (printDebug > 2){
                gameBoard.printGameBoard();
            }
            turn++;
            if (oneIsOnFirst){
                if (printDebug > 2){
                    singleFightObject.orderedReport.push(gameBoard.printGameBoard());
                }
                singleFightObject.gameStates.push(gameBoard.returnBoard());
                let winner = p1Turn();
                if (winner != 0){
                    break;
                }

                if (printDebug > 2){
                    singleFightObject.orderedReport.push(gameBoard.printGameBoard());
                }
                singleFightObject.gameStates.push(gameBoard.returnBoard());
                winner = p2Turn();
                if (winner != 0){
                    break;
                }
        }
        else{
            if (printDebug > 2){
                singleFightObject.orderedReport.push(gameBoard.printGameBoard());
            }
            singleFightObject.gameStates.push(gameBoard.returnBoard());
            p2Turn();
            if (printDebug > 2){
                singleFightObject.orderedReport.push(gameBoard.printGameBoard());
            }
            singleFightObject.gameStates.push(gameBoard.returnBoard());
            p1Turn();
        }
        if (gameBoard.winner != 0){
            break;
        }
        
    }


    if (gameBoard.winner === 1){
        singleFightObject.code1Wins++;
    }
    if (gameBoard.winner === 2){
          singleFightObject.code2Wins++;
    }
    if (printDebug > 2){
        let winnerString = {};
        if (gameBoard.winner === 1){
            winnerString = code1.name;
        }
        else{
            winnerString = code2.name;
        }
        let log = "WINNER WINNER CHICKEN DINNER: " + winnerString + "!!!\n";
        console.log(log);
        singleFightObject.gameText.push(log);
        singleFightObject.orderedReport.push(log);
    }
    if (printDebug > 5){
        let log = "Stats for Fight: " + code1.name + " vs " + code2.name + "\n"
        + code1.name + " Wins: " + singleFightObject.code1Wins + "\n"
        + code2.name + " Wins: " + singleFightObject.code2Wins + "\n"
        + "Ties " + singleFightObject.ties + '\n' + '\n';
        console.log(log);
        singleFightObject.gameStats.push(log);
        singleFightObject.orderedReport.push(log);
    }

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
}


function roundRobin(challengerCode,rounds,printDebug,compiling){
    let informationObject = {
        gameInfo: [],
        tournamentObj: {},
        userConsole: [],
        userErrors: [],
        orderedReport: [],
    }

    vm.on('console.log', (data) => {
        console.log(`VM stdout: ${data}`);
        informationObject.userConsole.push(data);
        informationObject.orderedReport.push( "User Console Log: " + data);
      });
    //Returns this object
    let tournamentObject ={
        wins: 0,
        losses: 0,
        ties: 0,
        battlesAsP1: [],
        battlesAsP2: [],
    };
    let leaderCodes = [];

    if (compiling){
        leaderCodes.push(new codeReader(randomAI,"Random"));
    }
    else {
    //Get Top 10 Slots
    //let smartyBoi = readTextFile('UserCode/minMaxSmart.js');
    //leaderCodes.push(new codeReader(smartyBoi,"SmartMinMax"));
    leaderCodes.push(new codeReader(randomAI,"Random"));
    leaderCodes.push(new codeReader(alwaysPlaceAt1,"AlwaysPlaceAtSlot1"));
    }

    leaderCodes.forEach(defendingCode => {
        let battleObject = AIBattle(challengerCode,defendingCode,rounds,printDebug,true);
        let battleObjectInverted = AIBattle(defendingCode,challengerCode,rounds,printDebug,true);
        tournamentObject.battlesAsP1.push(battleObject);
        tournamentObject.battlesAsP2.push(battleObjectInverted);

        informationObject.orderedReport.push(battleObject.orderedReport);
        informationObject.orderedReport.push(battleObjectInverted.orderedReport);
        if (battleObject.errors.length)
            informationObject.userErrors.push(battleObject.errors);
        if (battleObjectInverted.errors.length)
            informationObject.userErrors.push(battleObjectInverted.errors);
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
        switch (battleObjectInverted.winner) {
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

    return informationObject;
}


class codeReader{
    constructor(AICode,name){
        this.code = 'module.exports = function(boardState,playerNumber) { '+ AICode + ' }';
        this.name = name;
        this.currentError = {};
        this.debugErrors = [];
    }

    compileScript(){
        try{
            const script = new VMScript(this.code).compile();
            const script2 = new VMScript("module.exports = Math.random()");
        }
        catch (err){
            console.log("ERROR: " + err);
        }
    }
    saveScript(codeArg){
        try {
            this.P1Code = new VMScript(this.code);
        } catch (err) {
            console.error('Failed to save script.', err);
        }
    }

    runCodeTurn(boardState,player){
        let returnVal = -1;
        try{
            let p1functionInSandbox = vm.run(this.code);
            returnVal = p1functionInSandbox(boardState,player);
            //console.log("TIME TAKEN: " + timeTaken + " Player: " + player);
        } catch (err) {
            //Return Debugging Errors here
            this.currentError = err;
            this.debugErrors.push(err);
            console.error('Failed to execute script.', err);
        }
        if (returnVal < 0 || returnVal > 6){
            console.warn('Player Attempted Placing at ' + returnVal);
        }
        if (console.log > 4){
            console.log("placing at: " + returnVal);
        }
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


function formatOrderedLog(log){

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