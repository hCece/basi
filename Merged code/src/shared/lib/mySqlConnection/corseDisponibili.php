<?php
require __DIR__.'/main.php';

if (isset($_COOKIE["user"])){
    $query = '  SELECT * FROM prenotazioneCorsa
                WHERE partenza IN
                    (SELECT citta FROM tassista 
                    WHERE username = "'.$_COOKIE["user"].'")';
    $rtrn = call_query($query);
    echo json_encode($rtrn);
}





?>