'use strict';

/**
 * Funzione che fa la registrazione dell'utente
 */
function recoverPassword() {
    var recoverForm = document.querySelector('#recoverForm');


    $("#BtnInviaRecoverPSW").on('click', function(event) {
        //alert('Ho cliccato invio')

        //recupero i dati da inserire al server
        let recoverFormInput = new FormData(recoverForm);

        //invio richiesta httpcml
        let promise = httpPost('php/ajax/recover_password.php', recoverFormInput);

        //inizio animazione invio email
        sendEmail($('#error-content-popup'), 'start', 'Sto inviando email con password...');

        //interpreto la risposta
        promise.then(
            function(data) {

                if (data.result) {
                    $("#error-recover-password-popup").css("display", "none");

                    //notifico l'avvenuto invio email
                    showError($('#error-content-popup'), "Mail inviata", "Password inviata", "success");
                    setTimeout(function() {
                        window.location.replace('content.php');
                    }, 1500)

                } else {
                    let message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');
                    if ($('.error-message').length !== 0)
                        $('#error-recover-password').find('.error-message').remove();
                    $('#error-recover-password').prepend(message);

                }
            }
        );
    });
}