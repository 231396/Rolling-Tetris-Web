<?php
	require "../php/database.php";

	$id = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_SPECIAL_CHARS);

	session_start();

	try {
	$conn = $_Database->new_PDO();
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	$sql_query = "SELECT id, nome, dtNascimento, cpf, telefone, email, username, password FROM player where id = " . strval($id);
	$query = $conn->query($sql_query);

	$account = $query->fetch(PDO::FETCH_ASSOC);
	//echo($sql_query);
	//print_r($account);

	echo json_encode($account);

	} catch (PDOException $e) {
		echo "Connection failed: " . $e->getMessage();
	} catch (Exception $e) {
		echo "Error: " . $e->getMessage();
	}
?>