<?php
require __DIR__.'/main.php';

$query = 'SELECT usernameCliente, nuovoUsername, targa FROM RichiestaLavoro';
$rtrn = call_query($query);
echo json_encode($rtrn);





?>