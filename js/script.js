(function () {
  // Define a variable holding SVG mark-up that defines an icon image:
  var svgMarkup = `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
  <rect stroke="white" fill="#1b468d" x="1" y="1" width="22" height="22" />
  <text x="12" y="18" font-size="12pt" font-family="Arial" font-weight="bold" 
    text-anchor="middle" fill="white">H</text>
  </svg>`;

  var API_URL = "https://api.hel.fi/linkedevents/v1/place/?format=json";

  // Create an icon, an object holding the latitude and longitude, and a marker:
  var icon = new H.map.Icon(svgMarkup),
    platform = new H.service.Platform({
      apikey: window.HERE_API_KEY,
    });
  var MAP_CONTAINER = document.getElementById("mapContainer");
  var ROVANIEMI_COORD = { lat: 66.5039, lng: 25.7294 };

  // Obtain the default map types from the platform object:
  var defaultLayers = platform.createDefaultLayers();

  // Instantiate (and display) a map object:
  var map = new H.Map(MAP_CONTAINER, defaultLayers.vector.normal.map, {
    zoom: 10,
    center: ROVANIEMI_COORD,
  });

  fetch(API_URL)
    .then(function (resp) {
      return resp.json();
    })
    .then(handleJSON)
    .catch(function (err) {
      console.log(err);
    });

  /**
   * Iterate through the json object for events data
   * for each event, render their coordinates to the HERE map object with addObject method
   *https://developer.here.com/documentation/examples/maps-js/markers/markers-on-the-map
   * @param {object} json parsed response from the API call
   */

  function handleJSON(json) {
    json.data.forEach(function (event) {
      var _coordinates = {
        lat: event.position.coordinates[1],
        lng: event.position.coordinates[0],
      };

      var _marker = new H.map.Marker(_coordinates, { icon: icon });
      map.addObject(_marker);
    });
  }

  // if the the user browser doesn't support geolocation, suspend everything
  if (!navigator.geolocation) {
    return;
  }
  //ask for user permission to retrieve estimated coordinates accoriding to ISP provider
  // if user allows us to fecth their coordinates (lon, lat) then invoke the performTasks function
  navigator.geolocation.getCurrentPosition(performTasks);

  /**
   * This function will be invoked if user allows fetching their coordinates in the popup
   * extract the user lat, lon from postion.coord object
   * create HERE map marker object with H.map.Marker constructor and addObject method
   * https://developer.here.com/documentation/examples/maps-js/markers/markers-on-the-map
   * @param {Object} position
   */

  function performTasks(position) {
    var lat = position.coords.latitude,
      lon = position.coords.longitude;

    var coords = { lat: lat, lng: lon },
      userLocationMarker = new H.map.Marker(coords, { icon: icon });

    //mark user location on the map
    map.addObject(userLocationMarker);
  }
})();
