<?php
use Slim\Http\Request;
use Slim\Http\Response;
use \Firebase\JWT\JWT;

//Routes
$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

// Add Cors
$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});


// ---------- user routes ----------

// adding a new user or signup
$app->post('/signup', function ($request, $response) {
    $input = $request->getParsedBody();
    $sql = "INSERT INTO 
        Users (firstName,lastName,phone,email, password) 
        VALUES (:firstName,:lastName,:phone,:email, :password)";
    $sth = $this->dbConn->prepare($sql);
    $sth->bindParam("firstName", $input['firstName']);
    $sth->bindParam("lastName", $input['lastName']);
    $sth->bindParam("phone", $input['phone']);
    $sth->bindParam("email", $input['email']);
    $sth->bindParam("password", $input['password']);
    $sth->execute();
    return $this->response->withJson($input);
});


// login to your account
$app->post('/login', function (Request $request, Response $response, array $args) {
    $input = $request->getParsedBody();
    $sql = "SELECT user_id FROM Users WHERE email=:email AND password =:password";
    $sth = $this->dbConn->prepare($sql);
    $sth->bindParam("email", $input['email']);
    $sth->bindParam("password", $input['password']);
    $sth->execute();
	$users = $sth->fetchAll();
	
     	// verify email address.
    if(!$users) {
        return $this->response->withJson(['error' => true, 'message' => 'These credentials do not match our records.']);  
    }
    
    $settings = $this->get('settings'); // get settings array.
    $now = time();

		$token = array(
			"email" => $email,
			"iat" => $now,
			"nbf" => $now,
			"exp" => $now + 7200 //can use for 1 hour
		);
		
   //store token 
   $token = JWT::encode(['user_id' => $users->user_id, 'email' => $users->email], $settings['jwt']['secret'], "HS256"); 

   $_SESSION['user_email'] = $input['email'];
            foreach($users as $user){
                $_SESSION['userId'] = $user['user_id'];
        }
    //return $this->response->withJson(["token" => $token]);
    return $this->response->withJson($user);
});

//check if the user is logged in
$app->group('/api', function(\Slim\App $app) {
    $app->get('/user',function(Request $request, Response $response, array $args) {
        return $this->response->withJson( $_SESSION['userId']);
    });
});

//logout
$app->group('/api', function(\Slim\App $app) {
    $app->get('/logout',function(Request $request, Response $response, array $args) {
		$_COOKIE['token'];
        return $_SESSION['userId'] = null;
    });
});

//get all info for a user from the users table by user_id 
$app->get('/user/{user_id}', function ($request, $response, $args) { 
	$sth = $this->dbConn->prepare(
		"SELECT * FROM Users WHERE user_id =:user_id" );
	$sth->bindParam("user_id", $args['user_id']);	
	$sth->execute();
	$users = $sth->fetchAll();
	return $this->response->withJson($users);
});

//get all info for a user from the users table by lastname 
$app->get('/users/{lastName}', function ($request, $response, $args) { 
	$sth = $this->dbConn->prepare(
		"SELECT * FROM Users WHERE lastName =:lastName" );
	$sth->bindParam("lastName", $args['lastName']);	
	$sth->execute();
	$users = $sth->fetchAll();
	return $this->response->withJson($users);
});

//update user password
$app->put('/changepassword/{user_id}', function ($request, $response, $args) {
	$input = $request->getParsedBody();
	$sql = "UPDATE Users SET password = :password WHERE user_id = :user_id";
	$sth = $this->dbConn->prepare($sql);
	$sth->bindParam("user_id", $args['user_id']);
	$sth->bindParam("password", $input['password']);
	$res = $sth->execute();
	return $this->response->withJson(["updated" => $sth->rowCount() == 1]);
});

//display all the users 
$app->get('/users', function ($request, $response, $args) { 
	$sth = $this->dbConn->prepare(
		"SELECT * FROM Users");
	$sth->execute();
	$users = $sth->fetchAll();
	return $this->response->withJson($users);
});

// ---------- cart/item routes ----------

