<?php
// Application middleware

// e.g: $app->add(new \Slim\Csrf\Guard);

/*

$arrData=[
	"path" => "api",
	"attribute" => "decoded_token_data",
	"secret" => "supersecretkeyyoushouldnotcommittogithub",
	"algorithm" => ["HS256"],
	"error" => function ($response, $arguments) {
		$data["status"] = "error";
		$data["message"] = $arguments["message"];
		return $response
		->withHeader("Content-Type", "application/json")
		->withHeader("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjpudWxsLCJlbWFpbCI6bnVsbH0.ZQBWd-2ksow_Ty-9dfwQfyeR8fMtAB_leFBibGMW0aM")
		->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
	}
	]; //closes array

$objData =  new \Slim\Middleware\JwtAuthentication($arrData);
*/


$app->add(new \Slim\Middleware\JwtAuthentication([
	//routes that need the token
	"path" => [	"/addinvitation", "/invitation/{code}", "/invitations/{status}", "/changeinvitation/{id}", "/displayinvitation/{id}", "/invitationcode/{receiverEmail}", "/invitationstatus/{receiverEmail}", "/acceptinvitation", "/getinvitation"
				"/addtocart","/cart/{user_id}", "/deleteitem/{item_id}", 
				"/users", "/user/{user_id}", "/users/{lastName}", "/changepassword/{user_id}",
				"/addnotifcation", "/notifications/{user_id}", "/deletenotification/{notification_id}", 
				"/registry/{user_id}", "addnewregistry", "/registries/{registry_id}", "/deleteregistry/{registry_id}", "/changeregistrystatus/{registry_id}", "/archive/{user_id}", "/additemstoregistry/{registry_id}"
				],
	"header" => "X-Token",
	"algorithm" => ["HS256", "HS384"],
    	"secret" => "supersecretkeyyoushouldnotcommittogithub",
	"secure" => false
]));
