// ------------------------------------------------------------------------------------------------
// -------------------                 CANVAS                 -------------------------------------
// ------------------------------------------------------------------------------------------------

class Canvas {
    
    constructor(canvasId) {
        this.canvas = canvasId;
        this.ctx = this.canvas.getContext('2d');
        this.signing = false;
    }

    load() {
        this.canvas.addEventListener('mousedown', () => {
            this.start();
        });
        this.canvas.addEventListener('mousemove', (e) => {
            this.draw(e);
        });
        this.canvas.addEventListener('mouseup', () => {
            this.stop();
        });

        //evenements ecran tactile
        this.canvas.addEventListener('touchstart', () => {
            this.start();
        });
        this.canvas.addEventListener('touchmove', (e) => {
            this.draw(e);
        });
        this.canvas.addEventListener('touchend', () => {
            this.stop();
        });
    }

    start() {
        this.signing = true;    //dessine
        this.ctx.beginPath();    //commence le traçé
    }

    draw(e) {

        if (this.signing === true) {

            if (e.touches && e.touches.length > 0) {

                this.ctx.lineWidth = '2';
                this.ctx.lineCap = "round";
                this.ctx.lineJoin = "round";
                this.ctx.lineTo(e.touches[0].clientX - this.canvas.offsetLeft, e.touches[0].clientY - this.canvas.offsetTop);
                this.ctx.stroke();
                    //appelle la fonction permetResa()
                this.permetResa();

            } else {

                this.ctx.lineWidth = '2';
                this.ctx.lineCap = "round";
                this.ctx.lineJoin = "round";
                    //ajouter un offset if navigateur firefox
                if (typeof InstallTrigger !== 'undefined') {
                    this.ctx.lineTo(e.layerX - this.canvas.offsetLeft, e.layerY - this.canvas.offsetTop);
                } else {
                    this.ctx.lineTo(e.layerX, e.layerY);
                }

                this.ctx.stroke();
                    //appelle la fonction permetResa()
                this.permetResa();
            }
        }
    }

    stop() {
        this.signing = false;    //ne dessine plus
        this.ctx.beginPath();
    }

        //valider sa réservation après signature
    permetResa() {
            //faire apparaitre le bouton confirmer réservation qui est en visibility hidden
        document.getElementById('reservation').style.visibility = 'visible';
    }
};  

var signature = new Canvas(document.getElementById('monCanvas'));
signature.load();