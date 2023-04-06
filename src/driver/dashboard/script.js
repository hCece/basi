window.onload = function () {
    const update = new Update();
    const notifyBadge = document.getElementById("span-prenota-corsa"); // Get the tbody element
    
    
    update.notificationBadge(notifyBadge,PhpRequest.Corsa.CountDisponibili);
    
    setInterval(function () {
        update.notificationBadge(notifyBadge,PhpRequest.Corsa.CountDisponibili);
    }, 2000);

}