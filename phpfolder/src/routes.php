<?php

use Slim\Http\Request;
use Slim\Http\Response;
// Routes
// 
// $app->add(function ($req, $res, $next) {
//     $response = $next($req, $res);
//     return $response
//             ->withHeader('Access-Control-Allow-Origin', '*')
//             ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
//             ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
// });


//create account
$app->get('/users', function ($request, $response, $args) { 
	$sth = $this->dbConn->prepare(
		"SELECT * FROM Users" );
	$sth->execute();
	$users = $sth->fetchAll();
	return $this->response->withJson($users);
});

//login
$app->get('/users/[{user_id}]', function ($request, $response, $args) { 
	$sth = $this->dbConn->prepare(
		"SELECT email, password_ FROM Users WHERE user_id = :user_id" );
	$sth->bindParam("user_id", $args['user_id']);
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
