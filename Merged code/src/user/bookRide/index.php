<?php
require_once dirname(dirname(__DIR__)) . '\shared\lib\security.php';
checkUser(UserType::Cliente);
?>
<!DOCTYPE html>

<html>
  <head>
    <title>Select route</title>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script> 
  <link rel="stylesheet" href="style.css">


  </head>
  <body>
    <div id="pac-card">
      <div>
        <div id="title">
          Search for places
        </div>
        <div>
          <input
            id="input-start-location"
            class="controls"
            type="text"
            placeholder="Enter a location"
          />
          <input
            id="input-end-location"
            class="controls"
            type="text"
            placeholder="Enter another location"
          />  
          <button id="submit-button"  onclick="handleSubmitButton(); return false;"> Submit </button>
          <p id="distance"></p>
        </div>
        <label for="nrSeat" > Number of seats:  </label>
        <input type="number"  id="nrSeat" name="nrSeat" min="1" max="8"> <br>
        <input type="checkbox" id="luxury" name="luxury" >
        <label for="vehicle1"> Lusso</label><br>
        <input type="checkbox" id="electric" name="electric">
        <label for="electric"> Elettrica</label><br>
      </div>
      <div id="infowindow-content">
        <span id="place-name" class="title"></span><br />
        <span id="place-address"></span>
      </div>
    </div>
    
    <div id="map"></div>
    <div id="infowindow-content">
      <span id="place-name" class="title"></span><br />
      <span id="place-address"></span>
    </div>

    <script src="../lib/GoogleMaps.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="../../shared/lib/PhpRequest.js"></script>
    <script src="script.js"></script>
    <script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDnGs4AcLhw3S_XFxTRkQisRYKOQ7QJTlw&callback=initMap&libraries=places&v=weekly"
      defer
    ></script>
  </body> 
</html>