/**
 * Gestisco il cambio della password
 */
let changePassForm = document.querySelector('#changePassForm');

changePassForm.onsubmit = function (event) {

    event.preventDefault();
    let changePassFormInput = new FormData(changePassForm);

    //invio richiesta httpxml
    let chagePassPromise = httpPost('php/ajax/change_password.php', changePassFormInput);

    //interpreto risposta della richiesta
    chagePassPromise.then(
        function (data) {
            //controllo se ci sono stati errori nella chiamata
            if(data.result){
                //ritorno alla pagina iniziale
                // window.location.replace('../Asso/index.php');
            }else {
                //mostro messaggio di errore
                let message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');
                if($('.error-message').length !== 0)
                    $('#change-pass-fielset').find('.error-message').remove();
                $('#change-pass-fielset').prepend(message);
            }
        }
    );
};