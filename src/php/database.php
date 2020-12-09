<?php
    class Database {
        public $dbServerName = "localhost";
        public $dbUsername = "root";
        public $dbPassword = "";
        public $dbName = "rt";

        public function new_PDO(){
             return new PDO("mysql:host=$this->dbServerName;dbname=$this->dbName", $this->dbUsername, $this->dbPassword);
        }

        public function new_mysqli(){
            return new mysqli($this->dbServerName, $this->dbUsername, $this->dbPassword);
       }
    }

    $_Database = new Database();
?>