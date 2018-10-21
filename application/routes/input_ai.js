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

// for parsing application/json
router.use(bodyParser.json()); 

// for parsing application/xwww-
router.use(bodyParser.urlencoded({ extended: true })); 

router.use(upload.array()); 
router.use(express.static('public'));

router.post('/', function(req, res, next){
   console.log(req.body);
});
module.exports = router;