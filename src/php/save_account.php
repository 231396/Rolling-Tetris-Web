<?php
require "../php/database.php";

$id = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_SPECIAL_CHARS);
$id_parsed = intval($id);
$fullName = filter_input(INPUT_POST, 'fullName', FILTER_SANITIZE_SPECIAL_CHARS);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_SPECIAL_CHARS);
$phoneNumber = filter_input(INPUT_POST, 'phoneNumber', FILTER_SANITIZE_SPECIAL_CHARS);
$username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_SPECIAL_CHARS);
$pass = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_SPECIAL_CHARS);

session_start();

try {
  $conn = $_Database->new_PDO();
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $sql_query = "UPDATE player SET nome=" . sql_string($fullName) . ",telefone=" . floatval($phoneNumber) . ",email=".sql_string($email).",password=".sql_string($pass)." where id = ${id_parsed}";

  $query = $conn->query($sql_query);

  if ($query) {
    $_SESSION['password'] = $pass;
    echo "true";
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