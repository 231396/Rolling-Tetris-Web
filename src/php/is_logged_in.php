<?php
	require "../php/database.php";
	
    session_start();
	$isLogged = isset($_SESSION['id'], $_SESSION['username'], $_SESSION['password']);

	if ($isLogged){
		$isLogged = false;
		try {
			$conn = $_Database->new_PDO();
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$query = $conn->query("SELECT username, password, id FROM player where username = " . 
			sql_string($_SESSION['username']) . "and password = " . sql_string($_SESSION['password']));
			$credenciais = $query->fetch(PDO::FETCH_ASSOC);
			if (isset($credenciais)) {
				$_SESSION['id'] = $credenciais['id'];
				$_SESSION['username'] = $credenciais['username'];
				$_SESSION['password'] = $credenciais['password'];
				$isLogged = true;
			}
		} catch(Exception $e) {
			echo "Error: " . $e->getMessage();
		}
	}
		
    if (!$isLogged)
		header('Location: ../php_pages/login.php');
		
	function sql_string($str)
	{
		return "'" . $str . "'";
	}
?>