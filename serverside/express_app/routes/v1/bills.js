import express from 'express';
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('bills');
});
router.get('/dummy', function(req, res, next) {
  res.send('bills dummy');
});
export default router;
