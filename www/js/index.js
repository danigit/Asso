
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

        // $(document).on('pagebeforehide', function () {
        //     let url = window.location.href;
        //     console.log('antani');
        //     console.log(url);
        //     let pop;
        //
        //     if(url.split('#').pop() === 'sorveglianza'){
        //         console.log('sorveglianza...');
        //         $(window).on('popstate', function (e) {
        //             if ($('#sorveglianzaContrattoSelect').val() !== "Seleziona un contratto..." && $('#sorveglianzaFilialeSelect').val() !== 'Seleziona una filiale....') {
        //                 // e.preventDefault();
        //                 console.log('popping...');
        //                 pop = window.location.href;
        //
        //                 $('#back-sorveglianza-confirm .back-sorveglianza-confirm-header').text('Sorveglianza');
        //                 $('#back-sorveglianza-confirm .back-sorveglianza-confirm-text').text('Salvare lo stato della pagina prima di uscire?');
        //                 $('#back-sorveglianza-confirm .back-sorveglianza-confirm-button').text('Salva stato').on('click ', function (e) {
        //                     console.log('salvataggio....');
        //                     // saveTemp();
        //                     console.log(pop);
        //                     window.history.pushState(null, "", url);
        //                 });
        //
        //                 setTimeout(function () {
        //                     $('#back-sorveglianza-confirm').popup('open');
        //                 }, 500)
        //             }
        //         })
        //
        //     }
        // })

        // $(document).on('tap', function (event) {
        //     if($(event.target).is('a')){
        //         var link = event.target.href.substr(event.target.href.indexOf('#') + 1);
        //         if(link === 'estintori' || link === 'porte' || link === 'rilevatori%20fumi' || link === 'idranti'
        //             || link === 'sprinkler' || link === 'luci') {
        //             event.preventDefault();
        //             console.log("button clicked");
        //         }
        //         var target = event.target;
        //         switch (link) {
        //             case 'estintori':
        //                 console.log("dani: " + $(target).attr('data-name'));
        //                 viewList('LISTA_ESTINTORI', $(target).attr('data-name'));
        //                 $.mobile.changePage('#viewList');
        //                 break;
        //             case 'porte':
        //                 viewList('LISTA_PORTE', $(target).attr('data-name'));
        //                 $.mobile.changePage('#viewList');
        //                 break;
        //             case 'rilevatori%20fumi':
        //                 viewList('LISTA_RILEVATORI_FUMI', $(target).attr('data-name'));
        //                 $.mobile.changePage('#viewList');
        //                 break;
        //             case 'idranti':
        //                 viewList('LISTA_IDRANTI', $(target).attr('data-name'));
        //                 $.mobile.changePage('#viewList');
        //                 break;
        //             case 'sprinkler':
        //                 viewList('LISTA_SPRINKLER', $(target).attr('data-name'));
        //                 $.mobile.changePage('#viewList');
        //                 break;
        //             case 'luci':
        //                 viewList('LISTA_LUCI', $(target).attr('data-name'));
        //                 $.mobile.changePage('#viewList');
        //                 break;
        //         }
        //     }
        // });
    },

    openPdf: function(url){
        window.open(url, '_blank', 'location=yes');
    }
};


$(document).ready(function () {
    app.initialize()
});