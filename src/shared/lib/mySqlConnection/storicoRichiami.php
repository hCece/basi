<?php

require __DIR__.'/main.php';

$return = call_query("CALL storicoRichiami()");
echo json_encode($return);

?>