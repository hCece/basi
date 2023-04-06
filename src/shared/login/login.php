<!DOCTYPE html>
<html>

<head>
  <title>Login Form</title>
  <link rel="stylesheet" type="text/css" href="../registration/style.css">
</head>

<body>

  <div class="formbold-main-wrapper">
    <div class="formbold-form-wrapper">

        <h2>Log In</h2>

      <div>
        <br>
        <label for="user" class="formbold-form-label">
          Username
        </label>
        <input type="text" name="user" id="user" class="formbold-form-input" />
      </div>
      <div>
        <label for="pass" class="formbold-form-label"> Password </label>
        <input type="Password" name="pass" id="pass" class="formbold-form-input" />
      </div>
      <input class="formbold-btn" type="button" onclick="handleLoginButton(); return false;" name="log" id="log"
        value="Log In Here">
      <button class="formbold-btn" onclick="
        window.location.href = '../registration/register.php';
        return false;">
        Register Now</button>

    </div>
  </div>

  <br><br> <span id="errorLabel" class="label danger" style="visibility  : hidden">Credenziali sbagliate!</span>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
  <script src="../lib/PhpRequest.js"></script>
  <script src="script.js"></script>
</body>

</html>