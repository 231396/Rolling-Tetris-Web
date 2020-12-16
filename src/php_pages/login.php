<?php
require "../php/database.php";

//unset($_COOKIE['nome']);
//setcookie("nome","Guilherme");
//unset($_COOKIE['nome']);
//  echo $_GET['']
session_start();
if (isset($_COOKIE)) {
    try {
        $conn = $_Database->new_PDO();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $query = $conn->query("SELECT username, password, id FROM player where
        username =" . "'" . $_COOKIE['username'] . "'" . "and password = " . "'" . $_COOKIE['password'] . "'");
        $credenciais = $query->fetch();
        if (isset($credenciais)) {
            $_SESSION['id'] = $credenciais['id'];
            $_SESSION['username'] = $credenciais['username'];
            $_SESSION['password'] = $credenciais['password'];
            header("Location: game.php");
        }
    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage();
    }
}



?>

<!DOCTYPE html>
<html lang="pt">

<head>

    <title>login</title>
    <link rel="icon" type="image/ico" href="../../static/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel='stylesheet' type='text/css' media='screen' href='../css/style-login.css'>
    <meta charset="utf-8" />

<body class="background">

    <div class="box">
        <h2 style="margin-bottom: 25px;">
            <span style="color: #F30C36">T</span>
            <span style="color: #FE8510">E</span>
            <span style="color: #FFCC1E">T</span>
            <span style="color: #4BC734">R</span>
            <span style="color: #00B9E9">I</span>
            <span style="color: #C01FBA">S</span>
        </h2>

        <form class="formulario" id="form_login" method="POST">

            <label>Username</label>
            <input class="input-login" type="text" name="login" maxlength="16">
            <span class="msg-erro msg-login"></span>

            <div style="margin-bottom: 10%;"></div>

            <label>Senha</label>
            <input class="input-password" type="password" name="password" maxlength="16">
            <span class="msg-erro msg-passw"></span>

            <div style="margin-bottom: 10%;"></div>
            <div id="btn-holder">
                <input class="btn" type="submit" value="Logar">
                <a href="signup.php" class="btn">Cadastrar</a>
            </div>
        </form>
    </div>

    <script src="../js/login.js"></script>
</body>

</html>