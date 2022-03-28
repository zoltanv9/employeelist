<?php

const HOST_NAME = 'localhost';
const USER_NAME = 'root';
const PASSWORD = '';
const DB_NAME = 'employees';


class DB {

    //------------- adatbázis paraméterek beállítása -------------
    private $serverName = HOST_NAME;
    private $userName = USER_NAME;
    private $password = PASSWORD;
    private $database = DB_NAME;


    //------------- adatbázis kapcsolódás metódus-------------
    public function connectDB () {

        $conn= new mysqli($this->serverName,$this->userName,$this->password,$this->database);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        $conn->set_charset("utf8");

        return $conn;

    }


}