const theGreatLibrary = "archives.json"
var CryptoJS = require("crypto-js");

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

function addUser(userName,plainText){
    let rand = "!,@,#,%kjdsakleja*3k4234lk,jdjlka*#^$*&!jhdfs3&#&*@JKFDH(@*@*(&#*$";
    var password = CryptoJS.AES.encrypt(plainText, rand,{}).toString();
    var decrypt = CryptoJS.AES.decrypt(password.toString(),rand,{}).toString(CryptoJS.enc.Utf8);
    console.log(decrypt);
    let fs = require('fs');
    let data = fs.readFileSync(theGreatLibrary, 'utf8');
    let userTable = JSON.parse(data);
    userTable.push({userName: userName, password: password});
    let json = JSON.stringify(userTable);
    fs.writeFileSync(theGreatLibrary, json, 'utf8',userTable);
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
    let contents = [];
    contents = fs.readFileSync(theGreatLibrary, 'utf8');
    let flag = false;
    let userTable = JSON.parse(contents, function (key, value){
        if (key=="userName")
        {
            if(value==userName)
            {
                flag = true;
                return false;
            }
        }
    });
    if(!flag)
        return true;
    else
        return false;
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


