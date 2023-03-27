<?php //checks if user is of type Cliente
require_once dirname(dirname(__DIR__)) . '\shared\lib\security.php';
checkUser(UserType::Cliente);
?>
<!DOCTYPE html>
<html>  
<head>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
      <script src="../../shared/lib/PhpRequest.js"></script>
      <link rel="stylesheet" href="style.css">

    <title>Taxi Service</title>
  </head>
  <body>
    <h1>Benvenuto in Taxi Service</h1>
    <h2>seleziona un opzione</h2>

    <div id="image-container">
      <img src="./taxiIMG.png" alt="Image description">
    </div>

    <button id="Portafoglio" onclick="
    window.location.href = '../wallet/portafoglio.php';return false;">
    Portafoglio</button>

    <button id="prenota-corsa"
    onclick="window.location.href = '../bookRide/index.php'";>
    Prenota una corsa</button>

    <button id="storico-corse" onclick="
    window.location.href = '../pastRides/storicoCorse.php';return false;">
    Storico corse</button>

    <button id="storico-recensioni" onclick="
    window.location.href = '../pastRides/storicoCorse.php';return false;">
    Storico recensioni</button>

    <button id="diventa_driver" onclick="
    window.location.href = '../beTaxiDriver/index.php';return false;">
    Diventa Tassista </button>

    <button id="graduatoria" onclick="
    window.location.href = '../topList/graduatoria.php'; return false;">
    Graduatoria</button>


  </body>
</html>