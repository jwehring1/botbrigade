
const {NodeVM} = require('vm2');
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
        this.P1Code = P1Code;
        this.P2Code = P2Code;
    }

    compileCheckCode(codeArg){
        try {
            let script = new VMScript("Math.random()").compile();
        } catch (err) {
            console.error('Failed to compile script.', err);
        }
    }

    runP1CodeTurn(){
        try{
        let functionInSandboxP1 = vm.run(this.P1Code);
        var p1ReturnVal = functionInSandboxP1(boardState);
        } catch (err) {
            console.error('Failed to execute script.', err);
        }
        return p1ReturnVal;
    }

    checkCodeThenRun(){
        this.compileCheckCode(this.P1Code);
        for (let index = 0; index < 3; index++) {
            console.log(this.runP1CodeTurn);
        }
    }
    
};

module.exports = {
    codeReader
  };