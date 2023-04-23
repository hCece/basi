<?php //checks if user is of type Cliente
require_once dirname(dirname(__DIR__)) . '\shared\lib\security.php';
checkUser(UserType::Cliente);
?>
<!DOCTYPE html>
<html>  
<head>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
      <script src="../../shared/lib/PhpRequest.js"></script>
      <script src="../../shared/lib/Update.js"></script>
      <script src="script.js"></script>
      <link rel="stylesheet" href="style.css">

    <title>Taxi Service</title>
  </head>
  <body>
    <h1>Benvenuto in Taxi Service</h1>
    <h2>seleziona un opzione</h2>

    <div id="image-container">
      <img src="./taxiIMG.png" alt="Image description">
    </div>
    
    <div>
    <button id="Portafoglio" onclick="
    window.location.href = '../wallet/portafoglio.php'">
    Portafoglio</button>
    </div>


    <div>
    <button id="prenota-corsa"
    onclick="window.location.href = '../bookRide/index.php'";>
    <span class="notification-badge" id="span-prenota-corsa" style="visibility:hidden" >1</span>
    Prenota una corsa</button>
    </div>

    <div>
    <button id="storico-corse" onclick="
    window.location.href = '../pastRides/index.php'">
    Storico corse</button>
    </div>

    <div>
    <button id="diventa_driver" onclick="
    window.location.href = '../beTaxiDriver/index.php'">
    Diventa Tassista </button>
    </div>

    <div>
    <button id="graduatoria" onclick="
    window.location.href = '../topList/index.php'">
    Graduatoria</button>
    </div>


  </body>
</html>