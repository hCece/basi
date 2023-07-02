
<?php
require __DIR__.'/main.php';

require dirname(__DIR__).'/mongo.php';

//Checks if a function exists and calls it
if(function_exists($_GET['function'])) {
    $_GET['function']();
 }

// This file at first might seem like a lot of headache code, but it's just a class that calls a query or a strored procedure, 
//and makes sure that the data sent is actually in the right order, for error avoidance. 

function storicoRecensioni()
{   $return = call_query("CALL storicoRecensioni()");
    echo json_encode($return);
}

function storicoRicariche()
{
     $return = call_query("CALL storicoRicariche()");
     echo json_encode($return);
}

function storicoBonifici()
{
    $return = call_query("CALL storicoBonifici()");
    echo json_encode($return);
}

function storicoRichiami()
{   $return = call_query("CALL storicoRichiami()");
    echo json_encode($return);
}

function recensioniPeggiori()
{   $return = call_query("CALL recensioniPeggiori()");
    echo json_encode($return);
}

function recensioniMigliori()
{   $return = call_query("CALL recensioniMigliori()");
    echo json_encode($return);
}

function inserisciRichiamo()
{   $values = array("admin","user","commento");
    $return = call_stored_procedure($values, "inserisciRichiamo",false);
    insert_log($_COOKIE['user'], "made a new recall to the taxi drive".$_POST['user']);
}

function richiamiTassista()
{   $return = call_query("CALL richiamiTassista('".$_COOKIE['user']."')");
    echo json_encode($return);
}

function richiamiTassistaPost()
{   $return = call_query("CALL richiamiTassista('".$_POST['user']."')");
    echo json_encode($return);
}

function ricaricaPortafoglio()
{   $values = array("codp", "amount", "card");
    call_stored_procedure($values, "ricaricaPortafoglio", false); 
    insert_log($_COOKIE['user'], "Recharged his wallet by ".$_POST['amount']. " EURO");

}
function storicoCorse()
{   
    $return = call_query("CALL storicoCorse('".$_COOKIE['user']."')");
    echo json_encode($return);
}
function inserisciBonifico()
{    $values = array("codp", "tcoin" , "iban");
    call_stored_procedure($values, "inserisciBonifico", false);
    insert_log($_COOKIE['user'], "Took ".$_POST['amount']. " EURO out of his wallet");
}
function inserisciRecensione()
{   $values = array("idc","voto","commento");
    call_stored_procedure($values, "inserisciRecensione", false);
    insert_log($_COOKIE['user'], "Wrote a new review");
}
function visualizzaRecensione()
{   $values = array("idc");
    $return = call_stored_procedure($values, "visualizzaRecensione",'s');
    print_r($return);
}
function topClienti()
{   $return = call_query("CALL topClienti()");
    echo json_encode($return);
}
function creditoPortafoglio()
{   $values = array("user");
    $return = call_stored_procedure($values, "creditoPortafoglio",'s');
    print_r($return);
}
function codicePortafoglio()
{   $values = array("user");
    $return = call_stored_procedure($values, "codicePortafoglio",'i');
    print_r($return);
}
function aggiungiCliente()
{   $values = array("tel", "user", "firstName", "lastName", "birthday", "city");
    call_stored_procedure($values, "aggiungiCliente", false);
    insert_log($_POST['user'], "A new user has been created");
    print_r("aggiunto cliente");
}
function aggiungiCredenziali()
{   $values = array("user", "pass");
    call_stored_procedure($values, "aggiungiCredenziali", false);
    print_r("aggiunte credenziali");
}
function checkTel()
{   $values = array("tel");
    $return = call_stored_procedure($values, "checkTel",'s');
    print_r($return);
}
function getTel()
{   $values = array("user");
    $return = call_stored_procedure($values, "getTel",'s');
    print_r($return);
}
function checkUsername()
{   $values = array("user");
    echo call_stored_procedure($values, "checkUsername",'s');
}
function inserisciPrenotazione()
{   $values = array("pro","partenza","arrivo", "nrPosti" , 
    "usernameCliente","lus","ele","costo");
    echo call_stored_procedure($values, "inserisciPrenotazione",'s');
    insert_log($_COOKIE['user'], "Made a new reservation from ".$_POST['partenza']." to" .$_POST['arrivo']);
}
function statoRichiesta(){   
    if (isset($_COOKIE["user"])){
        $_POST['user'] = $_COOKIE["user"];
        $values = array("user");
        echo call_stored_procedure($values, "statoRichiesta",true);
    }
}
function inserisciRichiestaLavoro()
{    $values = array("usernameCliente","nuovoUsername","password", 
    "marca","modello","targa","posti","lusso","elettrico");
    $return = call_stored_procedure($values, "inserisciRichiestaLavoro",true);
    insert_log($_COOKIE['user'], "Made a new request to become a taxi driver");
    echo json_encode($return);
}
function getRichiestaLavoro()
{   $query = 'SELECT IDRICHIESTA, usernameCliente, nuovoUsername, targa  FROM RichiestaLavoro where stato = "APERTO"';
    $rtrn = call_query($query);
    echo json_encode($rtrn);
}
function rifiutaRichiesta()
{   $values = array("idr");
    call_stored_procedure($values, "rifiutaRichiesta",false);
    insert_log($_COOKIE['user'], "rejected a request to become a taxi driver");
}

function approvaRichiesta()
{   $values = array("idr");
    call_stored_procedure($values, "approvaRichiesta",false);
    insert_log($_COOKIE['user'], "approved a request to become a taxi driver");
}
function riconosciUtente()
{   $values = array("user","pass");
    $rtrn = call_stored_procedure($values, "riconosciUtente",'s');
    if(trim($rtrn) != "unregistered")
        insert_log($_POST['user'], "Logged in successfully as ".$rtrn);
    else
        insert_log($_POST['user'], "Logged in unsuccessfully");
    echo $rtrn;
}

function aggiungiCorsa()
{   $values = array("partenza", "arrivo", "usernameCliente", "usernameTassista","importo");
    echo call_stored_procedure($values, "inserisciCorsa",'s');
    insert_log($_POST['user'], "approved a reservation from".$_POST['usernameCliente']." to become a taxi driver");

}
    
function prenotazioneCompletata()
{   $values = array("user");
    echo call_stored_procedure($values, "verificaStatoPrenotazione",'s');    
}
function eliminaPrenotazione()
{   $values = array("user");
    echo call_stored_procedure($values, "eliminaPrenotazione");
    insert_log($_COOKIE['user'], "Deleted his request to make a ride");

}
function corseDisponibili()
{   if (isset($_COOKIE["user"])){
        $query="CALL corseDisponibili('".$_COOKIE["user"]."')";
        $rtrn = call_query($query);
        echo json_encode($rtrn);
    }
}
function countCorseDisponibili()
{   if (isset($_COOKIE["user"])){
        $_POST['user'] = $_COOKIE["user"];
        $values = array("user");
        echo call_stored_procedure($values, "countCorseDisponibili", 'i');
    }
}

?>