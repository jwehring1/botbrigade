var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('input_ai', { title: 'Code Your AI' });
console.log("diddle");
});
module.exports = router;