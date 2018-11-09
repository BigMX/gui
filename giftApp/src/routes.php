<?php

use Slim\Http\Request;
use Slim\Http\Response;

//Routes
$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});
$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});


$user_id=-1;

// adding a new user
$app->post('/addusers', function ($request, $response) {
    $input = $request->getParsedBody();
    $sql = "INSERT INTO 
        Users (firstName,lastName,phone,email, password_) 
        VALUES (:firstName,:lastName,:phone,:email, :password_)";
    $sth = $this->dbConn->prepare($sql);
    $sth->bindParam("firstName", $input['firstName']);
    $sth->bindParam("lastName", $input['lastName']);
    $sth->bindParam("phone", $input['phone']);
    $sth->bindParam("email", $input['email']);
    $sth->bindParam("password_", $input['password_']);
    $sth->execute();
    return $this->response->withJson($input);
});
// 
//create account (displays all the users inserted)
$app->get('/users', function ($request, $response, $args) { 
	$sth = $this->dbConn->prepare(
		"SELECT * FROM Users" );
	$sth->execute();
	$users = $sth->fetchAll();
	return $this->response->withJson($users);
});

 
