CREATE DATABASE IF NOT EXISTS ftvBackEnd;
USE ftvBackEnd;

-- watch for 1062 warnings when using insert ignore into 
CREATE TABLE IF NOT EXISTS candidate (
	id int NOT NULL auto_increment PRIMARY KEY,
	`name` varchar(252) NOT NULL, 
    party varchar(5) NOT NULL,
    cid varchar(10) NOT NULL,
    FECCandID varchar(20) NOT NULL,
    distIDRunFor varchar(20) NOT NULL,
    cycle int NOT NULL
);
CREATE UNIQUE INDEX candidate_year_unique_cid on candidate (cid, cycle);

CREATE TABLE IF NOT EXISTS industry (
	id int NOT NULL auto_increment PRIMARY KEY,
	`code` varchar(252) NOT NULL,
    `name` varchar(252) NOT NULL
);
CREATE UNIQUE INDEX industry_unique_code on industry (`code`);

CREATE TABLE IF NOT EXISTS `candidate-industry`(
	candidate_id int NOT NULL,
    industry_id int NOT NULL,
    indivs int NOT NULL,
    pacs int NOT NULL,
    total int NOT NULL,
    last_updated varchar(252) NOT NULL,
    last_updated_ftv_db datetime DEFAULT current_timestamp,
    FOREIGN KEY (candidate_id)
		REFERENCES candidate(id),
    FOREIGN KEY (industry_id)
		REFERENCES industry(id),
	PRIMARY KEY(candidate_id, industry_id)
);