<?php
    require "../php/is_logged_in.php";
?>

<!DOCTYPE html>
<html lang="pt">

<head>
    <title>Configuração da Conta</title>
	<link rel="icon" type="image/ico" href="../../static/favicon.ico"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel='stylesheet' type='text/css' media='screen' href='../css/style-account.css'>
    <meta charset="utf-8" />
</head>

<body>
    <div id="box-center">
        <h1> Editar Perfil </h1>
        <form class="center-margin">
            <label for="full_name">Nome Completo</label>
            <input type="text" name="full_name" id="full_name">
            
            <label for="birth_date">Data de Nascimento</label>
            <input type="date" name="birth_date" id="birth_date" readonly>
            
            <label for="cpf">CPF</label>
            <input type="text" name="cpf" id="cpf" readonly>
            
            <label for="phone_number">Telefone</label>
            <input type="text" name="phone_number" id="phone_number" >
            
            <label for="email">E-mail</label>
            <input type="text" name="email" id="email">
            
            <label for="username">Nome de Usuário</label>
            <input type="text" name="username" id="username" readonly>
            
            <label for="password">Senha</label>
            <input type="password" name="password" id="password">
            
            <div id="btn-holder">
                <input type="submit" value="Salvar" class="btn btn-primary">
                <a href="game.php" class="btn btn-primary">Voltar</a>
            </div>
        </form>
    </div>	

    <script src="../js/account.js"></script>
</body>

</html>