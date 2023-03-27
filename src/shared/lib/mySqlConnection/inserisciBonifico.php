<?php

require __DIR__.'/main.php';

    $values = array("codp", "tcoin" , "iban");
    call_stored_procedure($values, "inserisciBonifico", false);

?>