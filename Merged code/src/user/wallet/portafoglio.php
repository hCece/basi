<?php
require_once dirname(dirname(__DIR__)) . '\shared\lib\security.php';
checkUser(UserType::Cliente);
?>
<!DOCTYPE html>
<html>
  <head>
    <title>Taxi Service</title>
  </head>


     <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
     <script src="../../shared/lib/PhpRequest.js"></script>
     <link rel="stylesheet" href="style.css">
  <body>
    <form>

      <label for="codice">Codice Portafoglio: </label>
      <label id="codiceValue"></label>
      <br><br>
      <label for="credito">Credito: </label>
      <label id="creditoValue"></label>
      <br><br>
      <hr>
      <h5>Per ricaricare il credito inserisci i
       dati richiesti e clicca su "ricarica portafoglio"</h5>

      <label for="ncarta">N. Carta:</label>
      <input type="text" id="ncarta" name="ncarta">
      <br><br>
      <label for="importo_euro">Importo in Euro:</label>
      <input type="number" id="importo_euro" name="importo_euro" value="0" step="1"
      oninput="calculate()">
      <br><br>
      <label for="importo_tcoin">Importo in Tcoin: </label>
      <span id="output"></span>
      <br><br>
      <button type="submit" style="background-color: #6a64f1;"
      onclick="handleRicarica();" return false;>Ricarica portafoglio</button>
       <span id="errorLabel" class="label danger" style="visibility  : hidden">
       inserisci il numero di carta e un importo valido!</span>
    </form>
  </body>
  <script src="script.js"></script>

</html>
