<?php 


require __DIR__.'/main.php';


function isValidCredential($user, $pass, $type) {
    
    $_POST['user'] = $user;
    $_POST['pass'] = $pass;
    $values = array("user","pass");
    $return = call_stored_procedure($values, "riconosciUtente",'s');
    if($return == $type) return true;
    else false;

}

?>