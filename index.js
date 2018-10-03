
const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const {codeReader,randomAI} = require('./codeReader.js');
const {gameStates} = require('./gameStates.js');

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))



  //Initialize game State
  let gameBoard = new gameStates();


  //Initialize A.I
  let codeRunnerP1 = new codeReader(randomAI);
  let codeRunnerP2 = new codeReader(randomAI);
  while (gameBoard.winner == 0){
    let p1Selection = codeRunnerP1.runCodeTurn();
    gameBoard.PlaceCheckerAndCheckWinner(p1Selection,1);
    let p2Selection = codeRunnerP2.runCodeTurn();
    gameBoard.PlaceCheckerAndCheckWinner(p2Selection,2);
  }

console.log("WINNER: " + gameBoard.winner);
