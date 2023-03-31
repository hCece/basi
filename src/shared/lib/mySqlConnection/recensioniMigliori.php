<?php

require __DIR__.'/main.php';

$return = call_query("CALL recensioniMigliori()");
echo json_encode($return);

?>