
create database giftRegistry;
show databases;
use giftRegistry;



CREATE TABLE Users (
user_id int auto_increment ,
firstname varchar(50) not null ,
lastname varchar(50) not null,
email varchar(50) not null, 
password_ varchar(50) not null, 
primary key(user_id)
);

INSERT INTO Users (firstname,lastname,email,password_) VALUES ('Haya','Alhumaid','Hkalhumaid@smu.edu','1234');

CREATE TABLE Login (
user_id int auto_increment ,
email varchar(50) not null, 
password_ varchar(50) not null, 
primary key(user_id)
);

INSERT INTO Login (email, password_) VALUES ('Hkalhumaid@smu.edu', '1234' );

CREATE TABLE Registries (
user_id int, 
registry_id int auto_increment ,
registriesTitle varchar(50) ,
registryDescription  varchar(50) not null,
primary key(registry_id),
foreign key(user_id) references Users(user_id)
);

INSERT INTO  Registries (registriesTitle,registryDescription)VALUES ('Birthday', 'Gift for my birthday June16');

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


INSERT INTO Items (itemName,itemDescription, status, price,url)Values ('Ball', 'Circular', '1', '20' , 'www.google.com');


CREATE TABLE Cart(
cart_id int auto_increment ,
item_id int ,
itemName varchar(255),
primary key(cart_id),
foreign key(item_id) references Items(item_id)
);

INSERT INTO cart (itemName) VALUES ('Ball');

CREATE TABLE Stores(
store_id int auto_increment,
storeName varchar(255),
storeDecription varchar(255),
primary key (store_id)
);

CREATE TABLE Inventory(
store_id int auto_increment,
item_id int,
itemName varchar(255),
storeName varchar(255),
primary key (store_id),
foreign key(item_id) references Items(item_id)
);


INSERT INTO Inventory (itemName,storeName) VALUES ('hat','target');

SELECT * FROM Cart;
 
