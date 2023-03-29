<?php
//checks if user is of type Cliente
require_once dirname(dirname(__DIR__)) . '\shared\lib\security.php';
checkUser(UserType::Cliente);

?>
<!DOCTYPE html>
<html>
<head>
	<title>Graduatoria Clienti</title>
  		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
        <script src="../../shared/lib/PhpRequest.js"></script>
        <script src="../../shared/lib/UpdateTable.js"></script>
        <script src="script.js"></script>
	     <link rel="stylesheet" href="style.css">
</head>
<body>
	<h1>TOP 10 CLIENTI!!!</h1>
	<h5>I primi 5 clieni in graduatoria hanno uno sconto del 20% sulle prossime corse</h5>
	<table>
		<thead>
			<tr>
				<th>Username</th>
				<th>Numero corse</th>
			</tr>
		</thead>
		<tbody id="table-body">
		</tbody>
	</table>
  </body>
</html>