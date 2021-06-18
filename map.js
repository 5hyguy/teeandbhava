function init() {
    map = new OpenLayers.Map("basicMap", {
        controls: [
                   new OpenLayers.Control.Navigation(),
                   new OpenLayers.Control.ArgParser(),
                   new OpenLayers.Control.Attribution()
               ]
           }
           
           );
           var dae = gup('text', window.location.href);
           fetch("http://api.openweathermap.org/data/2.5/weather?q=" + dae + "&appid=745bd0cad1b74da8f40ccc87d34264e1").then(function (response) {
   
               //console.log(response)
   
               response.json().then(function (result) {
   
                   // textBox.innerHTML = "done fetching users and parsing the JSON!"
                   //textBox.innerHTML = result[1].name;
                   console.log(result.weather[0]);
                   let lat = result.coord.lat;
                   let lon = result.coord.lon;

                   var mapnik         = new OpenLayers.Layer.OSM();
    var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
    var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
    var position       = new OpenLayers.LonLat(lon,lat).transform( fromProjection, toProjection);
    var zoom           = 10
    
    map.addLayer(mapnik);
    map.setCenter(position, zoom );
    
    var markers = new OpenLayers.Layer.Markers( "Markers" );
    map.addLayer(markers);
    
    var marker = new OpenLayers.Marker(position);
    
    marker.events.register("click", map , function(e){ alert(dae);
    });
    
    markers.addMarker(marker);
   
               })
   
           })
    
    }