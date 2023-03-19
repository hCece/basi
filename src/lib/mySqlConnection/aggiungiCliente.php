<?php

require __DIR__.'/main.php';

    $values = array("cf", "user", "firstName", "lastName", "birthday", "city");
    call_stored_procedure($values, "aggiungiCliente", false);
    print_r("aggiunto cliente");

?>