var app = {
    // Application Constructor
    initialize: function() {
        this.bind();
    },

    bind: function() {
        //        document.addEventListener('deviceready', this.deviceready, false);

        //pagina di registrazione
        $('#pageRegister').on('pagebeforeshow', function() {
            $('#registerUsername').val('');
            $('#registerEmail').val('');
            $('#registerName').val('');
            $('#registerSurname').val('');
            $('#registerPhone').val('');
            register();
        });

        $('#pageRecoverPsw').on('pagebeforeshow', function() {
            $('#mailRecover').val('');
            recoverPassword();
        });


        $("#BtnFatture").on('click', function() {
            $.mobile.changePage('#fatture');
        });

        //pagina della fatture
        $('#fatture').on('pagebeforeshow', function() {
            getFatture();
        });

        $("#BtnAnagrafica").on('click', function() {
            $.mobile.changePage('#anagrafica');
        });


        //pagina dell'anagrafica
        $('#anagrafica').on('pagebeforeshow', function() {
            getAnagrafica();
        });

        $("#BtnContratti").on('click', function() {
            $.mobile.changePage('#contratti');
        });

        //pagina dei contatti
        $('#contratti').on('pagebeforeshow', function() {

            $('#contratti-list').empty();
            getContratti();
        });

        $("#BtnPageDisdetta").on('click', function() {
            $.mobile.changePage('#disContratti');
        });

        $('#disContratti').on('pagebeforeshow', function() {

            $('#lista-contratti-disdetta').empty();
            getContrattiDisdetta();
            sendClosedContracts();
        });

        $("#BtnRapporti").on('click', function() {
            $.mobile.changePage('#rapporti');
        });

        //pagina dei rapporti
        $('#rapporti').on('pagebeforeshow', function() {
            getRapporti();
        });

        $("#BtnAttrezzature").on('click', function() {
            $.mobile.changePage('#attrezzature');
        });
        //pagina delle attrezzature
        $('#attrezzature').on('pagebeforeshow', function() {
            getAttrezzature();
        });

        $("#BtnModAnagrafica").on('click', function() {
            $.mobile.changePage('#cambioAnagrafica');
        });

        //pagina del cambio anagrafica
        $('#cambioAnagrafica').on('pagebeforeshow', function() {
            setCambioAnagrafica();
        });

        $("#BtnAssistenza").on('click', function() {
            $.mobile.changePage('#richiestaAssistenza');
        });


        //pagina della richiesta assistenza
        $('#richiestaAssistenza').on('pagebeforeshow', function() {
            richiestaAssistenza();
        });

        $("#BtnSorveglianza").on('click', function() {
            $.mobile.changePage('#sorveglianza');
        });

        //pagina della sorveglianza
        $('#sorveglianza').on('pagebeforeshow', function() {
            resetSorveglianza();
            // caricaModifiche();
        });

        $("#BtnModPsw").on('click', function() {
            $.mobile.changePage('#modificaPassword');
        });

        $('#modificaPassword').on('pagebeforeshow', function() {
            $('#oldPassword').val('');
            $('#password').val('');
            $('#vefifyPassword').val('');
            $('#change-pass-fielset').find('.error-message').remove();
            changePSW();
        });



        pageIndexInit();
        pageLoginInit();
    },

    //funzione che visualizza il contenuto del pdf passato come parametro
    openPdf: function(url) {
        window.open(url, '_blank', 'location=yes');
    }
};


$(document).ready(function() {
    app.initialize()
});