
var changePassForm = document.querySelector('#changePassForm');
changePassForm.onsubmit = function (event) {

    event.preventDefault();
    var changePassFormInput = new FormData(changePassForm);
    var chagePassPromise = httpPost('php/ajax/change_password.php', changePassFormInput);

    chagePassPromise.then(
        function (data) {
            //controllo se ci sono stati errori nella chiamata
            if(data.result){
                //ritorno alla pagina iniziale
                window.location.replace('../Asso/index.php');
            }else {
                //mostro messaggio di errore
                var message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');
                if($('.error-message').length !== 0)
                    $('#change-pass-fielset').find('.error-message').remove();
                $('#change-pass-fielset').prepend(message);
            }
        }
    );
};