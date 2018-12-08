
var app = {
    // Application Constructor
    initialize: function() {
        this.bind();
    },

    bind: function(){
        document.addEventListener('deviceready', this.deviceready, false);

        $('#register').on('pagebeforeshow', function () {
            register();
        });

        $('#fatture').on('pageinit', function () {
            getFatture();
        });

        $('#anagrafica').on('pageinit', function () {
            getAnagrafica();
        });

        $('#contratti').on('pageinit', function () {
            getContratti();
        });

        $('#rapporti').on('pageinit', function () {
            getRapporti();
        });

        $('#attrezzature').on('pageinit', function () {
            getAttrezzature();
        });

        $('#cambioAnagrafica').on('pagebeforeshow', function () {
            setCambioAnagrafica();
        });

        $('#richiestaAssistenza').on('pagebeforeshow', function () {
            richiestaAssistenza();
        });

        $('#sorveglianza').on('pagebeforeshow', function () {
            resetSorveglianza();
            // caricaModifiche();
        });
    },

    openPdf: function(url){
        window.open(url, '_blank', 'location=yes');
    }
};


$(document).ready(function () {
    app.initialize()
});