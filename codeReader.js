
//const {NodeVM, VMScript} = require('vm2');
const {NodeVM, VMScript} = require('vm2');
const readline = require('readline');
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


class codeReader{
    constructor(P1Code,P2Code) {
        this.P1CodeString = 'module.exports = function(boardState) { '+ P1Code + ' }';
        this.P2CodeString = 'module.exports = function(boardState) { '+ P2Code + ' }';
        this.P1CodeCompiled = {};
        this.P2CodeCompiled = {};
    }

    saveCode(codeArg){
        try {
            this.P1Code = new VMScript(this.P1CodeString);
        } catch (err) {
            console.error('Failed to compile script.', err);
        }
    }

    runP1CodeTurn(boardState){
        let p1ReturnVal = -1;
        try{
            //let tempString = 'module.exports = function(boardState) { '+ this.P1Code + ' }';
            let p1functionInSandbox = vm.run(this.P1Code);
            p1ReturnVal = p1functionInSandbox(boardState);
        } catch (err) {
            //Return Debugging Errors here
            console.error('Failed to execute script.', err);
        }
        return p1ReturnVal;
    }

    runP2CodeTurn(boardState){
        let p2ReturnVal = -1;
        try{
        let p2ReturnVal = vm.run(this.P1Code);
        //var p2ReturnVal = functionInSandboxP2(boardState);
        } catch (err) {
            console.error('Failed to execute script.', err);
        }
        return p2ReturnVal;
    }

    checkCodeThenRun(){
        this.saveCode(this.P1Code);
        //DECLARE INITIAL BOARD STATE HERE

        let gameWon = false;
        while (!gameWon) {

            //Run p1 turn
            let p1Selection = this.runP1CodeTurn("temp");
            console.log("Player One Wants to put a checker in " + p1Selection);
            //Modify Board State Here

            //Run p2 Turn
            let p2Selection = this.runP2CodeTurn("temp2");
            console.log("Player Two Wants to put a checker in " + p2Selection);

            //Check Win Condition Here
            gameWon = true;
        }
    }
    
};

module.exports = {
    codeReader
  };