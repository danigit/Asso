
'use strict';

function pageLoginInit() 
{
    $("#BtnAccediLog").on('click',function()
    {
     let loginForm = document.querySelector('#loginForm');
     
     //recupero i dati da inviare al server
     let logingFormInput = new FormData(loginForm);

     //invio richiesta httpxml
     let promise = httpPost('php/ajax/login.php', logingFormInput);

     //interpreto risposta
     promise.then(
         function (data) 
         {
             //controllo se ci sono stati degli errori nella chiamata
             if (data.result) 
             {
                 //l'utente e' logato quindi entro nell'area protetta
                 // window.location.replace('../content.php');
                 window.location.replace('content.php');
             } 
             else 
             {
                 
                 let message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');
                 if ($('.error-message').length !== 0)
                     $('#login-fielset').find('.error-message').remove();
                 $('#login-fielset').prepend(message);
                
               
             }
         }
     );
    });
}


 
/**
loginForm.onsubmit = function (event) 
{

    event.preventDefault();

    //recupero i dati da inviare al server
    let logingFormInput = new FormData(loginForm);

    //invio richiesta httpxml
    let promise = httpPost('php/ajax/login.php', logingFormInput);

    //interpreto risposta
    promise.then(
        function (data) 
        {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) 
            {
                //l'utente e' logato quindi entro nell'area protetta
                // window.location.replace('../content.php');
                window.location.replace('content.php');
            } 
            else 
            {
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

  sendEmail($('#error-recover-password-popup'), 'start', 'Sto inviando email per il recupero password...');

  promise.then(
      function (data) {
          if (data.result){
              sendEmail($('#error-recover-password-popup'), 'stop');
              // window.location.replace('../Asso/index.php');
          }else{
              let message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');
              if ($('.error-message').length !== 0)
                  $('#recover-pass-fielset').find('.error-message').remove();
              $('#recover-pass-fielset').prepend(message);
          }
      }
  )
};
*/