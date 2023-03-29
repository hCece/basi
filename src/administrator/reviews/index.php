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
	<h2>Lista commenti</h2>
	<table>
		<thead>
			<tr>
				<th>IDR</th>
				<th>Voto</th>
				<th>Commento</th>
			</tr>
		</thead>

		<tbody id="table-body">

		</tbody>

	</table>

  </body>
      <script src="script.js"></script>

</html>