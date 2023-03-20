<!DOCTYPE html>
<html>

  <?php

    //TODO: somehow check if the cookies set are actually valid credentials

  ?>
  <head>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
      <script src="../lib/PhpRequest.js"></script>
      <script src="script.js"></script>
      <link rel="stylesheet" href="style.css">

    <title>Taxi Service</title>
  </head>
  <body>
    <h1>Benvenuto in Taxi Service</h1>
    <h2>seleziona un opzione</h2>

    <button id="Portafoglio" onclick="
    window.location.href = 'http://localhost:4000/TAXI/src/dashboard/portafoglio.php';
    return false;">
    Portafoglio</button>

    <button id="prenota-corsa">Prenota una corsa</button>
    <button id="storico-corse">Storico corse</button>
    <button id="storico-recensioni">Storico recensioni</button>
    <button id="graduatoria">Graduatoria</button>
  </body>


  <?php
      echo("username: " . $_COOKIE["user"]);

  ?>
</html>






