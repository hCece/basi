<?php

require __DIR__.'/main.php';

    $values = array("user", "pass");
    call_stored_procedure($values, "aggiungiCredenziali", false);
    print_r("aggiunte credenziali");

?>