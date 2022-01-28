import express from 'express';
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// this will connect to our database that has openSecrets data...

var router = express.Router();
var fileloc ="../../dummy_data/v1/topten.json"

/* GET home page. */
router.get('/', function(req, res, next) {
  let pool = req.app.get("mysql")
  pool.query('SELECT * FROM topten', (err, data, fields) => {
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
