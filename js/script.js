(function () {
  var lat = null,
    lon = null;
  navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);

    lat = position.coords.latitude;
    lon = position.coords.longitude;

    // Initialize the platform object:
    var platform = new H.service.Platform({
      apikey: "CzTSptUZISX8B88Sa0jrEBK2BRA8K0B2pO_pe41ImGk",
    });

    // Obtain the default map types from the platform object
    var maptypes = platform.createDefaultLayers();

    // Instantiate (and display) a map object:
    var map = new H.Map(
      document.getElementById("mapContainer"),
      defaultLayers.normal.map,
      {
        zoom: 10,
        center: { lat: 52.5, lng: 13.4 },
      }
    );

    console.log(map);
    fetch(`https://api.hel.fi/linkedevents/v1/place/?format=json`)
      .then(function (resp) {
        return resp.json();
      })
      .then(function (json) {
        console.log(json);
      })
      .catch(function (err) {
        console.log(err);
      });
  });
})();
