DELIMITER //
CREATE PROCEDURE insertTopTen(
	cand_name varchar(255),
	cid varchar(64),
	cycle varchar(64),
	last_updated varchar(255),

	industry_code0 varchar(255),
	industry_name0 varchar(255),
	indivs0 int,
	pacs0 int,
	total0 int,
	
	industry_code1 varchar(255),
	industry_name1 varchar(255),
	indivs1 int,
	pacs1 int,
	total1 int,
	
	industry_code2 varchar(255),
	industry_name2 varchar(255),
	indivs2 int,
	pacs2 int,
	total2 int,
	
	industry_code3 varchar(255),
	industry_name3 varchar(255),
	indivs3 int,
	pacs3 int,
	total3 int,
	
	industry_code4 varchar(255),
	industry_name4 varchar(255),
	indivs4 int,
	pacs4 int,
	total4 int,
	
	industry_code5 varchar(255),
	industry_name5 varchar(255),
	indivs5 int,
	pacs5 int,
	total5 int,
	
	industry_code6 varchar(255),
	industry_name6 varchar(255),
	indivs6 int,
	pacs6 int,
	total6 int,
	
	industry_code7 varchar(255),
	industry_name7 varchar(255),
	indivs7 int,
	pacs7 int,
	total7 int,
	
	industry_code8 varchar(255),
	industry_name8 varchar(255),
	indivs8 int,
	pacs8 int,
	total8 int,
	
	industry_code9 varchar(255),
	industry_name9 varchar(255),
	indivs9 int,
	pacs9 int,
	total9 int
)
BEGIN
	-- if candidate exists in our db, drop their row
    DELETE FROM
		topten
	WHERE
		topten.cid = cid ;
	-- insert the candidate
    INSERT INTO topten(
		cand_name,cid,cycle,last_updated,
		industry_code0,industry_name0,indivs0,pacs0,total0,
		industry_code1,industry_name1,indivs1,pacs1,total1,
		industry_code2,industry_name2,indivs2,pacs2,total2,
		industry_code3,industry_name3,indivs3,pacs3,total3,
		industry_code4,industry_name4,indivs4,pacs4,total4,
		industry_code5,industry_name5,indivs5,pacs5,total5,
		industry_code6,industry_name6,indivs6,pacs6,total6,
		industry_code7,industry_name7,indivs7,pacs7,total7,
		industry_code8,industry_name8,indivs8,pacs8,total8,
		industry_code9,industry_name9,indivs9,pacs9,total9
    ) VALUES (
		cand_name,cid,cycle,last_updated,
		industry_code0,industry_name0,indivs0,pacs0,total0,
		industry_code1,industry_name1,indivs1,pacs1,total1,
		industry_code2,industry_name2,indivs2,pacs2,total2,
		industry_code3,industry_name3,indivs3,pacs3,total3,
		industry_code4,industry_name4,indivs4,pacs4,total4,
		industry_code5,industry_name5,indivs5,pacs5,total5,
		industry_code6,industry_name6,indivs6,pacs6,total6,
		industry_code7,industry_name7,indivs7,pacs7,total7,
		industry_code8,industry_name8,indivs8,pacs8,total8,
		industry_code9,industry_name9,indivs9,pacs9,total9
    );
END //