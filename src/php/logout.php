<?php
    session_start();

    session_destroy();
    session_unset();

    $past = time() - 3600;
    foreach ( $_COOKIE as $key => $value )
    {
        setcookie( $key, $value, $past, '/' );
    }
    
    header('Location: ../php_pages/login.php'); 
?>