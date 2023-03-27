<?php

require __DIR__.'/main.php';

$values = array("codp", "amount", "card");
call_stored_procedure($values, "ricaricaPortafoglio", false);

?>