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

 
//login enters the email and displays the user_id
$app->get('/login/[{email}]', function ($request, $response, $args) { 
	$sth = $this->dbConn->prepare(
		"SELECT user_id FROM Users WHERE email=:email" );
	$sth->bindParam("email", $args['email']);
	$sth->bindParam("password_", $args['password_']);
	$sth->execute();
	$users = $sth->fetchObject();
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

//display the user id of the person that bought the item from the registry 
$app->get('/items/{item_id}', function ($request, $response, $args) { 
	$sth = $this->dbConn->prepare(
		"SELECT u.user_id 
		FROM Users u 
		LEFT JOIN Registries r 
		ON u.user_id = r.user_id
		LEFT JOIN items i
		ON r.registry_id = i.registry_id
		WHERE item_id = :item_id" );
	$sth->bindParam("item_id", $args['item_id']);
	$sth->execute();
	$users = $sth->fetchAll();
	return $this->response->withJson($users);
});

//registry
$app->get('/registry/[{user_id}]', function ($request, $response, $args) { 
	$sth = $this->dbConn->prepare(
		"SELECT * FROM Registries WHERE user_id = :user_id");
	$sth->bindParam("user_id", $args['user_id']);
	$sth->execute();
	$user = $sth->fetchObject();
	return $this->response->withJson($user);
});


//add users to registry
$app->post('/addtoregistry', function ($request, $response) {
    $input = $request->getParsedBody();
    $sql = "INSERT INTO 
        Registries (user_id,registriesTitle,registryDescription) 
        VALUES (:user_id, :registriesTitle,:registryDescription)";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("user_id", $input['user_id']);
    $sth->bindParam("registriesTitle", $input['registriesTitle']);
    $sth->bindParam("registryDescription", $input['registryDescription']);
    $sth->execute();
    return $this->response->withJson($input);
});

//add items to registry
$app->post('/additems', function ($request, $response) {
    $input = $request->getParsedBody();
    $sql = "INSERT INTO 
        Registries (registry_id,itemName,itemDescription,buyerUser_id,price,url) 
        VALUES (:registry_id,:itemName,:itemDescription,:buyerUser_id,:price,:url)";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("registry_id", $input['registry_id']);
    $sth->bindParam("itemName", $input['itemName']);
    $sth->bindParam("itemDescription", $input['itemDescription']);
    $sth->bindParam("buyerUser_id", $input['buyerUser_id']);
    $sth->bindParam("price", $input['price']);
    $sth->bindParam("url", $input['url']);
    $sth->execute();
    return $this->response->withJson($input);
});

// 
// //delete registry table //not
// $app->delete('/deleteregistry/[{registry_id}]', function ($request, $response) {
// 	$input = $request->getParsedBody();
// 	$sql = "DELETE FROM Registries WHERE registry_id = :registry_id";
// 	$sth = $this->db->prepare($sql);
// 	$sth->bindParam("registry_id", $input['registry_id']);
// 	$sth->execute();
// 	return $this->response->withJson($input);
// });

//delete a user from a registry //not  
$app->delete('/deleteuserregistry/[{user_id}]', function ($request, $response) {
	$input = $request->getParsedBody();
	$sql = "DELETE FROM Registries WHERE user_id = :user_id";
	$sth = $this->db->prepare($sql);
	$sth->bindParam("user_id", $input['user_id']);
	$sth->execute();
	return $this->response->withJson($input);
});

//changing the status of the item to bought or not bought //not 
$app->put('/items/[{status}]', function ($request, $response) {
	$input = $request->getParsedBody();
	$sql = "Update items SET status = :status WHERE item_id = :item_id";
	$sth = $this->db->prepare($sql);
	$sth->bindParam("item_id", $input['item_id']);
	$sth->bindParam("status", $input['status']);
	$sth->execute();
	return $this->response->withJson($input);
});

