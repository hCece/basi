<?php
require __DIR__.'/main.php';
    $values = array("pro","partenza","arrivo", "nrPosti" , 
                    "usernameCliente","lus","ele");
    $return = call_stored_procedure($values, "inserisciPrenotazione",false);
    print_r($_POST["partenza"]);

?>