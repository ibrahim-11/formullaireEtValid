<?php

class DbManager
{
    public function __construct($table)
    {
        $this->table = $table;
        $this->db = null;
    }


    private function connect()
    {
        if ($this->db === null) {
            //Connexion à la DB
            $host = "localhost";
            $port = "3306";
            $dbName = "db_js";
            $dsn = "mysql:host=$host;port=$port;dbname=$dbName";
            $user = "root";
            $pass = "";
            $db = null;
            try {
                $db = new PDO(
                    $dsn,
                    $user,
                    $pass,
                    array(
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
                    )
                );
            } catch (PDOException $e) {
                die("Erreur de connexion à la base de données : $e->getMessage()");
            }
            $this->db = $db;
        }
        return $this->db;
    }

    public function getAll($where = "1")
    {
    }

    public function getOne($id)
    {
    }

    public function insertOne($fields = [])
    { 
        $columns = "";
        $values = "";
       
        if (isset($fields['pwConfirm'])) {
           unset($fields['pwConfirm']);
    }
     if (isset($fields['tosCheck'])) {
            unset($fields['tosCheck']);
        }
        $valuesToBind = array();
        foreach ($fields as $k => $v) {
            $columns .= $k . ",";
            $values .= "?,";
            array_push($valuesToBind, $v);
        }
      
        
        $columns = trim($columns, ',');
        
      
     
        $values = trim($values, ',');
    

        $sql = "INSERT INTO $this->table ($columns) VALUES ($values)";
        $statment = $this->connect()->prepare($sql);
        $result = $statment->execute($valuesToBind);
        $test = $statment->rowCount() == 1;
        if ($result && $test) {
            $insertedId = $this->db->lastInsertId();
            $fields['id'] = $insertedId;
            // $entityClass = $this->entity;
            // $entity = new $entityClass($fields);
            return $insertedId;
        }
        return false;
    }

    
}
