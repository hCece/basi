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
       $sql = "CALL richiamiTassista('$username')";
       $stmt = $pdo->query($sql);
       $result = $stmt->fetchAll();
    }catch (Exception $e) {
         error_log('Codice errore' . $e->getMessage());
     }

     if (empty($result)) {
             $error_msg = "Non esistono richiami per l'utente $username";
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
    <?php if (isset($error_msg)) { ?>
        <h2><?php echo $error_msg; ?></h2>
    <?php }
    else { ?>

	<h2>Lista dei richiami <?php echo $username ?> </h2>
	<table>
		<thead>
			<tr>
				<th>IDR</th>
				<th>Amministratore</th>
				<th>Tassista</th>
                <th>Commento</th>
                <th>Data</th>
			</tr>
		</thead>

		<tbody id="table-body">
			<?php foreach ($result as $row) { ?>
                <tr>
                  <td><?php echo $row['IDRICHIAMO']; ?></td>
                  <td><?php  echo $row['usernameAmministratore']; ?></td>
                  <td><?php echo $row['usernameTassista']; ?></td>
                  <td><?php echo $row['commento']; ?></td>
                  <td><?php echo $row['data']; ?></td>
                </tr>
            <?php } ?>
		</tbody>

	</table>
    <?php } ?>
</body>
      <script src="script.js"></script>

</html>