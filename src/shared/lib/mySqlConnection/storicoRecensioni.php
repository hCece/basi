<?php

require __DIR__.'/main.php';

$return = call_query("CALL storicoRecensioni()");
echo json_encode($return);

?>