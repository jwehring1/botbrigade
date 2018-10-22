function writeAI(userName,botName,code){
    let mkdirp = require('mkdirp');
    let fs = require('fs');

    let directory = 'UserCode/'+userName+'/'+botName;
    mkdirp(directory, function(err) { 
        // path exists unless there was an error

    });

    fs.writeFile(directory, code, function(err) {
        if(err) {
            return console.log(err);
        }
    });
}
module.exports = {
    writeAI
  };


