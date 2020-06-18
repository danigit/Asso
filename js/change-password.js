/**
 * Gestisco il cambio della password
 */
 
 'use strict';
 
function changePSW() {
  $("#BtncambiaPSW").on('click',function()
    {
    
    let changePassForm = document.querySelector('#changePassForm');

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
                window.location.replace('index.php');
            }else {
               
                //mostro messaggio di errore
                let message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');
                if($('.error-message').length !== 0)
                    $('#change-pass-fielset').find('.error-message').remove();
                $('#change-pass-fielset').prepend(message);
            }
        }
    );
  });
 };