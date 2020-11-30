// ------------------------------------------------------------------------------------------------
// -------------------      CARTE https://leafletjs.com/      -------------------------------------
// -------------------      Données API JCDecaux              -------------------------------------
// ------------------------------------------------------------------------------------------------

class Carte {

    constructor() {
        this.carte = null;
        this.creationCarte();
        this.requeteAjax(this.extractionDonnees.bind(this));
    }

    creationCarte() {

        var carte = L.map('maCarte').setView([47.2173, -1.5534], 13);

            //charger les tuiles = tile
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            minZoom: 13,
            maxZoom: 17,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoibGVpd2VubiIsImEiOiJjazJxNHR2NDEwOHBwM2RxZjgxcXVqeTY2In0.R2RnSWIM_u2Vd3PRpcjPcw'
        }).addTo(carte);

        this.carte = carte;
    }

    requeteAjax(treatment) {

        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {

            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

                var response = JSON.parse(this.responseText);
                var stations = response;

                treatment(stations);

            } else if (!this.status == 200) {

                alert('La requête a échoué');
            }
        }
        request.open('GET', 'https://api.jcdecaux.com/vls/v1/stations?contract=Nantes&apiKey=2cdd6f114f3e9eed22de128ecd7c9e12938881df');
        request.send();
    }

    extractionDonnees(stations) {

        var markers = L.markerClusterGroup();

        stations.forEach(function(station) {
            
                //test fonctionnement icone station fermée = rouge
            /*if (station.name == '109 - CLOS TOREAU') {
                station.status = 'CLOSED';
            }*/

                //extraire et stocker dans une variable les positions des stations: lat et lng
            var lat = station.position.lat;
            var lng = station.position.lng;

                //marker personnalisés : vert et rouge
            if (station.status === 'OPEN') {
                var myIcon = L.icon({
                    iconUrl: 'img/vert.png',
                    iconSize: [38, 40],
                    iconAnchor: [19, 42],
                    popupAnchor: [0, -30]
                });
            } else {
                var myIcon = L.icon({
                    iconUrl: 'img/rouge.png',
                    iconSize: [38, 40],
                    iconAnchor: [19, 42],
                    popupAnchor: [0, -30]
                });
            }
            var marker = L.marker([lat, lng], { station : station, icon: myIcon});

                //extraire et stocker : nom de station, status, adresse, places restantes et velos disponibles
            var nomStation = station.name; 
            var statusStation = station.status;

                //affichage des popup sans numéro de station
            const tiret = '-';
            const indexDuTiret = nomStation.indexOf(tiret);
            marker.bindPopup('<p>Station : ' + nomStation.substring(indexDuTiret + 1) +'</br>'+ 'Etat de la station : ' + statusStation + '</p>');

                //stocker les données pour les afficher ensuite
            var adresseStation = station.address;
            var placesLibres = station.available_bike_stands;
            var velosLibres = station.available_bikes;

                //au click sur un marker afficher les informations de station dans le panneau latéral
            marker.addEventListener('click', function(station) {
                
                let adresse = document.getElementById('adresse');
                let placesRestantes = document.getElementById('placesRestantes');
                let velosRestants = document.getElementById('velosRestants');
                adresse.textContent = this.options.station.address;
                placesRestantes.textContent = this.options.station.available_bike_stands;
                velosRestants.textContent = this.options.station.available_bikes;

                //stocker en session storage les informations de la station selectionnée
                var value = {data : this.options.station};
                var stockerDonneesStation = JSON.stringify(value);
                sessionStorage.setItem('stationData', stockerDonneesStation);
            });
            markers.addLayer(marker);
        });

        //ajouter les clusters sur la carte
        this.carte.addLayer(markers);
    }

};

const newCarte = new Carte('maCarte');