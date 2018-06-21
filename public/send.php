<?php

$recipient = "beluy845@gmail.com";

$site_name = "Повідомлення із форми зворотнього звязку";

$name = trim($_POST["user"]);
$site = trim($_POST["site"]);
$email = trim($_POST["email"]);

$message = "Name : $name \n  Site : $site \n  E-mail: $email";

mail($recipient, $site_name, $message,
    "Content-type: text/plain; charset=\"utf-8\"\n From: $email");



