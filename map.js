(function() {
  var mymap = L.map("mapid").setView([40.505, -120.09], 5);

  L.tileLayer(
    "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
    {
      maxZoom: 18,
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: "mapbox.streets"
    }
  ).addTo(mymap);

  window.demomap.sample_sites.forEach(point => {
    var circle = L.circle([point[1], point[2]], {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 10
    }).addTo(mymap);
    circle.bindPopup(
      `<b>Sample:</b> ${point[0]}<br><b>Lat, Long:</b> ${point[1]}, ${point[2]}`
    );
  });

  function onEachFeatureHandler(feature, layer) {
    var name =
      feature.properties.Name ||
      feature.properties.NAME ||
      feature.properties.UNIT_NAME;
    var campus =
      feature.properties.Campus ||
      feature.properties.CAMPUS ||
      feature.properties.AGNCY_NAME;
    if (feature.properties && name) {
      var body = "<b>Name:</b> " + name + "<br>";
      body += "<b>Campus:</b> " + campus;
      layer.bindPopup(body);
    }
  }

  window.demomap.reserves.forEach(reserve => {
    L.geoJson(reserve, {
      onEachFeature: onEachFeatureHandler
    }).addTo(mymap);
  });
})();