//add to cart
$app->post('/addtocart', function ($request, $response) {
    $input = $request->getParsedBody();
    $sql = "INSERT INTO 
        Items (name,price,location,status,user_id) 
        VALUES (:name,:price,:location,:status, :user_id)";
    $sth = $this->dbConn->prepare($sql);
    $sth->bindParam("name", $input['name']);
    $sth->bindParam("price", $input['price']);
    $sth->bindParam("location", $input['location']);
    $sth->bindParam("status", $input['status']);
      $sth->bindParam("user_id", $input['user_id']);
    $sth->execute();
    return $this->response->withJson($input);
});

//displays all everything in the items table
$app->get('/cart/{user_id}', function ($request, $response, $args) { 
	$sth = $this->dbConn->prepare(
		"SELECT * FROM Items WHERE user_id = :user_id");
	$sth->bindParam("user_id", $args['user_id']);	
	$sth->execute();
	$users = $sth->fetchAll();
	return $this->response->withJson($users);

});

//add items to registry //idk if we need this
$app->post('/additems', function ($request, $response) {
    $input = $request->getParsedBody();
    $sql = "INSERT INTO 
        Items (name,price,location,status) 
        VALUES (:name,:price,:location,:status)";
    $sth = $this->dbConn->prepare($sql);
    $sth->bindParam("name", $input['price']);
    $sth->bindParam("price", $input['price']);
    $sth->bindParam("location", $input['location']);
    $sth->bindParam("status", $input['status']);
    $sth->execute();
    return $this->response->withJson($input);
});

// ---------- registry routes ----------

//add a new registry
$app->post('/addnewregistry', function ($request, $response) {
    $input = $request->getParsedBody();
    $sql = "INSERT INTO 
        Registries (user_id,name,description,status) 
        VALUES (:user_id, :name,:description,:status)";
    $sth = $this->dbConn->prepare($sql);
    $sth->bindParam("user_id", $input['user_id']);
    $sth->bindParam("name", $input['name']);
    $sth->bindParam("description", $input['description']);
    $sth->bindParam("status", $input['status']);
    $sth->execute();
    return $this->response->withJson($input);  
});

//registry
$app->get('/registry/{user_id}', function ($request, $response, $args) { 
	$sth = $this->dbConn->prepare(
		"SELECT * FROM Registries WHERE user_id = :user_id");
	$sth->bindParam("user_id", $args['user_id']);
	$sth->execute();
	$user = $sth->fetchAll();
	return $this->response->withJson($user);
});

//registry
$app->get('/registries/{registry_id}', function ($request, $response, $args) { 
    $sth = $this->dbConn->prepare(
        "SELECT * FROM Registries WHERE registry_id = :registry_id");
    $sth->bindParam("registry_id", $args['registry_id']);
    $sth->execute();
    $user = $sth->fetchAll();
    return $this->response->withJson($user);
});

//delete the whole registry related to that user_id
$app->delete('/deleteregistry/{user_id}', function ($request, $response, $args) {
    $sth = $this->dbConn->prepare("DELETE FROM Registries WHERE user_id=:user_id");
    $sth->bindParam("user_id", $args['user_id']);
    $sth->execute();  
    return $this->response->withJson(["success" => $sth->rowCount() == 1]);
});
 
// // //delete a user from a registry 
// $app->delete('/deleteuserregistry/{user_id}', function ($request, $response, $args) {
//  $sql = "DELETE FROM Registries WHERE user_id = :user_id";
//  $sth = $this->dbConn->prepare($sql);
//  $sth->bindParam("user_id", $args['user_id']);
//  $sth->execute();
//  return $this->response->withJson(["success" => $sth->rowCount() == 1]);
// });

// //delete registry table based on the registry_id
// $app->delete('/deletearegistry/{registry_id}', function ($request, $response, $args) {
//     $sql = "DELETE FROM Registries WHERE registry_id = :registry_id";
//     $sth = $this->dbConn->prepare($sql);
//     $sth->bindParam("registry_id", $args['registry_id']);
//     $sth->execute();
//     return $this->response->withJson(["success" => $sth->rowCount() == 1]);
// });

// ---------- invitation routes ----------

//add a new invitation //tell her to change registryId to registry_id
$app->post('/addinvitation', function ($request, $response) {
    $input = $request->getParsedBody();
    $sql = "INSERT INTO 
        Invitation (registry_id, receiverEmail, Code, status) 
        VALUES (:registry_id, :receiverEmail, :Code, :status)";
    $sth = $this->dbConn->prepare($sql);
    $sth->bindParam("registry_id", $input['registry_id']);
    $sth->bindParam("receiverEmail", $input['receiverEmail']);
    $sth->bindParam("Code", $input['Code']);
    $sth->bindParam("status", $input['status']);
    $sth->execute();
    return $this->response->withJson($input);  
});

