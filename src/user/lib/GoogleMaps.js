const autocomplete = [];
var map;


/*
  This class makes the googleMaps implementation run. It creates a map and transformes the simple input fields
  In an something they called "Place Autocomplete". It's basically the input box on google maps.
  You can get the 

*/
function GoogleMaps(){
  //All this function return a specific value of the google APi's class.
  this.getEndPlace=function(){
    return autocomplete[1].getPlace();
  };
  this.getStartCoordinates=function(){
    return [autocomplete[1].getPlace().geometry.location.lng(), 
    autocomplete[1].getPlace().geometry.location.lat()];
  };
  this.getEndCoordinates=function()
  { return [autocomplete[0].getPlace().geometry.location.lng(), 
    autocomplete[0].getPlace().geometry.location.lat()];
  };
  this.getStartPlace=function(){
    return autocomplete[0].getPlace();
  };
  this.getMap=function(){return map;};
  this.getCityFromLocation=function(place){
    let city = "";
    for (let component of place.address_components) {
      if (component.types.includes("locality")) {
        city = component.long_name;
        break;
      }
    }
    return city;
  }
}
function googleMaps(){
  return new GoogleMaps();
}

//This function creates the autocomplete input fields and connects a marker with them
function addAutocomplete(input, map, isStart) {
  const options = {
    fields: ["address_components", "geometry", "name"],
    strictBounds: false,
    types: ["address"],
  };
  var i;
  if(isStart) i = 0;
  else i = 1;

  autocomplete[i] = new google.maps.places.Autocomplete(input, options);
  autocomplete[i].bindTo("bounds", map);

  const marker = new google.maps.Marker({
    map,
    anchorPoint: new google.maps.Point(0, -29),
  });
  addAutocompleteListener(autocomplete[i], marker)

}

//This function creates a trigger to change place on the map when the autocomplete input is entered. 
//It also changes the position of the marker
function addAutocompleteListener(autocomplete, marker){
  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();

    if (!place.geometry || !place.geometry.location) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert(
        "No details available for input: '" + place.name + "'"
      );
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(15);
    }

    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

  });
}

//this function get's immidiatly called, it creates a map and the autocomplete Listener
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 44.5236221, lng: 11.369555 },
    zoom: 10,
    mapTypeControl: false,
  });

  // Autocomplete for the first input box
  const input = document.getElementById("input-start-location");
  addAutocomplete(input, map, true);
  // Autocomplete for the second input box
  const input2 = document.getElementById("input-end-location");
  addAutocomplete(input2, map, false);
}

window.initMap = initMap;
