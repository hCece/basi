<?php
//checks if user is of type Amministratore
require_once dirname(dirname(__DIR__)) . '\shared\lib\security.php';
checkUser(UserType::Amministratore);
?>
<!DOCTYPE html>
<html>
<head>
	<title>Storico corse</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="../../shared/lib/PhpRequest.js"></script>
    <script src="../../shared/lib/UpdateTable.js"></script>


	<link rel="stylesheet" href="style.css">
</head>
<body>
	<h2>Lista commenti</h2><br><br>
	<label id="label">Filtra i commenti</label><br><br>
	<button id="worst" onclick="worstFilter()">Dal Peggiore</button><br><br>
    <button id="best" onclick="bestFilter()">Dal Migliore</button>

	<table>
		<thead>
			<tr>
				<th>ID corsa</th>
				<th>Voto</th>
				<th>Commento</th>
				<th>Tassista</th>
				<th>Data</th>
			</tr>
		</thead>

		<tbody id="table-body">

		</tbody>

	</table>

  </body>
      <script src="script.js"></script>

</html>