<?php
//checks if user is of type Tassista
require_once dirname(dirname(__DIR__)) . '\shared\lib\security.php';
checkUser(UserType::Tassista);
?>
<!DOCTYPE html>
<html>

<head>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
  <script src="../../shared/lib/PhpRequest.js"></script>
  <script src="../../shared/lib/Update.js"></script>
  <script src="script.js"></script>
  <link rel="stylesheet" type="text/css" href="style.css">

  <title>Taxi Service</title>
</head>

<body>

  <h1>Benvenuto Tassista</h1>
  <div id="image-container"><img src="./driverIMG.png" alt="Image description"></div>
  <h2>seleziona un opzione</h2>

  <div class="button-container">
    <div>
      <button id="logout-btn" onclick="handleLogoutButton();return false">Log Out</button>
    </div>
  </div>
  
  <button id="Portafoglio" onclick="
    window.location.href = '../wallet/index.php';return false;">
    Portafoglio</button>

  <button id="prenota-corsa" onclick="
    window.location.href = '../ride/index.php'">
    <span class="notification-badge" id="span-prenota-corsa">0</span>
    Visualizza Corse disponibili</button>

  <button id="storico-corse" onclick="
    window.location.href = '../pastRides/index.php';return false;">
    Visualizza storico corse</button>

  <button id="storico-richiami" onclick="
    window.location.href = '../recalls/index.php';return false;">
    Visualizza richiami</button>
</body>



</html>