/**
 * Funzione che esegue il login dell'utente
 */
var loginForm = document.querySelector('#loginForm');
loginForm.onsubmit = function (event) {

    event.preventDefault();
    var logingFormInput = new FormData(loginForm);
    var promise = httpPost('php/ajax/login.php', logingFormInput);

    promise.then(
        function (data) {
            if (data.result) {
                window.location.replace('../content.php');
            } else {
                var message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');
                if ($('.error-message').length !== 0)
                    $('#login-fielset').find('.error-message').remove();
                $('#login-fielset').prepend(message);
            }
        }
    );
};