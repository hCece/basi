<?php
  require dirname(dirname(__DIR__)) .'\lib\mySqlConnection\validCredential.php';
  
  ob_start();
  session_start();
  //TODO: somehow check if the cookies set are actually valid credentials
  if(!isset($_COOKIE["user"]) || !isset($_COOKIE["pass"]))
    header('Location: ../../errorPage/index.php');
  
  isValidCredential($_COOKIE["user"],$_COOKIE["pass"],"tassista");

?>
<!DOCTYPE html>
<html>  
<head>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
      <script src="../lib/PhpRequest.js"></script>
      <script src="script.js"></script>
  <link rel="stylesheet" type="text/css" href="style.css">

    <title>Taxi Service</title>
  </head>
  <body>
    <h1>Benvenuto Tassista</h1>
    <h2>seleziona un opzione</h2>

    <button id="Portafoglio" onclick="
    //window.location.href = 'http://localhost:4000/TAXI/src/dashboard/portafoglio.php';
    return false;">
    Portafoglio</button>

    <button id="prenota-corsa" onclick="window.location.href = '../ride/index.php'" >Visualizza Corse disponibili</button>
    <button id="storico-corse">Visualizza storico corse</button>
  </body>


  <?php
      echo("username: " . $_COOKIE["user"]);

  ?>
</html>

