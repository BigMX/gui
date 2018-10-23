<?php
//use Slim\Http\Request;
//use Slim\Http\Response;
//Routes
// $app->get('/[{name}]', function (Request $request, Response $response, array $args) {
//     // Sample log message
//     $this->logger->info("Slim-Skeleton '/' route");
    
    // Render index view
    //return $this->renderer->render($response, 'index.phtml', $args);
    
    //$salutation = isset($args["name"]) ? $args["name"] : 'world';
    //return $response->withJson(['hello' => $salutation]);

//});



$app->get('/gift', function ($request, $response, $args) { 
	$sth = $this->dbConn->prepare(
		"SELECT * From users" );
	$sth->execute();
	$users = $sth->fetchAll();
	return $this->response->withJson($users);
});

//Hello World
// $app->group('/api', function () use ($app) {
// 	$app->get('/hello', function ($request, $response, $args) { 
// 	return "Hello World";
// 	}); 
// });

//HW5 get 
// $app->get('/dbtest', function ($request, $response, $args) { 
// 	$sth = $this->dbConn->prepare(
// 		"SELECT * FROM test_db" );
// 	$sth->execute();
// 	$users = $sth->fetchAll();
// 	return $this->response->withJson($users);
// });

//get customer list hw6
// $app->get('/customers', function ($request, $response, $args) { 
// 	$sth = $this->db->prepare(
// 	"SELECT * FROM customer" );
// 	$sth->bindParam("customerName", $args['customerName']); 
// 	$sth->execute();
// 	$user = $sth->fetchObject();
// 	return $this->response->withJson($user);
// });
// 
// //get customer details hw6
// $app->get('/customer/{customerNumber}', function ($request, $response, $args) { 
// 	$sth = $this->db->prepare(
// 	"SELECT * FROM customers WHERE customerNumber = :customerNumber" );
// 	$sth->bindParam("customerNumber", $args['customerNumber']); 
// 	$sth->execute();
// 	$user = $sth->fetchObject();
// 	return $this->response->withJson($user);
// });
// 
// //get order list hw6
// $app->get('/orders', function ($request, $response, $args) { 
// 	$sth = $this->db->prepare(
// 	"SELECT * FROM orders" );
// 	$sth->bindParam("orderNumber", $args['orderNumber']); 
// 	$sth->execute();
// 	$user = $sth->fetchObject();
// 	return $this->response->withJson($user);
// });
// 
// //get order details hw6
// $app->get('/order/status/{orderNumber}', function ($request, $response, $args) { 
// 	$sth = $this->db->prepare(
// 	"SELECT * FROM orders WHERE orderNumber = :orderNumber" );
// 	$sth->bindParam("orderNumber", $args['orderNumber']); 
// 	$sth->execute();
// 	$user = $sth->fetchObject();
// 	return $this->response->withJson($user);
// });
// 
// //post hw6
// $app->post('/orders', function ($request, $response) { 
// $input = $request->getParsedBody();
// 	$sql = "INSERT INTO
// 			orders (orderNumber, orderDate, requiredDate, shippedDate, status, comments, customerNumber)
// 			VALUES (:orderNumber, :orderDate, :requiredDate, :shippedDate, :status, :comments, :customerNumber))"; 
// 	$sth = $this->db->prepare($sql); 
// 	$sth->bindParam("orderNumber", $input[':orderNumber']); 
// 	$sth->bindParam("orderDate", $input[':orderDate']); 
// 	$sth->bindParam("requiredDate", $input[':requiredDate']); 
// 	$sth->bindParam("shippedDate", $input[':shippedDate']); 
// 	$sth->bindParam("status", $input[':status']); 
// 	$sth->bindParam("comments", $input[':comments']);
// 	$sth->bindParam("customerNumber", $input[':customerNumber']); 
// 	$sth->execute();
// 	return $this->response->withJson($input); 
// });
// 
// //put hw6
// $app->put('/order/status/{orderNumber}', function ($request, $response) { 
// 	$input = $request->getParseBody();
// 	$sql =	"UPDATE order 
// 			SET status = :status 
// 			WHERE orderNumber = :orderNumber";
// 	$sth->bindParam("id", $input["id"]);  
// 	$sth->bindParam("last_name", $input["last_name"]);  
// 	$sth->execute();
// 	return $this->response->withJson($input); 
// });
// 
// //delete customer hw6
// $app->delete('customer/{customerNumber}', function ($request, $response) { 
// 	$input = $request->getParseBody();
// 	$sql = "DELETE FROM customer WHERE customerNumber= :customerNumber" );
// 	$sth = $this->db->prepare($sql);	
// 	$sth->bindParm("customerNumber". $input["customerNumber"]);  //???
// 	$sth->execute();
// 	return $this->response->withJson($input);
// });