const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
var session = require('express-session');
var bodyParser = require('body-parser');
var session = require('express-session');
var multer = require('multer');
const PORT = process.env.PORT || 5000
const {writeAI,addUniqueUser,login}= require('./dbHandler');

const {AIBattle,randomAI,alwaysPlaceAt1,codeReader,roundRobin,readTextFile,printAI,outputString} = require('./codeReader.js');

let str2 = "";
let typed_code ="";
let log_fail_str = "";
let is_logged_in = false;

express()
  .use(express.static(path.join(__dirname, 'application/public')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true}))
  .use(session({
    cookieName: 'session',
    secret: 'random_string_goes_here',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
  }))
  .set('views', path.join(__dirname, 'application/views'))
  .set('view engine', 'ejs')
  .get('/', function(req,res){
    if(is_logged_in){
      console.log(req.session.user);
    }
    else{
      console.log("no.");
    }
    res.render('index', {account:req.session});
  })
  .get('/tutorial', (req, res) => res.render('tutorial', {account:req.session}))
  .get('/sign_up', (req, res) => res.render('sign_up', {account:req.session}))
  .get('/log_in', (req, res) => res.render('log_in', {result:"", account:req.session}))
  .get('/input_ai', (req, res) => res.render('input_ai', {output:"", typed: typed_code, account:req.session}))
  .get('/medium_tutorial', (req, res) => res.render('medium_tutorial', {output:"", typed: typed_code, account:req.session}))
  .get('/log_in/fail', (req, res) => res.render('log_in', {result:log_fail_str,account: req.session}))
  .get('/results', function(req, res, next){
    res.render('results', {output: str2, typed: typed_code, account: req.session});
  })
  .get('/medium_results', function(req, res, next){
    res.render('medium_results', {output: str2, typed: typed_code, account: req.session});
  })
  .post('/input', function(req, res){
    str2 = "";
    typed_code = req.body.code2;
    let challenger = new codeReader(typed_code,"PlayerCode");
    let battleReport = roundRobin(challenger,1,5);
    battleReport.orderedReport.forEach(element => {
      element.forEach(element => {
        str2+=element + "\n";
      });
    });
    res.redirect('/results');
  })
  .post('/medium_input', function(req, res){
    str2 = "";
    typed_code = req.body.code2;
    let challenger = new codeReader(typed_code,"PlayerCode");
    let battleReport = roundRobin(challenger,1,5,false);

    battleReport.orderedReport.forEach(element => {
      element.forEach(element => {
        str2+=element + "\n";
      });
    });
    res.redirect('/medium_results');
  })

  .post('/input_user', function(req, res){
    let username = req.body;
    addUniqueUser(username.user,username.pass);
    res.redirect('/sign_up');
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

 let test2 = addUniqueUser("A","B")
//  let test = writeAI("zemo","mission_report","December 16, 1991");
  let str = readTextFile('UserCode/minMaxStupid.js');
  
  //This sample snippit will play a round-robin game and return all information in the 'temp' object
  //let challenger = new codeReader(printAI,"PlayerCode");
  //challenger.runCodeTurn('testing123');
  //let temp = roundRobin(challenger,10);
