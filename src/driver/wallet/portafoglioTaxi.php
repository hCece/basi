<?php
require_once dirname(dirname(__DIR__)) . '\shared\lib\security.php';
checkUser(UserType::Tassista);
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
      <h5>Per eseguire un bonifico inserisci i
       dati richiesti e clicca su "esegui bonifico"</h5>

      <label for="iban">IBAN:</label>
      <input type="text" id="iban" name="iban">
      <br><br>
      <label for="importo_tcoin">Importo in T-coin:</label>
      <input type="number" id="importo_tcoin" name="importo_tcoin" value="0" step="1"
      oninput="calculate()">
      <br><br>
      <label for="importo_euro">Importo in Euro: </label>
      <span id="output"></span>
      <br><br>
      <button type="submit" style="background-color: #6a64f1;"
      onclick="handleBonifico();" return false;>Esegui Bonifico</button>

    </form>
  </body>
  <script src="script.js"></script>

</html>
