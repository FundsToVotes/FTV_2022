/* What does this do? How is this file used
 *
 */

import express from 'express';
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var router = express.Router();
var fileloc ="../../dummy_data/v1/topten.json"
const PROPUBLICA_API_KEY = process.env.PROPUBLICA_API_KEY

/* GET home page. */
router.get('/', function(req, res, next) {
  let pool = req.app.get("mysql")
  pool.query('SELECT * FROM candidate', (err, data, fields) => {
    if(err){
      console.log(err)
    }
    console.log(data)
  })
  res.send('topten');
});

router.get('/dummy', function(req, res, next) {
  res.sendFile(path.join(__dirname, fileloc));
});

export default router;
