<?php

//create account
$app->get('/users', function ($request, $response, $args) { 
	$sth = $this->dbConn->prepare(
		"SELECT * FROM Users" );
	$sth->execute();
	$users = $sth->fetchAll();
	return $this->response->withJson($users);
});

//login
$app->get('/login', function ($request, $response, $args) { 
	$sth = $this->dbConn->prepare(
		"SELECT * FROM Login" );
	$sth->execute();
	$users = $sth->fetchAll();
	return $this->response->withJson($users);
});


//registry
$app->get('/registry', function ($request, $response, $args) { 
	$sth = $this->dbConn->prepare(
		"SELECT * FROM Registries" );
	$sth->execute();
	$users = $sth->fetchAll();
	return $this->response->withJson($users);
});


//item
$app->get('/items', function ($request, $response, $args) { 
	$sth = $this->dbConn->prepare(
		"SELECT * FROM Items" );
	$sth->execute();
	$users = $sth->fetchAll();
	return $this->response->withJson($users);
});

//shopping cart
$app->get('/cart', function ($request, $response, $args) { 
	$sth = $this->dbConn->prepare(
		"SELECT * FROM Cart" );
	$sth->execute();
	$users = $sth->fetchAll();
	return $this->response->withJson($users);
});