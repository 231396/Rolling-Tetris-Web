<?php
require "../php/database.php";

$fullName = filter_input(INPUT_POST, 'fullName', FILTER_SANITIZE_SPECIAL_CHARS);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_SPECIAL_CHARS);
$phoneNumber = filter_input(INPUT_POST, 'phoneNumber', FILTER_SANITIZE_SPECIAL_CHARS);
$username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_SPECIAL_CHARS);
$pass = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_SPECIAL_CHARS);

session_start();

try {
  $conn = $_Database->new_PDO();
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $query = $conn->query("SELECT id FROM player where username = " . sql_string($username) . 'and password =  ' . sql_string($pass));

  $id = $query->fetch(PDO::FETCH_ASSOC);

  //$conn->query("UPDATE player SET nome = " . sql_string())

  return $account;

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