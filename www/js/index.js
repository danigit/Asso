
var app = {
    // Application Constructor
    initialize: function() {
        this.bind();
    },

    bind: function(){
        document.addEventListener('deviceready', this.deviceready, false);
        window.onload = () => {
            if(!mobilecheck()){
                let index = document.getElementById('login-content');
                if(index !== null) {
                    index.style.width = '65%';
                    index.style.margin = 'auto';
                }
                $('#login-fielset:first-child').css('width', '65%');
                $('#login-fielset:first-child').css('margin', 'auto');

                let home = document.getElementById('home-content');
                if(home !== null) {
                    home.style.width  = '65%';
                    home.style.margin = 'auto';
                }
            }
        }

        $('#recover-password').on('pageinit', function () {
            if(!mobilecheck()){
                document.getElementById('recover-content').style.width = '50%';
                document.getElementById('recover-content').style.margin = 'auto';
            }
        });

        $('#modificaPassword').on('pageinit', function () {
            if(!mobilecheck()){
                document.getElementById('modificaPassword-content').style.width = '50%';
                document.getElementById('modificaPassword-content').style.margin = 'auto';
            }
        });

        //pagina di registrazione
        $('#register').on('pagebeforeshow', function () {
            if(!mobilecheck()){
                document.getElementById('register-content').style.width = '50%';
                document.getElementById('register-content').style.margin = 'auto';
            }
            register();
        });

        //pagina della fatture
        $('#fatture').on('pageinit', function () {
            getFatture();
        });

        //pagina dell'anagrafica
        $('#anagrafica').on('pageinit', function () {
            getAnagrafica();
        });

        //pagina dei contatti
        $('#contratti').on('pageinit', function () {
            getContratti();
        });

        //pagina dei rapporti
        $('#rapporti').on('pageinit', function () {
            getRapporti();
        });

        //pagina delle attrezzature
        $('#attrezzature').on('pageinit', function () {
            getAttrezzature();
        });

        //pagina del cambio anagrafica
        $('#cambioAnagrafica').on('pagebeforeshow', function () {
            setCambioAnagrafica();
        });

        //pagina della richiesta assistenza
        $('#richiestaAssistenza').on('pagebeforeshow', function () {
            richiestaAssistenza();
        });

        //pagina della sorveglianza
        $('#sorveglianza').on('pagebeforeshow', function () {
            resetSorveglianza();
            // caricaModifiche();
        });
    },

    //funzione che visualizza il contenuto del pdf passato come parametro
    openPdf: function(url){
        window.open(url, '_blank', 'location=yes');
    }
};


$(document).ready(function () {
    app.initialize()
});