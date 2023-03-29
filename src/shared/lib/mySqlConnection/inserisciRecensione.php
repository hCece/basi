<?php
require __DIR__.'/main.php';
    $values = array("idc","voto","commento");
    $return = call_stored_procedure($values, "inserisciRecensione",false);


?>