const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const {AIBattle,randomAI,alwaysPlaceAt1,codeReader,roundRobin,readTextFile,printAI} = require('./codeReader.js');

express()
  .use(express.static(path.join(__dirname, 'application/public')))
  .set('views', path.join(__dirname, 'application/views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('index'))
  .get('/tutorial', (req, res) => res.render('tutorial'))
  .get('/input_ai', (req, res) => res.render('input_ai'))
  //.get('/cool', (req, res) => res.send(cool()))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))



  let str = readTextFile('UserCode/minMaxStupid.js');
  
  //This sample snippit will play a round-robin game and return all information in the 'temp' object
  //let challenger = new codeReader(printAI,"PlayerCode");
  //challenger.runCodeTurn('testing123');
  //let temp = roundRobin(challenger,10);


  var gameBoard = new Array(6);
for (var i = 0; i < gameBoard.length; i++){
  gameBoard[i] = new Array(7);
  gameBoard[i].fill(0);
}

  let challenger2 = new codeReader(str,"StupidMinMax");
let temp = roundRobin(challenger2,1,1);
