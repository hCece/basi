<?php
// Define the valid user types as an enumeration
abstract class UserType {
  const Amministratore = "amministratore";
  const Cliente = "cliente";
  const Tassista = "tassista";
}

//This function checks firstly if the cookies "user" and "pass" are set, if so
//it calls the function isValidCredential from the imported library.
//If anything isn't valid, the error page is loaded  
function checkUser($userType) {
  require_once __DIR__.'\mySqlConnection\validCredential.php';
  ob_start();
  session_start();
  $isValidCredential = isValidCredential($_COOKIE["user"], $_COOKIE["pass"], $userType);

  if (!$isValidCredential) {
    echo(dirname(__FILE__).'/errorPage/index.php');
    echo('<br>');
    echo('../errorPage/index.php');
    header('Location: ../../shared/errorPage/index.php');
    exit();
  }
}
?>