(function() {
  var roadtrip_reserves = [
    "Bodega_Marine_Boundary_2", // 6
    "missing Point Reyes", // 0
    "Ano_Nuevo_Island_0", // 0
    "Younger_Lagoon_Boundary_36", // 4
    "Fort_Ord_Boundary_12", // 22
    "Landels_Hill_Big_Creek_Boundary_20", // 0
    "Kenneth_Norris_Rancho_Marino_Boundary_19", // 2
    "Coil_Oil_Point_Boundary_8", // 0
    "Carpinteria_Salt_Marsh_Boundary_6", // 5
    "San_Joaquin_Marsh_Boundary_25", // 4
    "Scripps_Boundary_27" // 5 samples
  ];

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

  // ============
  // map code
  // ============

  var mymap = L.map("mapid").setView([37.505, -120.09], 6);

  var osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  var osmAttrib =
    'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';

  L.tileLayer(osmUrl, {
    maxZoom: 18,
    attribution: osmAttrib
  }).addTo(mymap);

  window.demomap.sample_sites.forEach(point => {
    var circle = L.circle([point[0], point[1]], {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 40
    }).addTo(mymap);
    circle.bindPopup(
      `<b>Sample:</b> ${point[2]}<br>
       <b>Location:</b> ${point[3]}<br>
       <b>Lat, Long:</b> ${point[0]}, ${point[1]}`
    );
  });

  window.demomap.reserves.forEach(reserve => {
    var name = reserve.name;
    var color = roadtrip_reserves.includes(name) ? "green" : "blue";

    L.geoJson(reserve, {
      style: function() {
        return { color: color };
      },
      onEachFeature: onEachFeatureHandler
    }).addTo(mymap);
  });

  var reserveEls = document.querySelectorAll(".reserve");
  if (reserveEls) {
    reserveEls.forEach(el => {
      el.addEventListener("click", e => {
        e.preventDefault();
        mymap.setView([e.target.dataset.lat, e.target.dataset.long], 12);
      });
    });
  }
})();
