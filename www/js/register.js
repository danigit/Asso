/**
 * Funzione che fa la registrazione dell'utente
 */
function register() {
    let registerForm = document.querySelector('#registerForm');
    $('#registerUsername').val("");

    registerForm.onsubmit = function (event) {

        event.preventDefault();
        //recupero i dati da inserire al server
        let registerFormInput = new FormData(registerForm);

        //invio richiesta httpcml
        let promise           = httpPost('php/ajax/register.php', registerFormInput);

        //interpreto la risposta
        promise.then(
            function (data) {
                //controllo se ci sono stati degli errori nella chiamata
                if (data.result) {
                    //reindirizzamento sulla pagina di login
                    window.location.replace('index.php');
                } else {
                    let message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');
                    if ($('.error-message').length !== 0)
                        $('#register-fielset').find('.error-message').remove();
                    $('#register-fielset').prepend(message);
                }
            }
        );
    };
}