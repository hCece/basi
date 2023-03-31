<?php
require __DIR__.'/main.php';
    $values = array("admin","user","commento");
    $return = call_stored_procedure($values, "inserisciRichiamo",false);


?>