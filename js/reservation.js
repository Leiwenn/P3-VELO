// ------------------------------------------------------------------------------------------------
// -------------------             RESERVATION              ---------------------------------------
// ------------------------------------------------------------------------------------------------

class Reservation {

	constructor() {
		this.reservation();
		this.monInterval = null;
		var temps = 1200;
		this.monTimer.bind(this);
		var reservation = this;

		$('#annuler').on('click', function() {
			reservation.annuler();
		});
	}

	//fonction reservation après signature du canvas (onclick sur button HTML du bloc du canvas)
	reservation() {

		var reservation = this;

		$('#reservation').on('click', function() {

				//récupérer les données de session storage et les stocker dans une variable
			var stationName = JSON.parse(sessionStorage.getItem('stationData')).data.name;

				//ne pas afficher les numéros ID du nom de la station
			const tiret = '-';
			const indexDuTiret = stationName.indexOf(tiret);

				//fenêtre de confirmation de la réservation
			var confirmer = confirm('Confirmer ma réservation');

			if (confirmer === true && reservation.monInterval === null) {

					//20 minutes = 1200 sec
				reservation.temps = 1200;
					//décompte toutes les sec
        		reservation.monInterval = setInterval(reservation.monTimer.bind(reservation), 1000);
					//ferme le canvas
				$('.signature').css('display', 'none');
					//afficher les données local storage et session storage dans les span prevus
				//sessionStorage.setItem(stationName.substring(indexDuTiret + 1));
				$('#nom_utilisateur').text('par' + ' ' + localStorage.getItem('lastname') + ' ' + localStorage.getItem('prenom'));
				$('#nom_station').text('Vélo reservé à' + ' ' + stationName.substring(indexDuTiret + 1));
					//affiche le bouton annuler
				$('#annuler').css('display', 'block');

        	} else if (confirmer === false) {

        			//fonction annuler()
        		reservation.annuler();
        			//fermer le canvas
        		$('.signature').css('display', 'none');

        	} else if (confirmer === true && reservation.monInterval != null) {

        		var confirmerEcrasementResa = confirm("Vous avez déja une réservation, souhaitez vous l'annuler ?");

        		if (confirmerEcrasementResa === true) {

        			sessionStorage.clear();
        			clearInterval(reservation.monInterval);

	        				//20 minutes = 1200 sec
					reservation.temps = 1200;
						//décompte toutes les sec
	        		reservation.monInterval = setInterval(reservation.monTimer.bind(reservation), 1000);
						//ferme le canvas
					$('.signature').css('display', 'none');
						//afficher les données local storage et session storage dans les span prevus
					$('#nom_utilisateur').empty();
					$('#nom_station').empty();
					$('#nom_utilisateur').text('par' + ' ' + localStorage.getItem('lastname') + ' ' + localStorage.getItem('prenom'));
					//sessionStorage.setItem(stationName.substring(indexDuTiret + 1));
					$('#nom_station').text('Vélo reservé à' + ' ' + stationName.substring(indexDuTiret + 1));
						//affiche le bouton annuler
					$('#annuler').css('display', 'block');
        		}
        	}
		});
	}

	monTimer() {

		var monSpan = document.getElementById('temps_restant');
		var reservation = this;

		if (this.temps > 0) {

			this.temps --;

    		let min = Math.floor(this.temps / 60);
    		let sec = this.temps - min * 60;

    		if (min < 10) min = '0' + min;
    		if (sec < 10) sec = '0' + sec;
    			//stocker en session storage le timer
    		var minutesSauvegarde = min;
    		var secondesSauvegarde = sec;
    		sessionStorage.setItem('stockerTemps', this.temps);

    		monSpan.textContent = 'Temps restant :' + ' ' + minutesSauvegarde + ' ' + 'min' + ' ' + secondesSauvegarde + ' ' + 's';

		} else if (this.temps === 0 || isNaN(this.temps)) {

			monSpan.textContent = 'Le temps est écoulé ! Votre réservation est annulée.';
			this.annuler();
		}
	}

	annuler() {

		var reservation = this;
			//effacer les données enregistrées pour cette session de navigation
		sessionStorage.clear();

			//effacer les span du formulaire (adresse station et vélos)
		$('#adresse').empty();
		$('#placesRestantes').empty();
		$('#velosRestants').empty();
		$('#nom_station').empty();
		$('#nom_utilisateur').empty();
		$('#temps_restant').empty();
		
			//annuler le timer
		clearInterval(reservation.monInterval);
		reservation.monInterval = null;
		reservation.temps = 1200;
			//fenêtre de confirmation
		alert('Votre réservation a bien été annulée !');
			//bouton annuler
		$('#annuler').css('display', 'none');

		//effacer le canvas
		window.signature.ctx.clearRect(0, 0, 200, 200);
	}
}

$( document ).ready(function() {

	var reserver = new Reservation();

	if (sessionStorage.getItem('stockerTemps')) {

		reserver.temps = sessionStorage.getItem('stockerTemps');
		reserver.monInterval = setInterval(reserver.monTimer.bind(reserver), 1000);
	}
});