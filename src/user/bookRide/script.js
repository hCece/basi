var googleMap = googleMaps();
var request = new PhpRequest();
var cookie = new Cookie();
var locationStart,locationEnd;
let idReservation, reservation;
const COEFFICENTE_PRO = 1.5;
var cookieUser = cookie.get('user');

window.onload = function () {
  request.mySql(PhpRequest.Prenotazione.isCompletata, "POST",{user:cookieUser} );
  let res = request.getResponse().trim();
  if(res == "si prenotazione" || res == "si corsa" ) {
    btn = document.getElementById("submit-button");
    btn.innerHTML = "Cancella Prenotazione";
    checkRide(btn);
  }
}


/* The button "submit" has two states: "Prenotazione Corsa" & "Cancella Prenotazione"
 * That are rappresented with the first if in the method. If the button is in delete reservation mode, 
 * the method deletes the previously made reservation, otherwise it will make a reservation and 
 * check each 5 seconds if the reservation has been approved by a taxidriver
 */
function handleSubmitButton() {
  
  let btn = document.getElementById("submit-button");
  if(btn.innerHTML === "Prenotazione Corsa"){
    setLocations();
    idReservation = doReservation();
    if(idReservation < 0) return;

    btn.innerHTML = "Cancella Prenotazione";
    checkRide(btn)


  }else{
    request.mySql(PhpRequest.Prenotazione.Elimina, "POST",{user:cookieUser} );
    btn.innerHTML = "Prenotazione Corsa";
    clearInterval(reservation);
  }
}

//Checks if the reservation has been picked up by a rider with "si corsa".
//When the reservation has been picked up by a rider, the user's reservation get's deleted
function checkRide(btn){
  interval = setInterval(function () {
    request.mySql(PhpRequest.Prenotazione.isCompletata, "POST",{user:cookieUser} );
    const responseData = request.getResponse();
    
    if (responseData.trim()==  "si corsa") {
      request.mySql(PhpRequest.Prenotazione.Elimina, "POST",{user:cookieUser} );
      alert("La corsa è stata presa in carico. un tassista arriverà a breve");
      clearInterval(interval);    
      btn.innerHTML = "Prenotazione Corsa";
    }
  }, 5000);
}

// This method prepares the json file to send to the server, and makes the request to book a new ride  
function doReservation(){
  startCity = googleMap.getCityFromLocation(locationStart);
  endCity = googleMap.getCityFromLocation(locationEnd);

  nrSeat = document.getElementById("nrSeat").value;
  if(!nrSeat) nrSeat = 1;

  var cost = getCost();
  console.log(cost + "COSTOOOOOO")
  var json = {
    pro :isProCar(),
    partenza:startCity,
    arrivo:endCity,
    nrPosti:nrSeat,
    usernameCliente:cookieUser,
    lus:isLuxury(),
    ele:isElectric(),
    costo:cost};

  console.log(json);  




  request.mySql(PhpRequest.Prenotazione.Inserisci, "POST", json);
  let idRes = request.getResponse();
  console.log(idRes)
  if(idRes==-200)
    alert("Non esistono dei tassisti con le tue specifiche richieste che partono da " + startCity);
  else if(idRes==-400)
    alert("Non hai abbastanza denaro per prenotare la corsa fino a " + endCity);
  else{
    //Setting the price 
    const priceLabel = document.getElementById('price-label');
    priceLabel.innerText = 'Prezzo: ' + Math.round(cost*3) + " T-coin";
    priceLabel.style.display = 'block';
  }
  return idRes;

}


function setLocations(){
  locationStart = googleMap.getStartPlace();
  locationEnd =  googleMap.getEndPlace();
  if (locationStart ==null || locationEnd == null) {
    window.alert("Please enter valid locations.");
    return;
  }

}


function isProCar(){
  if(isElectric() && isLuxury()) 
    return 1;
  return 0;
}

function isElectric(){
  if(document.getElementById("electric").checked)
    return 1;
  return 0;

}
function isLuxury(){
  if(document.getElementById("luxury").checked)
    return 1;
  return 0;

}




//

function getCost(){
  var startCoordinates = googleMap.getStartCoordinates(locationStart);
  var endCoordinates = googleMap.getEndCoordinates(locationEnd);
  prettyZoom();
  json = {LatBegin:startCoordinates[0],LongBegin:startCoordinates[1],
    LatEnd:endCoordinates[0],LongEnd:endCoordinates[1],isPro:isProCar(), user:cookieUser};


  console.log("LOOOOOL" + JSON.stringify(json))
  request.request("../lib/distance.php", "POST", json);
  return Number(request.getResponse());

}

//it adjusts zoom and location, so that both markers fit in the same map
function prettyZoom(){
  map = googleMap.getMap();
  const bounds = new google.maps.LatLngBounds();
  bounds.extend(locationStart.geometry.location);
  bounds.extend(locationEnd.geometry.location);
  map.fitBounds(bounds);

}