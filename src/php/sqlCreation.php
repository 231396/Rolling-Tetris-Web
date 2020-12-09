<?php

    $dbServerName = "localhost";
    $dbUsername = "root";
    $dbPassword = "";
    $dbName = "rt";

    session_start();

    $_SESSION['dbServerName'] = $dbServerName;
    $_SESSION['dbUsername'] = $dbUsername;
    $_SESSION['dbPassword'] = $dbPassword;
    $_SESSION['dbName'] = $dbName;

    try{
        $conn = new mysqli($dbServerName, $dbUsername, $dbPassword);
        $conn->query("DROP DATABASE $dbName");

        if ($conn->query("CREATE DATABASE $dbName") === FALSE){
            "Error ao criar database - " . $conn->error;
            return;
        }

        $conn = new PDO("mysql:host=$dbServerName;dbname=$dbName", $dbUsername, $dbPassword);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $sql[] = '
            CREATE TABLE player(
                id INT PRIMARY KEY AUTO_INCREMENT,
                nome VARCHAR(50) not null,
                dtNascimento DATE not null,
                cpf NUMERIC(11) not null,
                telefone NUMERIC(11) not null,
                email VARCHAR(30) not null,
                username VARCHAR(16) not null,
                password VARCHAR(16) not null
            );';

        $sql[] = '
            CREATE TABLE game_match(
                idMatch INT PRIMARY KEY AUTO_INCREMENT,
                idPlayer INT not null,
                score INT not null,
                level INT not null,
                duration TIME not null,
                FOREIGN KEY (idPlayer) REFERENCES Player(id)
            );';

        $sql[] = '
            CREATE VIEW players_ranks AS
            SELECT p.id, p.username, gm.score, gm.level, gm.duration, ROW_NUMBER() OVER (ORDER BY gm.score DESC) as ROW_NUMBER
            FROM game_match gm
            INNER JOIN
                (SELECT idPlayer, MAX(score) AS maxScore
                FROM game_match
                GROUP BY idPlayer) groupedgm 
            ON gm.idPlayer = groupedgm.idPlayer 
            AND gm.score = groupedgm.maxScore
            INNER JOIN player p ON p.id = gm.idPlayer';
        
        for ($i=0; $i < count($sql); $i++)
            $temp = $conn->exec($sql[$i]);
            
        $conn = null;

        echo "<p>Database e Tabelas criadas com sucesso</p>";
    }
    catch(PDOException $e){
        echo "Connection failed: " . $e->getMessage();
    }
?>