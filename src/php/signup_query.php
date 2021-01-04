<?php
	require "../php/database.php";		

	$nome = $_POST['name'];
	$datanascimento = $_POST['datebirth'];
	$cpf = $_POST['cpf'];
	$telefone = $_POST['phone']; 
	$email = $_POST['email'];
	$username =  $_POST['username'];
	$senha =  $_POST['password'];

	try {
	  $conn = $_Database->new_PDO();
	  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	  $sql_query = "INSERT INTO player VALUES (null, '$nome', '$datanascimento', '$cpf', '$telefone', '$email', '$username', '$senha')";

	  $query = $conn->query($sql_query);

	  if ($query) {	  	
		header('Location: ../php_pages/signup_success.php');
	  }

	} catch (PDOException $e) {
  		echo "Connection failed: " . $e->getMessage();
	} catch (Exception $e) {
		echo "Error: " . $e->getMessage();
	}
?>