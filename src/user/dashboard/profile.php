<?php
require_once dirname(dirname(__DIR__)) . '\shared\lib\security.php';
checkUser(UserType::Cliente);
?>
<!DOCTYPE html>
<html>  
<head>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
      <script src="../../shared/lib/PhpRequest.js"></script>
      <script src="script.js"></script>
      <link rel="stylesheet" href="style.css">

    <title>Taxi Service</title>
  </head>
  <body>
    <h1>Benvenuto in Taxi Service</h1>
    <h2>seleziona un opzione</h2>

    <button id="Portafoglio" onclick="
    window.location.href = './portafoglio.php';
    return false;">
    Portafoglio</button>

    <button id="prenota-corsa" 
            onclick="window.location.href = '../bookRide/index.php'";>Prenota una corsa</button>
    <button id="storico-corse">Storico corse</button>
    <button id="storico-recensioni">Storico recensioni</button>
    <button onclick="window.location.href = '../beTaxiDriver/index.php'">Diventa Tassista </button>
    <button id="graduatoria">Graduatoria</button>
  </body>


  <?php
      echo("username: " . $_COOKIE["user"]);

  ?>
</html>






