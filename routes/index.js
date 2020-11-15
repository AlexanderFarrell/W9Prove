var express = require('express');
var router = express.Router();
const {body, validationResult} = require('express-validator');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', pageName: 'homepage' });
});

router.get('/getRate', function(req, res, next) {
  res.render('getRate', { title: 'Express' , pageName: 'getRate'});
});

module.exports = router;
