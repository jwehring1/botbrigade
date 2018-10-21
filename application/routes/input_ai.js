var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('input_ai', { title: 'Code Your AI' });

});
module.exports = router;