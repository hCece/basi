<?php
require __DIR__.'/main.php';
    $values = array("usernameCliente","nuovoUsername","password", "fotoDoc", 
                    "marca","modello","targa","posti","lusso","elettrico");
    $return = call_stored_procedure($values, "inserisciRichiestaLavoro",true);
    echo json_encode($return);
?>