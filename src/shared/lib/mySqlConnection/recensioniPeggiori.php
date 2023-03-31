<?php

require __DIR__.'/main.php';

$return = call_query("CALL recensioniPeggiori()");
echo json_encode($return);

?>