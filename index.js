const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
var bodyParser = require('body-parser');
var session = require('express-session');
var multer = require('multer');
const PORT = process.env.PORT || 5000
const {writeAI,addUniqueUser,login,getRank,getCodes,addCode,setRank,getLeaderboard}= require('./dbHandler');

const {AIBattle,randomAI,alwaysPlaceAt1,codeReader,roundRobin,readTextFile,printAI,outputString} = require('./codeReader.js');

let str2 = "";
let typed_code ="";
let log_fail_str = "";
let is_logged_in = false;

function compileCode(req,res){
    str2 = "";
    typed_code = req.body.code2;
    let challenger = new codeReader(typed_code,"PlayerCode");
    let battleReport = roundRobin(challenger,1,5,true);
    battleReport.orderedReport.forEach(element => {
      element.forEach(element => {
        str2+=element + "\n";
      });
    });
    battleReport.gameInfo.forEach(element => {
      str2+="\n" + battleReport.gameInfo;
    });
}
function submitCode(req,res){
    str2 = "";
    if(req.session && req.session.user){

      typed_code = req.body.code2;
      addCode(req.session.user,typed_code);
      let challenger = new codeReader(typed_code,"PlayerCode");
      let battleReport = roundRobin(challenger,1,5,false,req.session.user);
      battleReport.orderedReport.forEach(element => {
        element.forEach(element => {
          str2+=element + "\n";
        });
      });
      battleReport.gameInfo.forEach(element => {
        str2+="\n" + battleReport.gameInfo;
      });
      str2 = "Code Successfully Submitted to Rankings! Checkout out the leaderboards for more info.\n" + str2;
    }
    else{
      str2 = "ERROR: Please log in to submit your code.\n"
    }
}

express()
  .use(express.static(path.join(__dirname, 'application/public')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true}))
  .use(session({
    cookieName: 'session',
    secret: 'Cats Like Surfing On Mountains',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
  }))
  .set('views', path.join(__dirname, 'application/views'))
  .set('view engine', 'ejs')
  .get('/', function(req,res){
    res.render('index', {account:req.session});
  })
  .get('/tutorial', (req, res) => res.render('tutorial', {account:req.session}))
  .get('/about', (req, res) => res.render('about', {account:req.session}))
  .get('/leaderboards', function(req, res){
    let rank = -1;
    if(req.session && req.session.user){

      rank = getRank(req.session.user) + 1;
    }
  res.render('leaderboards', {account:req.session, rankings_list: getLeaderboard(),your_rank:rank})
  })
  .get('/arcade', (req, res) => res.render('arcade', {account:req.session}))
  .get('/sign_up', (req, res) => res.render('sign_up', {result: "", account:req.session}))
  .get('/log_in', (req, res) => res.render('log_in', {result:"", account:req.session}))
  .get('/input_ai', (req, res) => res.render('input_ai', {output:"", typed: typed_code, account:req.session}))
  .get('/round_robin', (req, res) => res.render('round_robin', {output:"", typed: typed_code, account:req.session}))
  .get('/medium_tutorial', (req, res) => res.render('medium_tutorial', {output:"", typed: typed_code, account:req.session}))
  .get('/advanced_tutorial', (req, res) => res.render('medium_tutorial', {output:"", typed: typed_code, account:req.session}))
  .get('/log_in/fail', (req, res) => res.render('log_in', {result:log_fail_str,account: req.session}))
  .get('/sign_up/fail', (req, res) => res.render('sign_up', {result:log_fail_str,account: req.session}))
  .get('/results', function(req, res, next){
    res.render('results', {output: str2, typed: typed_code, account: req.session});
  })
  .get('/medium_results', function(req, res, next){
    res.render('medium_results', {output: str2, typed: typed_code, account: req.session});
  })
  .get('/round_robin/results', function(req, res, next){
    res.render('round_robin', {output: str2, typed: typed_code, account: req.session});
  })
  .post('/input', function(req, res){
    //TODO: COMPILE CODE
    compileCode(req,res);
    res.redirect('/results');
  })
  .post('/submit_beginner', function(req, res){
    submitCode(req,res);
    res.redirect('/results');
  })
  .post('/ranked_compile', function(req, res){
    //TODO: COMPILE CODE
    compileCode(req,res);
    res.redirect('/round_robin/results');
  })
  .post('/submit_ranked', function(req, res){
    submitCode(req,res);
    res.redirect('/round_robin/results');
  })
  .post('/medium_input', function(req, res){
    compileCode(req,res);
    res.redirect('/medium_results');
  })
  .post('/submit_medium', function(req, res){
    submitCode(req,res);
    res.redirect('/medium_results');
  })


  .post('/input_user', function(req, res){
    let username = req.body;
    if(addUniqueUser(username.user,username.pass)){
      login(username.user,username.pass);
      req.session.user = username.user;
      is_logged_in = true;
      res.redirect('/');
    }
    else{

      log_fail_str = "Username is invalid or already exists. Try again.";
      res.redirect('/sign_up/fail');
    }
  })
  .post('/login', function(req, res){
    let username = req.body;
    let log_success = login(username.user,username.pass);
    if (log_success){
      req.session.user = username.user;
      is_logged_in = true;
      res.redirect('/');
    }
    else{
      log_fail_str = "Invalid Username or Password. Please try again.";
      res.redirect('/log_in/fail');
    }
  })
  .post('/logout', function(req,res){
    is_logged_in = false;
    typed_code = "";
    req.session.destroy();
    res.redirect('/');

  })
  /*
  .get('/arcade/results', function(req, res, next){
    let str3 = "" + str2;
    res.render('results', {output: str3, typed: typed_code});
  })
  .post('/arcade/input', function(req, res){
    typed_code = req.body.code2;
    let challenger = new codeReader(typed_code,"PlayerCode");
    let battleReport = roundRobin(challenger,1,1);
    str2 = "we in here";
    res.redirect('/arcade/results');
  })
  */
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
//  let test = writeAI("zemo","mission_report","December 16, 1991");
  let str = readTextFile('UserCode/minMaxStupid.js');
  
  //This sample snippit will play a round-robin game and return all information in the 'temp' object
  //let challenger = new codeReader(printAI,"PlayerCode");
  //challenger.runCodeTurn('testing123');
  //let temp = roundRobin(challenger,10);
