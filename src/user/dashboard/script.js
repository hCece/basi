window.onload = function () {
    const update = new Update();
    const notifyBadge = document.getElementById("span-prenota-corsa"); // Get the tbody element
    let beginRide = update.notificationBadge(notifyBadge,PhpRequest.Prenotazione.isCompletata, {user:getCookie('user')});

    if(beginRide == "si prenotazione"){
        notifyBadge.innerHTML = 1;
        let tmpRide;
        reservation = setInterval(function () {
            tmpRide = update.notificationBadge(notifyBadge,PhpRequest.Prenotazione.isCompletata,{user:getCookie('user')});
            if(tmpRide=="si corsa"){    
                notifyBadge.innerHTML = 0;
                phpRequest.mySql(PhpRequest.Prenotazione.Elimina, "POST",{user:getCookie('user')} );
                alert("La corsa è stata presa in carico. un tassista arriverà a breve");
                clearInterval(reservation);    
            } 
        }, 2000);
    }else{
        notifyBadge.style.visibility="hidden";
    }

}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }