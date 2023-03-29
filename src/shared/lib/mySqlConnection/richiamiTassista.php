<?php

require __DIR__.'/main.php';

$return = call_query("CALL richiamiTassista('".$_POST['user']."')");
echo json_encode($return);

?>