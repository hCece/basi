<?php
//checks if user is of type Amministratore
require_once dirname(dirname(__DIR__)) . '\shared\lib\security.php';
checkUser(UserType::Amministratore);
?>
<!DOCTYPE html>
<html>  
<head>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
      <script src="script.js"></script>
  <link rel="stylesheet" type="text/css" href="style.css">

    <title>Administrator dashboard</title>
  </head>
  <body>
    <h1>Benvenuto amministratore</h1>
    <h2>seleziona un opzione</h2>


    <button onclick="window.location.href = '../jobRequest/index.php'" >Visualizza Richieste Lavoro</button>
     <button id="storico-recensioni" onclick="
     window.location.href = '../reviews/index.php';return false;">
    Visualizza recensioni</button>
  </body>


  <?php
      echo("username: " . $_COOKIE["user"]);

  ?>
</html>

