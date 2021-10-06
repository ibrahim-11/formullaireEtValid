<?php
include_once 'DbManager.php';
$dbManager = new DbManager("account");
if($_SERVER["REQUEST_METHOD"] === 'POST'){
    $_post = json_decode(file_get_contents('php://input'), true);
   
    
    $data = $dbManager->insertOne($_post );
    // echo ($data);
    echo json_encode($data);
}