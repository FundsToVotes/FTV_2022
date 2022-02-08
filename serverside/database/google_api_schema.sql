CREATE DATABASE IF NOT EXISTS ftvBackEnd;
USE ftvBackEnd;

CREATE TABLE IF NOT EXISTS candidate_civicinfo (
	id int NOT NULL auto_increment PRIMARY KEY,
    `name` varchar(252) NOT NULL,
    address JSON NOT NULL,
    photoUrl varchar(252) NOT NULL,
    party varchar(100) NOT NULL
);
CREATE UNIQUE INDEX candidate_name on candidate_civicinfo (`name`);

CREATE TABLE IF NOT EXISTS phone_number (
	id int NOT NULL auto_increment,
    candidate_civicinfo_id int NOT NULL,
    phone varchar(20) NOT NULL,
    FOREIGN KEY (candidate_civicinfo_id)
		REFERENCES candidate_civicinfo(id),
	PRIMARY KEY (id, candidate_civicinfo_id)
);
CREATE UNIQUE INDEX unique_phone_number ON phone_number (phone);

CREATE TABLE IF NOT EXISTS url (
	id int NOT NULL auto_increment,
    candidate_civicinfo_id int NOT NULL,
    url varchar(252) NOT NULL,
    FOREIGN KEY (candidate_civicinfo_id)
		REFERENCES candidate_civicinfo(id),
	PRIMARY KEY (id, candidate_civicinfo_id)
);
CREATE UNIQUE INDEX unique_url ON url (url);

CREATE TABLE IF NOT EXISTS `channel` (
	id int NOT NULL auto_increment PRIMARY KEY,
    platform varchar(20) NOT NULL
);
CREATE UNIQUE INDEX unique_channel ON `channel`(platform);

CREATE TABLE IF NOT EXISTS `candidate_civicinfo-channel`(
	channel_id int NOT NULL,
    candidate_civicinfo_id int NOT NULL,
    id varchar(252) NOT NULL,
    FOREIGN KEY (candidate_civicinfo_id)
		REFERENCES candidate_civicinfo(id),
    FOREIGN KEY (channel_id)
		REFERENCES `channel`(id),
	PRIMARY KEY (candidate_civicinfo_id, channel_id, id)
);

