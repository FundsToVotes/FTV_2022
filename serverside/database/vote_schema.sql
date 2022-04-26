CREATE TABLE congressperson (
	id VARCHAR(10) primary key not null,
    `name` VARCHAR(255) NOT NULL,
    congress_number INT NOT NULL,
    senate bool
);

CREATE TABLE bill (
	id varchar(255) primary key NOT NULL,
    bill_slug varchar(45) NOT NULL,
    bill_number varchar(45) NOT NULL, 
    sponsor_id varchar(10) NOT NULL,
    sponsor_uri varchar(400) NOT NULL,
    bill_uri varchar(400) NOT NULL,
    title TEXT NOT NULL,
    latest_action TEXT NOT NULL,
    short_title TEXT NOT NULL,
    primary_subject TEXT NOT NULL,
    opensecrets_sector_prefix varchar(20) NOT NULL,
    opensecrets_sector varchar(50) NOT NULL,
    opensecrets_sector_long varchar(50) NOT NULL
);

CREATE TABLE vote_session (
	id INT NOT NULL auto_increment primary key,
    `date` date NOT NULL,
    senate boolean NOT NULL,
    bill_id varchar(255) NOT NULL,
    FOREIGN KEY (bill_id)
		REFERENCES bill(id)
);
create unique index unique_vote_session on vote_session(bill_id, `date`);

create table vote (
	congressperson_id varchar(10) NOT NULL,
    vote_session_id int NOT NULL,
    position varchar(10) NOT NULL,
    FOREIGN KEY (congressperson_id)
		REFERENCES congressperson(id),
    FOREIGN KEY (vote_session_id)
		REFERENCES vote_session(id),
	primary key (congressperson_id, vote_session_id)
);
CREATE UNIQUE INDEX one_vote_per_session ON vote(congressperson_id, vote_session_id);