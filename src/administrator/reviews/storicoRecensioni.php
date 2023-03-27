<?php
require_once dirname(dirname(__DIR__)) . '\shared\lib\security.php';
checkUser(UserType::Amministratore);

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
       $sql = "CALL storicoRecensioni()";
       $stmt = $pdo->query($sql);
       $result = $stmt->fetchAll();
    }catch (Exception $e) {
         error_log('Codice errore' . $e->getMessage());
     }

?>

<!DOCTYPE html>
<html>
<head>
	<title>Storico recensioni</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="../../shared/lib/PhpRequest.js"></script>

	<link rel="stylesheet" href="style.css">
</head>
<body>
	<h2>Lista di tutte le recensioni </h2>
	<table>
		<thead>
			<tr>
				<th>IDC</th>
				<th>Voto</th>
				<th>Commento</th>
			</tr>
		</thead>

		<tbody id="table-body">
			<?php foreach ($result as $row) { ?>
                <tr>
                  <td><?php echo $row['IDC']; ?></td>
                  <td><?php echo $row['voto']; ?></td>
                  <td><?php echo $row['commento']; ?></td>
                </tr>
            <?php } ?>
		</tbody>

	</table>

  </body>
      <script src="script.js"></script>

</html>