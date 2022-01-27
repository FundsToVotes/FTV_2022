import express from 'express';
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


var router = express.Router();
var fileloc ="../../dummy_data/v1/topten.json"

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('topten');
});

router.get('/dummy', function(req, res, next) {
  res.sendFile(path.join(__dirname, fileloc));
});

export default router;
