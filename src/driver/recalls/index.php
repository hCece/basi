<?php
//checks if user is of type Tassista
require_once dirname(dirname(__DIR__)) . '\shared\lib\security.php';
checkUser(UserType::Tassista);
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
	<h2 id="title"></h2>
	<table id='table'>
		<thead>
			<tr>
				<th>IDR</th>
				<th>Amministratore</th>
				<th>Tassista</th>
				<th>Commento</th>
                <th>Data</th>
			</tr>
		</thead>

		<tbody id="table-body"></tbody>

	</table>
  </body>
      <script src="script.js"></script>

</html>