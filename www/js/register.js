// //TODO deve essere eseguito onpageload
// console.log('page loaded');
// var form = document.querySelector('#registerForm');
// console.log('form: ' + form);
// form.onsubmit = function (event) {
//     event.preventDefault();
//     var formInput = new FormData(form);
//     var promise = httpPost('php/ajax/register.php', formInput);
//
//     promise.then(
//         function (data) {
//             if(data.result){
//                 console.log('result = true');
//                 //TODO redirect sulla pagina giusta
//             }else {
//                 //TODO mostrare il messaggio di errore ritornato;
//             }
//         }
//     )
// };

var registerForm = document.querySelector('#registerForm');
registerForm.onsubmit = function (event) {
    console.log('submited');

    event.preventDefault();
    var registerFormInput = new FormData(registerForm);
    var promise = httpPost('php/ajax/register.php', registerFormInput);

    promise.then(
        function (data) {
            if(data.result){
                console.log('result = true');
                //TODO redirect sulla pagina giusta
                window.location.replace('../www/index.html');
            }else {
                //TODO mostrare il messaggio di errore ritornato;
                var message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');
                if($('.error-message').length !== 0)
                    $('#register-fielset').find('.error-message').remove();
                $('#register-fielset').prepend(message);
            }
        }
    );
};