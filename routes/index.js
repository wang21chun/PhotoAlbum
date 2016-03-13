var express = require('express');
var router = express.Router();
var upload = require('../server/upload');
var listData = [];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Photo' });
});

router.get('/list', function(req, res, next){
	console.log(listData);
	res.json(listData);
});

router.post('/upload', function(req, res, next){
	upload(req, res, listData, function(data){
		res.json(data);
	});
});
module.exports = router;
