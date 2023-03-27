<?php

require __DIR__.'/main.php';

$return = call_query("CALL topClienti()");
echo json_encode($return);

?>