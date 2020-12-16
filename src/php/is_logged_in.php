<?php
    session_start();
    $isLogged = isset($_SESSION['id'], $_SESSION['username'], $_SESSION['password']);

    if (!$isLogged)
        echo '<div id="login-warn">Usario não logado <a href="../php_pages/login.php">(Realize o Login)</a></div>';

?>