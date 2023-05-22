
<?php


require __DIR__.'/main.php';

if(function_exists($_GET['function'])) {
    $_GET['function']();
 }

function storicoRecensioni()
{   $return = call_query("CALL storicoRecensioni()");
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
}

function richiamiTassista()
{   $return = call_query("CALL richiamiTassista('".$_POST['user']."')");
    echo json_encode($return);
}


function ricaricaPortafoglio()
{   $values = array("codp", "amount", "card");
    call_stored_procedure($values, "ricaricaPortafoglio", false); 
}

function storicoRicariche()
{   $return = call_query("CALL storicoRicariche('".$_POST['code']."')");
    echo json_encode($return);
}

function storicoCorse()
{   
    $return = call_query("CALL storicoCorse('".$_POST['user']."')");
    echo json_encode($return);
}
function inserisciBonifico()
{    $values = array("codp", "tcoin" , "iban");
    call_stored_procedure($values, "inserisciBonifico", false);
}

function storicoBonifici()
{   $return = call_query("CALL storicoBonifici('".$_POST['codicePortafoglio']."')");
    echo json_encode($return);
}

function inserisciRecensione()
{   $values = array("idc","voto","commento");
    call_stored_procedure($values, "inserisciRecensione", false);

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
    $return = call_stored_procedure($values, "codicePortafoglio",'s');
    print_r($return);
}
function aggiungiCliente()
{   $values = array("cf", "user", "firstName", "lastName", "birthday", "city");
    call_stored_procedure($values, "aggiungiCliente", false);
    print_r("aggiunto cliente");
}
function aggiungiCredenziali()
{   $values = array("user", "pass");
    call_stored_procedure($values, "aggiungiCredenziali", false);
    print_r("aggiunte credenziali");
}
function checkCF()
{   $values = array("cf");
    $return = call_stored_procedure($values, "checkCF",'s');
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
}

function inserisciRichiestaLavoro()
{    $values = array("usernameCliente","nuovoUsername","password", "fotoDoc", 
    "marca","modello","targa","posti","lusso","elettrico");
    $return = call_stored_procedure($values, "inserisciRichiestaLavoro",true);
    echo json_encode($return);
}
function getRichiestaLavoro()
{   $query = 'SELECT IDRICHIESTA, usernameCliente, nuovoUsername, targa  FROM RichiestaLavoro';
    $rtrn = call_query($query);
    echo json_encode($rtrn);
}
function rifiutaRichiesta()
{   $values = array("idr");
    call_stored_procedure($values, "rifiutaRichiesta",false);
}

function approvaRichiesta()
{   $values = array("idr");
    call_stored_procedure($values, "approvaRichiesta",false);
}
function riconosciUtente()
{   $values = array("user","pass");
    echo call_stored_procedure($values, "riconosciUtente",'s');
}

function aggiungiCorsa()
{   $values = array("partenza", "arrivo", "usernameCliente", "usernameTassista","idP","importo");
    echo $_POST['importo'];
    call_stored_procedure($values, "inserisciCorsa",'b');
}
function prenotazioneCompletata()
{   $values = array("user");
    echo call_stored_procedure($values, "verificaStatoPrenotazione",'s');
}
function eliminaPrenotazione()
{   $values = array("user");
    echo call_stored_procedure($values, "eliminaPrenotazione");
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