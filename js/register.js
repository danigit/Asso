/**
 * Funzione che fa la registrazione dell'utente
 */
function register() 
{
    var registerForm = document.querySelector('#registerForm');
    $('#registerUsername').val("");

    $("#BtnConfemaReg").on('click', function (event) 
    {
        //recupero i dati da inserire al server
        let registerFormInput = new FormData(registerForm);

        //invio richiesta httpcml
        let promise  = httpPost('php/ajax/register.php', registerFormInput);

        //interpreto la risposta
        promise.then
        (
            function (data) 
            {
                //controllo se ci sono stati degli errori nella chiamata
                console.log(data.result);
                if (data.result) 
                {
                    console.log(data.result);
                    $("#lbRegisterError").css("display","none");
                    window.location.replace('index.php');

                } 
                else 
                {
                    let message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');
                    if ($('.error-message').length !== 0)
                        $('#error-register-user').find('.error-message').remove();
                    $('#error-register-user').prepend(message);
                }
            }
        );
    });
}