
var changePassForm = document.querySelector('#changePassForm');
changePassForm.onsubmit = function (event) {

    event.preventDefault();
    var changePassFormInput = new FormData(changePassForm);
    var chagePassPromise = httpPost('php/ajax/change_password.php', changePassFormInput);

    chagePassPromise.then(
        function (data) {
            if(data.result){
                window.location.replace('../www/index.php');
            }else {
                //TODO mostrare il messaggio di errore ritornato;
                var message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');
                if($('.error-message').length !== 0)
                    $('#change-pass-fielset').find('.error-message').remove();
                $('#change-pass-fielset').prepend(message);
            }
        }
    );
};