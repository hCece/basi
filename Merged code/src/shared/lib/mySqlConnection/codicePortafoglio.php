<?php

require __DIR__.'/main.php';
    $values = array("user");
    $return = call_stored_procedure($values, "codicePortafoglio",'s');
    print_r($return);

?>