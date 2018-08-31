//TODO deve essere eseguito onpageload

var loginForm = document.querySelector('#loginForm');
loginForm.onsubmit = function (event) {
    console.log('submited');

    event.preventDefault();
    var logingFormInput = new FormData(loginForm);
    var promise = httpPost('php/ajax/login.php', logingFormInput);

    promise.then(
        function (data) {
            if(data.result){
                console.log('result = true');
                //TODO redirect sulla pagina giusta
                window.location.replace('../content.php');
            }else {
                //TODO mostrare il messaggio di errore ritornato;
                var message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');
                if($('.error-message').length !== 0)
                    $('#login-fielset').find('.error-message').remove();
                $('#login-fielset').prepend(message);
            }
        }
    );
};
