<?php

require __DIR__.'/main.php';
//echo ($_POST['user']);
$return = call_query("CALL storicoCorse('".$_POST['user']."')");
echo json_encode($return);

?>