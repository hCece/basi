<?php
require __DIR__.'/main.php';
    $values = array("user");
    $return = call_stored_procedure($values, "checkUsername",'s');
    print_r($return);

?>