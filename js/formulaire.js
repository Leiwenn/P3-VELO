// ----------------------------------------------------------------------------------
// ----------------------    écouter, enregistrer et vérifier les données -----------
// ----------------------    localstorage / sessionstorage --------------------------
// ----------------------------------------------------------------------------------

function enregistrerNom() {
    var stockerNom = document.getElementById('lastname').value;    //recuperer la valeur du champ dans une variable
    localStorage.setItem('lastname', stockerNom);    //stocker en local storage la variable sous forme : clé, valeur
}

function enregistrerPrenom() {
    var stockerPrenom = document.getElementById('prenom').value;
    localStorage.setItem('prenom', stockerPrenom);
}

$( document ).ready(function() {

    $('#lastname').text(localStorage.getItem('lastname'));
    $('#prenom').text(localStorage.getItem('prenom'));

        // Vérification de l'existence d'une donnée enregistrée auparavant
    if (sessionStorage.getItem('stationData')) {


            //données station et formulaire
        var stockerAdresse = JSON.parse(sessionStorage.getItem('stationData')).data.address;
        $('#adresse').text(stockerAdresse);

        var stockerPlaces = JSON.parse(sessionStorage.getItem('stationData')).data.available_bike_stands;
        $('#placesRestantes').text(stockerPlaces);

        var stockerVelos = JSON.parse(sessionStorage.getItem('stationData')).data.available_bikes;
        $('#velosRestants').text(stockerVelos);


            //données panneau informations de reservation
        var stockerNomStation = JSON.parse(sessionStorage.getItem('stationData')).data.name;
        const monTiret = '-';
        const monIndexDuTiret = stockerNomStation.indexOf(monTiret);
        $('#nom_station').empty();
        $('#nom_station').text('Vélo reservé à' + ' ' + stockerNomStation.substring(monIndexDuTiret + 1));

        $('#nom_utilisateur').empty();
        $('#nom_utilisateur').text('par' + ' ' + localStorage.getItem('lastname') + ' ' + localStorage.getItem('prenom'));

        $('#temps_restant').empty();
        $('#temps_restant').text('Temps restant :' + ' ' + sessionStorage.getItem('stockerMinutes') + ' ' + 'min' + ' ' + sessionStorage.getItem('stockerSecondes') + ' ' + 's');
            //affiche le bouton annuler
        $('#annuler').css('display', 'block');
    }
});


function verifierDonnees() {

    var reservationValid = true;
    var champs = $('input[required]');
    var stationData = JSON.parse(sessionStorage.getItem('stationData'));

    if (stationData === null) {

        alert('Merci de sélectionner une station.');
    }

    //reservation possible si velo dispo ET si la station est ouverte
    if ((stationData.data.available_bikes > 0) && (stationData.data.status === 'OPEN')) {
        
        //pour chaque input (nom et prenom)
        $('input[required]').each(function() {

            var inputRegExp = new RegExp('[A-Za-z]+');

            //$(this) représente les 2 objets input
            //if la valeur de this est nulle OU ne contient rien
            if (($(this).val() === undefined) || ($(this).val().length === 0)) {

                reservationValid = false;
                alert('Merci de remplir les champs Nom et Prénom !');

            } else if ( !inputRegExp.test($(this).val()) ) {

                reservationValid = false;
                alert('Ne peut contenir que des lettres \n et au moins une lettre.');
            }
        });
        
    } else if (stationData.data.available_bikes == 0) {

        reservationValid = false;
        alert('Pas de vélo disponible ! /n Merci de sélectionner une autre station.');

    } else if (stationData.data.status === 'CLOSED') {
        reservationValid = false;
        alert('Station fermée ! \n Merci de selectionner une autre station.');

    }

    //checkbox
    if (!$('input[type=checkbox]').is(':checked')) {
        reservationValid = false;
    }

    //bouton réserver et ouverture du canvas
    var monBouton = $('.boutonReserver');

    if (reservationValid == true) {
        ouvrirCanvas();
    }
}

function ouvrirCanvas() {
    $('.signature').css('display', 'block');
}