select
	position,
    vote_session.date,
    bill.*
from 
	vote 
left join
vote_session
on 
vote_session.id = vote_session_id
left join 
	bill
on
	bill.id = vote_session.bill_id
where 
	congressperson_id 
in 
	(SELECT
		id
	from 
		congressperson
	where 
		name = "maria cantwell" 
	and 
		congress_number=(
		select
			max(congress_number)
		from 
			congressperson        
		)
	)
limit 10