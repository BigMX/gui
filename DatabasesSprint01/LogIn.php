<?php
use Slim\Http\Request;
use Slim\Http\Response;

$app->get('/login', function ($request, $response, $args) { 
	$sth = $this->db->prepare(
	"CREATE TABLE Users (
		id int ,
		firstname varchar(50), 
		lastname varchar(50),
		email varchar(50), 
		password_ varchar(50), 
		registriesInfro varchar(50));" ); 
	$sth->execute();
	$user = $sth->fetchObject();
	return $this->response->withJson($user);
});
