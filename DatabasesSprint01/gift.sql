DROP Database giftRegistry;

create database giftRegistry;
show databases;
use giftRegistry;


CREATE TABLE Users (
id int ,
firstname varchar(50), 
lastname varchar(50),
email varchar(50), 
password_ varchar(50), 
registriesInfro varchar(50)
);

CREATE TABLE Registries (
registriesInfro varchar(50),
itemName varchar(50),
description  varchar(50)
);

CREATE TABLE items (
itemName varchar(50),
bought varchar(50),
notbought  varchar(50)
);


 
 INSERT INTO Users VALUES ('1', 'Haya','Alhumaid','Hkalhumaid@smu,edu','1234', 'Birthday');
 INSERT INTO  Registries VALUES ('Birthday', 'Ball', 'circular');
 INSERT INTO Items Values ('Ball', 'Bought', NULL);
 
 SELECT *
FROM Users
INNER JOIN Registries ON Users.registriesInfro=Registries.registriesInfro;

SELECT *
FROM Registries
INNER JOIN items ON Registries.itemName=items.itemName;
 