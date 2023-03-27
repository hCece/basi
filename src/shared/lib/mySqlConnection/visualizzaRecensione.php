<?php

require __DIR__.'/main.php';
    $values = array("idc");
    $return = call_stored_procedure($values, "visualizzaRecensione",'s');
    print_r($return);

?>

