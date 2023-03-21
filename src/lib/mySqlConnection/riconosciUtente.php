<?php

require __DIR__.'/main.php';
    $values = array("user");
    $return = call_stored_procedure($values, "riconosciUtente",'s');
    print_r($return);

?>