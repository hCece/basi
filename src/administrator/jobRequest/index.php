<?php
require_once dirname(dirname(__DIR__)) . '\lib\security.php';
checkUser(UserType::Amministratore);
?>

<!DOCTYPE html>
<html>

<head>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
  <script src="../../lib/PhpRequest.js"></script>
  <script src="../../lib/UpdateTable.js"></script>
  <script src="script.js"></script>
  <link rel="stylesheet" href="style.css">

  <title>Corse Disponibili</title>
  <table id="table" class="styled-table">
    <thead>
      <tr>
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