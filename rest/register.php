<?php
include_once 'DbManager.php';
$dbManager = new DbManager("account");
if($_SERVER["REQUEST_METHOD"] === 'POST'){
    $_post = json_decode(file_get_contents('php://input'));
    
    echo json_encode($_post);
}