<?php
//checks if user is of type Tassista
require_once dirname(dirname(__DIR__)) . '\shared\lib\security.php';
checkUser(UserType::Tassista);
?>
<!DOCTYPE html>
<html>  
<head>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
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

