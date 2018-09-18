/**
 * Funzione che fa la registrazione dell'utente
 */

var registerForm = document.querySelector('#registerForm');
registerForm.onsubmit = function (event) {

    event.preventDefault();
    var registerFormInput = new FormData(registerForm);
    var promise = httpPost('php/ajax/register.php', registerFormInput);

    promise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                //reindirizzamento sulla pagina di login
                window.location.replace('index.php');
            } else {
                var message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');
                if ($('.error-message').length !== 0)
                    $('#register-fielset').find('.error-message').remove();
                $('#register-fielset').prepend(message);
            }
        }
    );
};