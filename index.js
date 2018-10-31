const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
var bodyParser = require('body-parser');
var multer = require('multer');
const PORT = process.env.PORT || 5000
const {writeAI,addUniqueUser}= require('./dbHandler');

const {AIBattle,randomAI,alwaysPlaceAt1,codeReader,roundRobin,readTextFile,printAI,outputString} = require('./codeReader.js');

let str2 = "";
let typed_code ="";

express()
  .use(express.static(path.join(__dirname, 'application/public')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true}))
  .set('views', path.join(__dirname, 'application/views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('index'))
  .get('/tutorial', (req, res) => res.render('tutorial'))
  .get('/input_ai', (req, res) => res.render('input_ai', {output:"", typed: typed_code}))
  .get('/results', function(req, res, next){
    let str3 = "" + str2;
    res.render('results', {output: str3, typed: typed_code});
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


  // let test2 = addUniqueUser("Doofenshmirtz","I<3Perry")
//  let test = writeAI("zemo","mission_report","December 16, 1991");
  let str = readTextFile('UserCode/minMaxStupid.js');
  
  //This sample snippit will play a round-robin game and return all information in the 'temp' object
  //let challenger = new codeReader(printAI,"PlayerCode");
  //challenger.runCodeTurn('testing123');
  //let temp = roundRobin(challenger,10);
