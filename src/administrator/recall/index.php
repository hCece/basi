<?php
//checks if user is of type Amministratore
require_once dirname(dirname(__DIR__)) . '\shared\lib\security.php';
checkUser(UserType::Amministratore);
?>
<!DOCTYPE html>
<html>
<head>
	<title>Storico richiami</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="../../shared/lib/PhpRequest.js"></script>
    <script src="../../shared/lib/Update.js"></script>


	<link rel="stylesheet" href="style.css">
</head>
<body>
	<h2>Storico richiami</h2><br><br>


	<table>
		<thead>
			<tr>
				<th>Tassista</th>
				<th>N. Richiami</th>
				<th>Media Voti</th>
				<th>N. Corse</th>
				<th></th>
				<th></th>
			</tr>
		</thead>

		<tbody id="table-body"></tbody>

	</table>

  </body>

  <div id="popup1" class="popup">
    <div class="popup-content">
        <span class="close-btn" onclick="closePopup1()">&times;</span>
        <table id="tab">
        	<thead>
        		<tr>
        			<th>IDR</th>
                    <th>Amministratore</th>
                    <th>Tassista</th>
                    <th>Commento</th>
                    <th>Data</th>

        		</tr>
        	</thead>

        	<tbody id="pop1Table"></tbody>
        </table>
    </div>
  </div>

  <div id="popup2" class="popup">
     <div class="popup-content">
        <span class="close-btn" onclick="closePopup2()">&times;</span>
        <p>Inserisci la descrizione</p>
     <div>
        <label for="descInput" >Descrizione:</label><br>
        <textarea id="descInput" maxlength="200" rows="8" cols="50"></textarea><br><br>
     </div>
     <div>
        <button class="submit" id="submit" >Invia Richiamo</button>
      </div>

      <script src="script.js"></script>

</html>