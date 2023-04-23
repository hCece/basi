window.onload = function () {
    const update = new Update();
    const cookie = new Cookie();
    const notifyBadge = document.getElementById("span-prenota-corsa"); // Get the tbody element
    let beginRide = update.notificationBadge(notifyBadge,PhpRequest.Prenotazione.isCompletata, {user:cookie.get('user')});

    if(beginRide.trim() == "si prenotazione"){
        notifyBadge.innerHTML = 1;
        notifyBadge.style.visibility="visible";
        let tmpRide;
        reservation = setInterval(function () {
            tmpRide = update.notificationBadge(notifyBadge,PhpRequest.Prenotazione.isCompletata,{user:cookie.get('user')});
            if(tmpRide.trim()=="si corsa"){    
                notifyBadge.innerHTML = 0;
                phpRequest.mySql(PhpRequest.Prenotazione.Elimina, "POST",{user:cookie.get('user')} );
                alert("La corsa è stata presa in carico. un tassista arriverà a breve");
                clearInterval(reservation);    
            } 
        }, 2000);
    }else{
        notifyBadge.style.visibility="hidden";
    }

}
