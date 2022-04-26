/* This file contains a route that will query a candidate's top
 * ten industries for a given cycle
 */

import express from 'express';

var router = express.Router();

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
        \`name\` LIKE ?
      AND
        cycle = ?
      )
    ORDER BY
      total DESC;
  `

router.get('/', function(req, res, next) {
  let candidateId = req.query.cid
  let candidateFirstName = req.query.firstName
  let candidateLastName = req.query.lastName
  let chosenQuery, identifier
  if (candidateId) {
    chosenQuery = selectCandidateViaCIDTopTenQuery
    identifier = candidateId
  } else if (candidateFirstName, candidateLastName) {
    chosenQuery = selectCandidateViaNameTopTenQuery
    identifier = `%${candidateFirstName} ${candidateLastName}%`
  } else {
    res.status(400)
    res.send("No candidate information supplied")
    return next()
  }
  let cycle = req.query.cycle
  if (!cycle) {
    let currentDate = new Date()
    cycle = currentDate.getFullYear()
    if (cycle%2 != 0) {
      cycle -= 1
    }
  }
  // test with N00012192
  // and year 2020
  let pool = req.app.get("mysql")
  pool.query(chosenQuery, [identifier, cycle], (err, data, fields) => {
    if(err){
      res.status(500)
      res.send({
        "error": err,
        "msg": "Internal Server error"
      })
      return
    }
    if (data && data.length > 0) {
      res.send(data)
    } else {
      res.status(404)
      res.send("No results found for " + (candidateId || identifier) + " in cycle " + cycle )
    }
  });
});

export default router;
