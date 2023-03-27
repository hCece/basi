<?php
require_once dirname(dirname(__DIR__)) . '\shared\lib\security.php';
checkUser(UserType::Tassista);

    try {
       $pdo=new PDO("mysql:host=localhost; dbname=taxiserver",
       "root", "pass0");
       $pdo->setAttribute(PDO::ATTR_ERRMODE,
       PDO::ERRMODE_EXCEPTION);
       $pdo->exec('SET NAMES "utf8"');
    }catch(exception $e){
        $error_log = "Connessione non riuscita";
        error_log($error_log);
        exit();
    }

    $username = $_COOKIE['user'];

    try{
       $sql = "CALL storicoCorse('$username')";
       $stmt = $pdo->query($sql);
       $result = $stmt->fetchAll();
    }catch (Exception $e) {
         error_log('Codice errore' . $e->getMessage());
     }

?>

<!DOCTYPE html>
<html>
<head>
	<title>Storico corse</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="../../shared/lib/PhpRequest.js"></script>

	<link rel="stylesheet" href="style.css">
</head>
<body>
	<h2>Lista delle corse eseguite da <?php  echo $username ?> </h2>
	<table>
		<thead>
			<tr>
				<th>IDC</th>
				<th>Pro</th>
				<th>Partenza</th>
                <th>Arrivo</th>
                <th>data</th>
                <th>Cliente</th>
                <th>Tassista</th>
                <th>Importo</th>

			</tr>
		</thead>

		<tbody id="table-body">
			<?php foreach ($result as $row) { ?>
                <tr>
                  <td><?php echo $row['IDC']; ?></td>
                  <td><?php if ($row['pro'] == 1) { echo '<img class="icon" src="checkLabel.png">'; } else { echo '<img class="icon" src="Xlabel.png">'; } ?></td>
                  <td><?php echo $row['partenza']; ?></td>
                  <td><?php echo $row['arrivo']; ?></td>
                  <td><?php echo $row['data']; ?></td>
                  <td><?php echo $row['usernameCliente']; ?></td>
                  <td><?php echo $row['usernameTassista']; ?></td>
                  <td><?php echo $row['importo']; ?></td>
                  <td><button onclick="openPopup(<?php echo $row['IDC']; ?>)">visualizza commento</button></td>
                </tr>
            <?php } ?>
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