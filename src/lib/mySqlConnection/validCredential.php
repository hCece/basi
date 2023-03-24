<?php 


require __DIR__.'/main.php';


///TODO: this code set's the cookies to POST variables and calls the stored procedure. 
// That's bad coding, we should change the main to choose if we want COOKIES, POST or GET variables  
function isValidCredential($user, $pass, $type) {
    
    $_POST['user'] = $user;
    $_POST['pass'] = $pass;
    $values = array("user","pass");
    $return = call_stored_procedure($values, "riconosciUtente",'s');
    echo($_POST['pass']);
    if($return == $type) return true;
    else false;

}

?>