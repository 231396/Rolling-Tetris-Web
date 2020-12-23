<?php
require "../php/database.php";

$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS);
$pass = filter_input(INPUT_POST, 'pass', FILTER_SANITIZE_SPECIAL_CHARS);


try {
  $conn = $_Database->new_PDO();
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $query = $conn->query("SELECT username, password, id FROM player where
  username = " . sql_string($_COOKIE['username']) . 'and password =  ' . sql_string($_COOKIE['password']));

  $credenciais = $query->fetch();
  echo isset($credenciais);
  if (isset($credenciais)) {

    setcookie("id", $credenciais['id']);
    setcookie("username", $credenciais['username']);
    setcookie("password", $credenciais['password']);

    $_SESSION['id'] = $credenciais['id'];
    $_SESSION['username'] = $credenciais['username'];
    $_SESSION['password'] = $credenciais['password'];

    echo '======== passei akii ======================';
    header("Location: ../php_pages/game.php");
  } else {
    echo false;
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