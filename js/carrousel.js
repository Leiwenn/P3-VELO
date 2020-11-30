// ------------------------------------------------------------------------------------------------
// -------------------              CARROUSEL                 -------------------------------------
// ------------------------------------------------------------------------------------------------

class Carrousel {

    constructor() {
        this.figure = $('figure');    //selection des balises figure
        this.index = 0;    //initialisation de l'index des figure
        this.indexDerniereFigure = this.figure.length - 1;
        this.currentFigure = this.figure[0];    //current image = index 0
        this.currentFigure.style.display = 'block';
        this.interval = null;

        this.defilementAuto();

            //commandes boutons
        var pause = $('#pause');
        pause.on('click', this.stop.bind(this));

        var precedente = $('#prec');
        precedente.on('click', this.reculer.bind(this));

        var suivante = $('#suiv');
        suivante.on('click', this.avancer.bind(this));

        var recommence = $('#play');
        recommence.on('click', this.recommence.bind(this));

            //event onclick clavier
        var header = document.getElementsByTagName('header')[0];
        header.addEventListener('keydown', this.clavier.bind(this));
    }

        

    defilementAuto() {

        this.interval = setInterval(function() {

            if (this.carrousel.index < this.carrousel.indexDerniereFigure) {
                this.carrousel.index++;

            } else {
                this.carrousel.index = 0;
            }

            this.carrousel.currentFigure.style.display = 'none';
            this.carrousel.currentFigure = this.carrousel.figure[this.carrousel.index];
            this.carrousel.currentFigure.style.display = 'block';
        }, 5000);
    };

    //Commandes boutons
        
    reculer() {

        var oldIndex = this.index;
        
        this.index--;
        if (this.index >= 0) {
            this.figure[oldIndex].style.display = 'none';
            this.currentFigure = this.figure[this.index];
            this.currentFigure.style.display = 'block';
        } else {
            this.index = this.indexDerniereFigure;
            this.figure[oldIndex].style.display = 'none';
            this.currentFigure = this.figure[this.index];
            this.currentFigure.style.display = 'block';
        }
    };

    avancer() {

        var oldIndex = this.index;
        this.index++;

        if (this.index <= this.indexDerniereFigure) {

            this.figure[oldIndex].style.display = 'none';
            this.currentFigure = this.figure[this.index];
            this.currentFigure.style.display = 'block';

        } else {

            this.index = 0;
            this.figure[oldIndex].style.display = 'none';
            this.currentFigure = this.figure[this.index];
            this.currentFigure.style.display = 'block';
        }
    };

    stop() {
        clearInterval(this.interval);
    };

    recommence() {

        var data = this;
        data.defilementAuto();
    };


    //Commandes clavier

    clavier(event) {

        event.preventDefault();

        switch (event.key) {

            case "ArrowLeft":
                this.stop();
                this.reculer();
            break;

            case "ArrowRight":
                this.stop();
                this.avancer();
            break;

            default:
            break;
        }
    };
}

var carrousel = new Carrousel();