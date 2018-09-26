const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const CODEREADER = require('./codeReader.js');

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))



  let codeRunner = new CODEREADER("temp","Temp");

  // let p1Code = "console.log('test'); let temp = 2; console.log(boardState); return 2;"
  // let p2Code = "return 1";
  // let boardState = "this is an example object";
  // let functionInSandboxP1 = vm.run("module.exports = function(boardState) { "+p1Code+" }");
  // let functionInSandboxP2 = vm.run("module.exports = function(boardState) { "+p2Code+" }");
  // var p1ReturnVal = functionInSandboxP1(boardState);
  // //Modify Board State based on input from p1 here
  // var p2ReturnVal = functionInSandboxP2(boardState);
  // console.log(p1ReturnVal);