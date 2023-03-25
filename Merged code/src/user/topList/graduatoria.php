<?php
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



    try{
       $sql = "CALL topClienti()";
           $stmt = $pdo->query($sql);
           $result = $stmt->fetchAll();
    }catch (Exception $e) {
         error_log('Codice errore' . $e->getMessage());
         exit();
     }
?>
<!DOCTYPE html>
<html>
<head>
	<title>Graduatoria Clienti</title>
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
			<?php foreach ($result as $row) { ?>
                <tr>
                  <td><?php echo $row['usernameCliente']; ?></td>
                  <td><?php echo $row['cnt']; ?></td>
                </tr>
            <?php } ?>
		</tbody>
	</table>
  </body>
</html>