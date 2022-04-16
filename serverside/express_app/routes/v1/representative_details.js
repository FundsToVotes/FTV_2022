/* This file will contain all the details about a given representative
 * from our info queried from civicinfo.googleapis.com and then stored in our database.
 * This includes finances, officials' metadata. 
 */

import express from 'express';

var router = express.Router();

// good luck LMAO
// this query may need to be optimized, but that is not an issue to me rn
// since there are not millions of rows. I am desensitized to worrying about
// performance UNTIL there are at least a million records
let selectRepresentativeDetailsQuery = `
SELECT 
	civicinfo.\`name\` as "name",
	civicinfo.address as address,
  civicinfo.office as office,
  civicinfo.photoUrl as photoUrl,
  civicinfo.party as party,
  grouped_phone.phones as phones,
  grouped_url.urls as urls,
  CONCAT("[", grouped_channels.socials, "]") as channels
FROM 
	candidate_civicinfo as civicinfo
LEFT JOIN 
	(
	SELECT 
		candidate_civicinfo_id,
        CONCAT("[", '"',GROUP_CONCAT(phone separator ","), '"', "]") as phones
	FROM
		phone_number
	GROUP BY
		candidate_civicinfo_id
    ) as grouped_phone
ON 
	grouped_phone.candidate_civicinfo_id = civicinfo.id
LEFT JOIN 
	(
	SELECT 
		candidate_civicinfo_id,
        CONCAT("[", GROUP_CONCAT(CONCAT('"',url, '"') separator ","), "]") as urls
	FROM
		url
	GROUP BY
		candidate_civicinfo_id
    ) as grouped_url
ON 
	grouped_url.candidate_civicinfo_id = civicinfo.id
LEFT JOIN 
	(
	SELECT
		candidate_civicinfo_id,
        group_concat(concat('{"platform": "', platform, '", "id": "', ccc.id, '"}')) as socials
	FROM  
		\`candidate_civicinfo-channel\` as ccc
	LEFT JOIN 
		\`channel\` 
	ON
		\`channel\`.id = ccc.channel_id
	GROUP BY 
		candidate_civicinfo_id
    ) as grouped_channels
ON 
	grouped_channels.candidate_civicinfo_id = civicinfo.id
where 
	civicinfo.\`name\` like ?
`

router.get('/', async function(req, res, next) {
  let candidateFirstName = req.query.firstName
  let candidateLastName = req.query.lastName
  let candidateFullName = req.query.fullName
  let formattedCandidateName
  if ((candidateFirstName && candidateLastName) || candidateFullName) {
    if (!candidateFullName) {
      formattedCandidateName = `%${candidateFirstName}% %${candidateLastName}%`
      candidateFullName = `${candidateFirstName} ${candidateLastName}`
    } else {
      let splitCandidateFullName = candidateFullName.split(' ')
      if (splitCandidateFullName.length > 1) {
        try {
          formattedCandidateName = `%${splitCandidateFullName[0]}% %${splitCandidateFullName[splitCandidateFullName.length - 1]}%`
        } catch (err) {
          res.status(400)
          res.send("Bad full name supplied. Are there actually two names being supplied?")
          return next()
        }
      } else {
        res.status(400)
        res.send("Bad full name supplied. Are there actually two names being supplied?")
        return next()
      }
      
    }
  } else {
    res.status(400)
    res.send("Please supply a first AND last name OR the full candidate name")
    return next()
  } 
  let pool = req.app.get("mysql")
  pool.query(selectRepresentativeDetailsQuery, [formattedCandidateName], (err, data, fields) => {
    if(err){
      res.status(500)
      res.send({
        "error": err,
        "msg": "Internal Server error"
      })
    } else {
      if (data) {
        if (data.length == 0) {
          res.status(404)
          res.send(`Representative ${candidateFullName} not found!`)
        } else {
          res.send({
            name: data[0].name,
            address: data[0].address, 
            party: data[0].party,
            office: data[0].office,
            phones: JSON.parse(data[0].phones),
            photoUrl: data[0].photoUrl,
            urls: JSON.parse(data[0].urls),
            socials: JSON.parse(data[0].channels)
          });
        }
      } else {
        res.send("????")
      }
    }
  });
});

export default router;
