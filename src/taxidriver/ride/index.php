<?php
  require dirname(dirname(__DIR__)) .'\lib\mySqlConnection\validCredential.php';
  
  ob_start();
  session_start();
  //TODO: somehow check if the cookies set are actually valid credentials
  if(!isset($_COOKIE["user"]) || !isset($_COOKIE["pass"]))
    header('Location: ../../errorPage/index.php');
  
  isValidCredential($_COOKIE["user"],$_COOKIE["pass"],"tassista");

  echo("username: " . $_COOKIE["user"]);
?>
<!DOCTYPE html>
<html>  
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="../lib/PhpRequest.js"></script>
    <script src="script.js"></script>
  <link rel="stylesheet" href="style.css">

    <title>Taxi Service</title>
    <table class="styled-table">
    <thead>
        <tr>
            <th>Name</th>
            <th>Points</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Dom</td>
            <td>6000</td>
        </tr>
        <tr class="active-row">
            <td>Melissa</td>
            <td>5150</td>
        </tr>
        <!-- and so on... -->
    </tbody>
</table>


</html>

