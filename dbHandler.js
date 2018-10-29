const theGreatLibrary = "archives.json"

function writeAI(userName,botName,code){
    let mkdirp = require('mkdirp');
    let fs = require('fs');

    let directory = 'UserCode/'+userName+'/';
    mkdirp(directory, function(err) { 
        // path exists unless there was an error

    });

    fs.writeFile(directory+"/"+botName, code, function(err) {
        if(err) {
            return console.log(err);
        }
    });
  };

function addUser(userName,password){
    let fs = require('fs');
    fs.readFile(theGreatLibrary, 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        let userTable = JSON.parse(data);
        userTable.table.push({userName: userName, password: password});
        let json = JSON.stringify(userTable);
        fs.writeFile(theGreatLibrary, json, 'utf8', function(err) {
            if(err) {
                return console.log(err);
            }
            else{
                return obj;
            }
        });
    }});
}

function readUsers(){
    let fs = require('fs');
    fs.readFile(theGreatLibrary, 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        let obj = JSON.parse(data);
        return obj;
    }});
}

function isUniqueUsername(userName){
    let fs = require('fs');
    fs.readFile(theGreatLibrary, 'utf8', function readFileCallback(err, data){
        if (err){
            generateDB();
            console.log(err);
        } else {
        if (!data){
            generateDB();
            return true;
        }
        let userTable = JSON.parse(data);
        if (!userTable.length){
            
            return true;
        }
        if (userTable.table.userName.find(userName)){
            return false;
        }
        return true;
    }});
}

function addUniqueUser(userName,password){
    if (isUniqueUsername(userName)){
        addUser(userName,password);
        return true;
    }
    return false;
}

function generateDB(){
    let fs = require('fs');
    let userTable = {
        table: []
    }
    let json = JSON.stringify(userTable);
    fs.writeFile(theGreatLibrary, json, 'utf8', function(err) {
        if(err) {
            return console.log(err);
        }
    });
}

  module.exports = {
    writeAI,
    addUniqueUser
}


