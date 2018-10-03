
//const {NodeVM, VMScript} = require('vm2');
const {NodeVM, VMScript} = require('vm2');
const readline = require('readline');
const randomAI = 'return Math.floor(Math.random() * (7)) + 0;';

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
    constructor(AICode){
        this.P1CodeString = 'module.exports = function(boardState) { '+ AICode + ' }';
    }

    saveScript(codeArg){
        try {
            this.P1Code = new VMScript(this.P1CodeString);
        } catch (err) {
            console.error('Failed to save script.', err);
        }
    }

    runCodeTurn(boardState){
        let p1ReturnVal = -1;
        try{
            let p1functionInSandbox = vm.run(this.P1CodeString);
            p1ReturnVal = p1functionInSandbox(boardState);
        } catch (err) {
            //Return Debugging Errors here
            console.error('Failed to execute script.', err);
        }
        return p1ReturnVal;
    }
    
};

module.exports = {
    codeReader,
    randomAI
  };