import express from 'express';
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('topten');
});

router.get('/dummy', function(req, res, next) {
  res.send('top ten dummy');
});

export default router;
