<?php
    require "../php/database.php";

    $conn = $_Database->new_PDO();
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $id = $_POST['id'];
    $score = $_POST['score'];
    $level = $_POST['level'];
    $duration = $_POST['duration'];

    $query = $conn->query("INSERT INTO game_match VALUES (null, $id, $score, $level, '$duration')");
    if ($query)
        echo "Sucess";
    
    $conn = null;
?>
