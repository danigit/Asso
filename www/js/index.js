
var app = {
    // Application Constructor
    initialize: function() {
        this.bind();
    },

    bind: function(){
        document.addEventListener('deviceready', this.deviceready, false);

        //pagina di registrazione
        $('#register').on('pagebeforeshow', function () {
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