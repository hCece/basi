<?php 


require __DIR__.'/main copy.php';


///TODO: the problem is that main.call_stored_procedures checks if a post variable is set... therefore sending the variable value dosen't help
function isValidCredential($user, $pass, $type) {
    
    //$return = call_stored_procedure(array($user,$pass), "checkUsername",'s');
    //if($return = "...") return false;
    $return = call_stored_procedure(array($user), "riconosciUtente",'s');
    if($return == $type) return true;
    header('Location: ../errorPage/index.php');

}

?>