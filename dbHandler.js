const theGreatLibrary = "archives.json"
const leader = "leaderboard.json"
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
    let fs = require('fs');
    let data = fs.readFileSync(theGreatLibrary, 'utf8');
    let userTable = JSON.parse(data);
    userTable.push({userName: userName, password: password, rank: -1, code:""});
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
    if(userName == ""){
        return false;
    }
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

function login(userName,decPass){
    if(isUniqueUsername(userName))
    {
        return false;
    }
    let rand = "!,@,#,%kjdsakleja*3k4234lk,jdjlka*#^$*&!jhdfs3&#&*@JKFDH(@*@*(&#*$";
    let fs = require('fs');
    let data = fs.readFileSync(theGreatLibrary, 'utf8');
    let userTable = JSON.parse(data);
    for(i=0; i<userTable.length;i++)
    {
        if(userTable[i].userName==userName)
        {
            var decrypt = CryptoJS.AES.decrypt(userTable[i].password.toString(),rand,{}).toString(CryptoJS.enc.Utf8);
            if(decrypt==decPass)
                return true;
        }
    }
    return false;
}

function getRank(userName)
{
    let fs = require('fs');
    let data = fs.readFileSync(theGreatLibrary, 'utf8');
    let userTable = JSON.parse(data);
    for(i=0; i<userTable.length;i++)
    {
        if(userTable[i].userName==userName)
        {
            return userTable[i].rank;
        }
    }
}

function getCodes(userName)
{
    let fs = require('fs');
    let data = fs.readFileSync(theGreatLibrary, 'utf8');
    let userTable = JSON.parse(data);
    for(i=0; i<userTable.length;i++)
    {
        if(userTable[i].userName==userName)
        {
            return userTable[i].code;
        }
    }
}

function addCode(userName,userCode)
{
    let fs = require('fs');
    let data = fs.readFileSync(theGreatLibrary, 'utf8');
    let userTable = JSON.parse(data);
    for(i=0; i<userTable.length;i++)
    {
        if(userTable[i].userName==userName)
        {
            userTable[i].code=userCode;
            let json = JSON.stringify(userTable);
            fs.writeFileSync(theGreatLibrary, json, 'utf8',userTable);
        }
    }
}

function setRank(userName,rank)
{
    let fs = require('fs');
    let leaderData =  fs.readFileSync(leader, 'utf8');
    let userTable = JSON.parse(leaderData);
    if(userTable.indexOf(userName)==-1)
        userTable.splice(rank,0,userName);
    else
    {
        userTable.splice(userTable.indexOf(userName),1);
        userTable.splice(rank,0,userName);
    }
    let json = JSON.stringify(userTable);
    fs.writeFileSync(leader, json, 'utf8',userTable);
    let data = fs.readFileSync(theGreatLibrary, 'utf8');
    userTable = JSON.parse(data);
    for(i=0; i<userTable.length;i++)
    {
        if(userTable[i].userName==userName)
        {
            userTable[i].rank=rank;
            let json = JSON.stringify(userTable);
            fs.writeFileSync(theGreatLibrary, json, 'utf8',userTable);
        }
    }
}

function getRank()
{
    let fs = require('fs');
    let data = fs.readFileSync(leader, 'utf8');
    let userTable = JSON.parse(data);
    return userTable;
}

  module.exports = {
    writeAI,
    addUniqueUser,
    login,
    getRank,
    getCodes,
    addCode,
    setRank,
    getRank
}



