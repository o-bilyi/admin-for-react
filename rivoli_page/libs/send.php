<?php

$recipient = "beluy845@gmail.com";
$site_name = "Повідомлення із форми зворотнього звязку";

$name = trim($_POST["userName"]);
$email = trim($_POST["email"]);
$tel = trim($_POST["tel"]);
$comment = trim($_POST["description"]);

$message = "Ім'я: $name \n Мило: $email \n Коммент: $comment";

mail($recipient,$site_name,$message,
    "Content-type: text/plain; charset=\"utf-8\"\n From: $recipient");
