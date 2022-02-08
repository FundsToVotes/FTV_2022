import express from 'express';
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// this will connect to our database that has openSecrets data...
// TODO: USING A MAIN KEY: IF NOT FOUND IN DB, QUERY OPEN SECRETS DIRECTLY
// TO SEE IF THAT CANDIDATE EXISTS...

var router = express.Router();
var fileloc ="../../dummy_data/v1/topten.json"

let selectCandidateViaCIDTopTenQuery = `
  SELECT 
    industry.name as "industry_name",
    industry.code as "industry_code",
	  indivs,
    pacs,
    total,
    last_updated
  FROM
    \`candidate-industry\`
  LEFT JOIN
    industry
  ON
    industry.id = industry_id
  WHERE
    candidate_id=(
      SELECT
        candidate.id
      FROM
        candidate 
      WHERE 
        cid = ?
      AND 
        cycle = ?
      )
    ORDER BY
      total DESC;
  `

let selectCandidateViaNameTopTenQuery = `
  SELECT 
    industry.name as "industry_name",
    industry.code as "industry_code",
	  indivs,
    pacs,
    total,
    last_updated
  FROM
    \`candidate-industry\`
  LEFT JOIN
    industry
  ON
    industry.id = industry_id
  WHERE
    candidate_id=(
      SELECT
        candidate.id
      FROM
        candidate 
      WHERE 
        \`name\` = ?
      AND 
        cycle = ?
      )
    ORDER BY
      total DESC;
  `
/* GET home page. */
router.get('/', function(req, res, next) {
  let candidateId = req.query.cid
  let candidateName = req.query.name
  let chosenQuery, identifier
  if (candidateId) {
    chosenQuery = selectCandidateViaCIDTopTenQuery
    identifier = candidateId
  } else if (candidateName) {
    chosenQuery = selectCandidateViaNameTopTenQuery
    identifier = `%${candidateName}%`
  } else {
    res.status(400)
    res.send("No candidate ID supplied")
    return next()
  }
  
  let cycle = req.query.cycle
  if (!cycle) {
    let currentDate = new Date()
    cycle = currentDate.getFullYear()
  }
  if (cycle%2 != 0) {
    cycle -= 1
  }
  let pool = req.app.get("mysql")
  // 3 paths -> Invalid ID | Valid ID and data | Valid ID and no data |
  // test with N00012192
  // and year 2020
  let _ = pool.query(chosenQuery, [identifier, cycle], (err, data, fields) => {
    if(err){
      res.status(500)
      res.send({
        "error": err,
        "msg": "Internal Server error"
      })
    }
    res.send(data);
  });
});

router.get('/dummy', function(req, res, next) {
  res.sendFile(path.join(__dirname, fileloc));
});

export default router;
