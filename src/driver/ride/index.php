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
  <link rel="stylesheet" href="style.css">

  <title>Corse Disponibili</title>
  <table id="table" class="styled-table">
    <thead>
      <tr>
        <th>partenza</th>
        <th>arrivo</th>
        <th>posti</th>
        <th>data</th>
        <th>usernameCliente</th>
        <th>costo</th>
      </tr>
    </thead>
    <tbody id="tableBody">
    </tbody>
  </table>
  <input class="formbold-btn" type="button" onclick="handleButton(); return false;"        value="Accetta corsa"> <br>

</html>