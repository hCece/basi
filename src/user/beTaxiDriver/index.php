<?php
require_once dirname(dirname(__DIR__)) . '\shared\lib\security.php';
checkUser(UserType::Cliente);
?>

<!DOCTYPE html>
<html>

<head>
  <script src="../../shared/lib/PhpRequest.js"></script>
  <script src="script.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

  <title>Diventa tassista</title>
  <link rel="stylesheet" type="text/css" href="style.css">
</head>

<body>


  <div class="formbold-main-wrapper">
    <div class="formbold-form-wrapper">

      <img src="your-image-url-here.jpg">

      <form action="https://formbold.com/s/FORM_ID" method="POST">
        <div class="formbold-form-title">
          <h2 class="">Diventa Tassista</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </p>
        </div>



        <div class="formbold-input-flex">
          <div>
            <label for="newUser" class="formbold-form-label">
              New Username
            </label>
            <input type="text" name="newUser" id="newUser" class="formbold-form-input" />
          </div>
          <div>
            <label for="pass" class="formbold-form-label"> Password </label>
            <input type="password" name="pass" id="pass" class="formbold-form-input" />
          </div>
        </div>


        <div class="formbold-input-flex">
          <div>
            <label for="brand" class="formbold-form-label">
                Marca
            </label>
            <input type="text" name="brand" id="brand" class="formbold-form-input" />
          </div>
          <div>
            <label for="model" class="formbold-form-label"> Modello </label>
            <input type="text" name="model" id="model" class="formbold-form-input" />
          </div>
        </div>
        <div class="formbold-input-flex">
          <div>
            <label for="licence" class="formbold-form-label"> Targa </label>
            <input type="text" name="licence" id="licence" class="formbold-form-input" />
          </div>
          <div>
            <label for="nrSeat" class="formbold-form-label">Posti conducenti </label>
            <input type="number" name="nrSeat" id="nrSeat" class="formbold-form-input" />
          </div>
        </div>

        <div class="formbold-mb-3">

            <input type="checkbox" id="luxury" name="luxury" >
            <label for="vehicle1"> Lusso</label><br>
            <input type="checkbox" id="electric" name="electric">
            <label for="electric"> Elettrica</label><br>
        </div>
        <input class="formbold-btn" type="button" onclick="handleRegistrationButton(); return false;" 
        name="register" id="register" value="Register Now">




      </form>
    </div>
  </div>


</body>



</html>


