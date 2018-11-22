DROP Database giftRegistry;

create database giftRegistry;
show databases;
use giftRegistry;


drop table Users;

CREATE TABLE Users (
user_id int auto_increment ,
firstname varchar(50) not null ,
lastname varchar(50) not null,
email varchar(50) not null, 
password_ varchar(50) not null, 
primary key(user_id)
);

CREATE TABLE Registries (
user_id int, 
registry_id int auto_increment ,
registriesTitle varchar(50) ,
registryDescription  varchar(50) not null,
primary key(registry_id),
foreign key(user_id) references Users(user_id)
);



CREATE TABLE Items (
item_id int auto_increment ,
registry_id int ,
itemName varchar(255),
itemDescription varchar(255),
status tinyint,
price double,
url varchar(255),
primary key(item_id),
foreign key(registry_id) references Registries(registry_id)
);

CREATE TABLE CART(
cart_id int auto_increment ,
item_id int ,
itemName varchar(255),
primary key(cart_id),
foreign key(item_id) references Items(item_id)
);


select* from Users;
 
INSERT INTO Users (firstname,lastname,email,password_) VALUES ('Haya','Alhumaid','Hkalhumaid@smu,edu','1234');
INSERT INTO  Registries(regitriesTitle,registryDescription,)VALUES ('Birthday', 'Gift for my birthday June16');

 INSERT INTO Items Values ('Ball', 'Bought', NULL);
 
 SELECT *
FROM Users
INNER JOIN Registries ON Users.registriesInfro=Registries.registriesInfro;

SELECT *
FROM Registries
INNER JOIN items ON Registries.itemName=items.itemName;


SElect * from registries;
 