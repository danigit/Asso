/**
 * Funzione che esegue il login dell'utente
 */
let loginForm = document.querySelector('#loginForm');
loginForm.onsubmit = function (event) {

    event.preventDefault();
    let logingFormInput = new FormData(loginForm);
    let promise = httpPost('php/ajax/login.php', logingFormInput);

    promise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                //l'utente e' logato quindi entro nell'area protetta
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