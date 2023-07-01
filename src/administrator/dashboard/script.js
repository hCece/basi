function handleLogoutButton(){
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var cookieName = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = cookie.trim() + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }


    window.location.href = '../../shared/login/login.php'
}
