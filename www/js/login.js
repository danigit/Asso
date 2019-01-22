/**
 * Funzione che esegue il login dell'utente
 */
let loginForm = document.querySelector('#loginForm');
loginForm.onsubmit = function (event) {

    event.preventDefault();

    //recupero i dati da inviare al server
    let logingFormInput = new FormData(loginForm);

    //invio richiesta httpxml
    let promise = httpPost('php/ajax/login.php', logingFormInput);

    //interpreto risposta
    promise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                //l'utente e' logato quindi entro nell'area protetta
                // window.location.replace('../content.php');
                window.location.replace('../Asso/content.php');
            } else {
                let message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');
                if ($('.error-message').length !== 0)
                    $('#login-fielset').find('.error-message').remove();
                $('#login-fielset').prepend(message);
            }
        }
    );
};

let recoverPassForm = document.querySelector('#recover-pass-form');

recoverPassForm.onsubmit = function (event) {
  event.preventDefault();

  let recoverPassFormInput = new FormData(recoverPassForm);

  let promise = httpPost('php/ajax/recover_password.php', recoverPassFormInput);

  promise.then(
      function (data) {
          if (data.result){

          }else{
              let message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');
              if ($('.error-message').length !== 0)
                  $('#recover-pass-fielset').find('.error-message').remove();
              $('#recover-pass-fielset').prepend(message);
          }
      }
  )
};
