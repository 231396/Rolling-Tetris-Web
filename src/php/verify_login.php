<?php
	require "../php/database.php";

	$username = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS);
	$pass = filter_input(INPUT_POST, 'pass', FILTER_SANITIZE_SPECIAL_CHARS);

	session_start();

	try {
		$conn = $_Database->new_PDO();
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$query = $conn->query("SELECT username, password, id FROM player where username = '$username' 'and password = '$pass'");

		$credenciais = $query->fetch(PDO::FETCH_ASSOC);

		if (isset($credenciais['id'], $credenciais['username'],  $credenciais['password'])) {
			$time = time() + 3600 * 8;
			setcookie("id", $credenciais['id'], $time, "/");
			setcookie("username", $credenciais['username'], $time, "/");
			setcookie("password", $credenciais['password'], $time, "/");
			$_SESSION['id'] = $credenciais['id'];
			$_SESSION['username'] = $credenciais['username'];
			$_SESSION['password'] = $credenciais['password'];
		} else {
			echo "false";
		}

	} catch (PDOException $e) {
		echo "Connection failed: " . $e->getMessage();
	} catch (Exception $e) {
		echo "Error: " . $e->getMessage();
	}
?>