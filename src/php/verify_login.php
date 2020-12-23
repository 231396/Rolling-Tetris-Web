<?php
unset($_COOKIE);
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS);
$pass = filter_input(INPUT_POST, 'pass', FILTER_SANITIZE_SPECIAL_CHARS);


try {
  $conn = $_Database->new_PDO();
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $query = $conn->query("SELECT username, password, id FROM player where
  username = " . sql_string($_COOKIE['username']) . 'and password =  ' . sql_string($_COOKIE['password']));

  $credenciais = $query->fetch();

  if ($credenciais['name'] == $name && $credenciais['password'] = $pass) {
    $_SESSION['id'] = $credenciais['id'];
    $_SESSION['username'] = $credenciais['username'];
    $_SESSION['password'] = $credenciais['password'];
    header("Location: game.php");
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
?>