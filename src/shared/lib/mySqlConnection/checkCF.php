<?php

require __DIR__.'/main.php';
    $values = array("cf");
    $return = call_stored_procedure($values, "checkCF",'s');
    print_r($return);

?>