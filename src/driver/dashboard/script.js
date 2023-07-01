window.onload = function () {
    const update = new Update();
    const notifyBadge = document.getElementById("span-prenota-corsa"); // Get the tbody element
    
    
    update.notificationBadge(notifyBadge,PhpRequest.Corsa.CountDisponibili);
    
    setInterval(function () {
        update.notificationBadge(notifyBadge,PhpRequest.Corsa.CountDisponibili);
    }, 2000);

}


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
