<?php
// Application middleware

// e.g: $app->add(new \Slim\Csrf\Guard);

$app->add(new \Slim\Middleware\JwtAuthentication([
	//routes that need the token
	"path" => [	"/addinvitation", "/invitation/{code}", "/invitations/{status}", "/changeinvitation/{id}", "/displayinvitation/{id}", "/invitationcode/{receiverEmail}", "/invitationstatus/{receiverEmail}", "/acceptinvitation", "/getinvitation", "/deleteinvitation",
				"/addtocart","/cart/{user_id}", "/deleteitem/{item_id}",
				"/itemregistry", "/itembought", "/item/{registry_id}","/changeitem/{item_id}/{user_id}", "/buyitem/{item_id}","/getclaimeditem/{user_id}", "/getboughtitem/{user_id}", "/getitemname/{name}", "/getitemstore/{location}",
				"/users", "/user/{user_id}", "/users/{lastName}", "/changepassword/{user_id}",
				"/addnotifcation", "/notifications/{user_id}", "/deletenotification/{notification_id}", 
				"/registry/{user_id}", "addnewregistry", "/registries/{registry_id}", "/deleteregistry/{registry_id}", "/changeregistrystatus/{registry_id}", "/archive/{user_id}", "/additemstoregistry/{registry_id}", "/getusers/{registry_id}"
				],
	"header" => "X-Token",
	"algorithm" => ["HS256", "HS384"],
    	"secret" => "secretcode",
	"secure" => false
]));
