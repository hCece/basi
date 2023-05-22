<?php
//checks if user is of type Amministratore
require_once dirname(dirname(__DIR__)) . '\shared\lib\security.php';
checkUser(UserType::Amministratore);
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
        
        <th>ID Richiesta</th>
        <th>username Cliente</th>
        <th>username Nuovo</th>
        <th>targa</th>
      </tr>
    </thead>
    <tbody id="tableBody">
    </tbody>
  </table>
  <input class="formbold-btn" type="button" onclick="handleApproved(); return false;" name="log" id="log"
        value="Accetta richiesta">
    <input class="formbold-btn" type="button" onclick="handleDecline(); return false;" name="log" id="log"
        value="Rifiuta richiesta">

</html>