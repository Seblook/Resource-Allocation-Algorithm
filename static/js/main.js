let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 25.7617, lng: -80.1918 }, // Miami
    zoom: 11,
  });

  fetch("/api/incidents")
    .then(res => res.json())
    .then(data => {
      const listDiv = document.getElementById("incident-list");
      listDiv.innerHTML = "<h2>Prioritized Incidents</h2><ul>";
      data.forEach(incident => {
        const zip = incident.zip;
        const type = incident.type;

        const marker = new google.maps.Marker({
          position: getZipCoords(zip),
          map,
          title: `${type} - ${zip}`
        });

        listDiv.innerHTML += `<li>${type.toUpperCase()} in ${zip}</li>`;
      });
      listDiv.innerHTML += "</ul>";
    });
}

function getZipCoords(zip) {
  const lookup = {
    "33101": { lat: 25.774, lng: -80.193 },
    "33125": { lat: 25.78, lng: -80.23 },
    "33130": { lat: 25.765, lng: -80.204 },
    "33133": { lat: 25.726, lng: -80.242 },
    "33135": { lat: 25.749, lng: -80.236 }
  };
  return lookup[zip] || { lat: 25.7617, lng: -80.1918 };
}

window.initMap = initMap;