//display invitation with having code an the input
$app->post('/invitation/{code}', function ($request, $response) { 
	$input = $request->getParsedBody();
	$sql = "SELECT * FROM Invitation WHERE receiverEmail = :receiverEmail AND Code = :Code" ;
	$sth = $this->dbConn->prepare($sql);
	$sth->bindParam("receiverEmail", $input['receiverEmail']);
	$sth->bindParam("Code", $input['Code']);
	$sth->execute();
	$user = $sth->fetchAll();
	return $this->response->withJson($user);
});

//display invitation 
$app->post('/invitations/{status}', function ($request, $response) { 
	$input = $request->getParsedBody();
	$sql = "SELECT * FROM Invitation WHERE receiverEmail = :receiverEmail AND status = :status" ;
	$sth = $this->dbConn->prepare($sql);
	$sth->bindParam("receiverEmail", $input['receiverEmail']);
	$sth->bindParam("status", $input['status']);
	$sth->execute();
	$user = $sth->fetchAll();
	return $this->response->withJson($user);
});

//update user password
$app->put('/changeinvitation/{id}', function ($request, $response, $args) {
    $input = $request->getParsedBody();
    $sql = "UPDATE Invitation SET status = :status WHERE id = :id";
    $sth = $this->dbConn->prepare($sql);
    $sth->bindParam("id", $args['id']);
    $sth->bindParam("status", $input['status']);
    $res = $sth->execute();
    return $this->response->withJson(["updated" => $sth->rowCount() == 1]);
});

// ---------- notification routes ----------

//add Notifications
$app->post('/addNotifications', function ($request, $response) {
    $input = $request->getParsedBody();
    $sql = "INSERT INTO 
        Notif (user_id,notifications) 
        VALUES (:user_id, :notifications)";
    $sth = $this->dbConn->prepare($sql);
    $sth->bindParam("user_id", $input['user_id']);
    $sth->bindParam("notifications", $input['notifications']);
    $sth->execute();
    return $this->response->withJson($input);
});

//display Notifications
$app->get('/notifications/{user_id}', function ($request, $response, $args) { 
	$sth = $this->dbConn->prepare(
		"SELECT notifications FROM Notif WHERE user_id = :user_id");
	$sth->bindParam("user_id", $args['user_id']);
	$sth->execute();
	$user = $sth->fetchAll();
	return $this->response->withJson($user);
});

//delete notifications table based on the notifications_id
$app->delete('/deletenotification/{Notifications_id}', function ($request, $response, $args) {
    $sql = "DELETE FROM Notif WHERE Notifications_id = :Notifications_id";
    $sth = $this->dbConn->prepare($sql);
    $sth->bindParam("Notifications_id", $args['Notifications_id']);
    $sth->execute();
    return $this->response->withJson(["success" => $sth->rowCount() == 1]);
});

// ---------- needs to be fixed ----------

// //changing the status of the item to bought or not bought
// $app->put('/items/{status}', function ($request, $response, $args) {
// 	$input = $request->getParsedBody();
// 	$sql = "Update items SET status = :status WHERE item_id = :item_id";
// 	$sth = $this->dbConn->prepare($sql);
// 	$sth->bindParam("item_id", $input['item_id']);
// 	$sth->bindParam("status", $args['status']);
// 	$res = $sth->execute();
// 	return $this->response->withJson(["updated" => $sth->rowCount() == 1]);
// });

// //display the user id of the person that bought the item from the registry 
// $app->get('/items/{item_id}', function ($request, $response, $args) { 
// 	$sth = $this->dbConn->prepare(
// 		"SELECT *
//          FROM Registries r  
//          LEFT JOIN Users u
//          ON u.user_id = r.user_id
//          LEFT JOIN Items i 
//          ON u.user_id = i.user_id; );
// 	$sth->bindParam("item_id", $args['item_id']);
// 	$sth->execute();
// 	$users = $sth->fetchAll();
// 	return $this->response->withJson($users);
// });
