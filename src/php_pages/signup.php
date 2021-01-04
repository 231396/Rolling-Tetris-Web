<?php
    require "../php/database.php";
?>

<!DOCTYPE html>

<html lang="pt">

<head>
    <title>signup</title>
	<link rel="icon" type="image/ico" href="../../static/favicon.ico"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel='stylesheet' type='text/css' media='screen' href='../css/style-signup.css'>
    <meta charset="utf-8" />
</head>

<body>
    <form class="formulario" id="signup_form" method="POST" action="../php/signup_query.php" onsubmit="return validateForm()">
        <h2>Fomulário de Cadastro</h2>
        <label>Nome</label>
        <input type="text" name="name" placeholder="Seu Nome">
        <label>Data de Nascimento</label>
        <input type="date" name="datebirth" placeholder="Sua Data de Nascimento">
        <label>CPF</label>
        <input type="text" name="cpf" placeholder="Seu CPF" maxlength="11">
        <label>Telefone</label>
        <input type="text" name="phone" placeholder="Seu Telefone" maxlength="11">
        <label>E-mail</label>
        <input type="text" name="email" placeholder="Seu e-mail">        
        <label>Username</label>
        <input type="text" name="username" placeholder="Seu Username" maxlength="16">
        <label>Senha</label>
        <input type="password" name="password" placeholder="Sua senha" maxlength="16">
        <input type="submit" value="Cadastrar">
        <p><a href="login.php">Já estou cadastrado</a></p>
    </form>

    <script src="../js/signup.js"></script>
</body>

</html>
