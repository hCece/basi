<?php
//checks if user is of type Tassista
require_once dirname(dirname(__DIR__)) . '\shared\lib\security.php';
checkUser(UserType::Tassista);
?>

<!DOCTYPE html>
<html>
<head>
	<title>Storico corse</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="../../shared/lib/PhpRequest.js"></script>
    <script src="../../shared/lib/Update.js"></script>

	<link rel="stylesheet" href="style.css">
</head>
<body>
	<h2 id="title"> </h2>
	<table>
		<thead>
			<tr>
				<th>ICD</th>
				<th>Partenza</th>
                <th>Arrivo</th>
                <th>data</th>
                <th>Cliente</th>
                <th>Tassista</th>
                <th>Importo</th>
                <th>Tel</th>
                <th></th>


			</tr>
		</thead>

		<tbody id="table-body">

		</tbody>

	</table>
	<div id="popup" class="popup">
        <div class="popup-content">
            <span class="close-btn" onclick="closePopup()">&times;</span>
            <p>Voto: <span id="Votovalue"></span></p>
            <p>Commento: <span id="Commentovalue"></span></p>
        </div>
    </div>
  </body>
      <script src="script.js"></script>

</html>