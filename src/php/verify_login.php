<?php
require "../php/database.php";

$username = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS);
$pass = filter_input(INPUT_POST, 'pass', FILTER_SANITIZE_SPECIAL_CHARS);

session_start();

try {
  $conn = $_Database->new_PDO();
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $query = $conn->query("SELECT username, password, id FROM player where username = " . sql_string($username) . 'and password =  ' . sql_string($pass));

  $credenciais = $query->fetch(PDO::FETCH_ASSOC);

  if (isset($credenciais['id'])) {
    setcookie("id", $credenciais['id']);
    setcookie("username", $credenciais['username']);
    setcookie("password", $credenciais['password']);
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

function sql_string($str)
{
  return "'" . $str . "'";
}

?>