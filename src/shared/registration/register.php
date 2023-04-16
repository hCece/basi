<!DOCTYPE html>
<html>

<head>
  <script src="../lib/PhpRequest.js"></script>
  <script src="script.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

  <title>Registration Form</title>
  <link rel="stylesheet" type="text/css" href="style.css">
</head>

<body>


  <div class="formbold-main-wrapper">
    <!-- Author: FormBold Team -->
    <!-- Learn More: https://formbold.com -->
    <div class="formbold-form-wrapper">

      <img src="your-image-url-here.jpg">

      <form action="https://formbold.com/s/FORM_ID" method="POST">
        <div class="formbold-form-title">
          <h2 class="">Registrati</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </p>
        </div>

        <div class="formbold-input-flex">
          <div>
            <label for="firstname" class="formbold-form-label">
              First name
            </label>
            <input type="text" name="firstname" id="firstname" class="formbold-form-input" />
          </div>
          <div>
            <label for="lastname" class="formbold-form-label"> Last name </label>
            <input type="text" name="lastname" id="lastname" class="formbold-form-input" />
          </div>
        </div>

        <div class="formbold-input-flex">
          <div>
            <label for="user" class="formbold-form-label">
              Username
            </label>
            <input type="text" name="user" id="user" class="formbold-form-input" />
          </div>
          <div>
            <label for="pass" class="formbold-form-label"> Password </label>
            <input type="password" name="pass" id="pass" class="formbold-form-input" />
          </div>
        </div>
        <div class="formbold-input-flex">
          <div>
            <label for="tel" class="formbold-form-label"> Codice Fiscale </label>
            <input type="tel" name="tel" id="tel" class="formbold-form-input" />
          </div>
          <div>
            <label for="birthday" class="formbold-form-label"> Data di Nascita </label>
            <input type="date" name="birthday" id="birthday" class="formbold-form-input" />
          </div>
        </div>

        <div class="formbold-mb-3">
          <label for="city" class="formbold-form-label">
            Città
          </label>
          <input type="text" name="city" id="city" class="formbold-form-input" />
        </div>
        <input class="formbold-btn" type="button" onclick="handleRegistrationButton(); return false;" 
        name="register" id="register" value="Register Now">




      </form>
    </div>
  </div>


</body>



</html>


