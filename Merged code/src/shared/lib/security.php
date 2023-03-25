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
  //TODO: somehow check if the cookies set are actually valid credentials
  if(!isset($_COOKIE["user"]) || !isset($_COOKIE["pass"])) {
    header('Location: ../errorPage/index.php');
    exit();
  }
  
  $isValidCredential = isValidCredential($_COOKIE["user"], $_COOKIE["pass"], $userType);
  
  if (!$isValidCredential) {
    header('Location: ../errorPage/index.php');
    exit();
  }
}
?>