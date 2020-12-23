<?php
    session_start();
    $isLogged = isset($_SESSION['id'], $_SESSION['username'], $_SESSION['password']);

    if (!$isLogged)
        header('Location: ../php_pages/login.php');

?>