/**
 * Funzione che esegue il login dell'utente
 */
let loginForm = document.querySelector('#loginForm');
loginForm.onsubmit = function (event) {

    event.preventDefault();

    //recupero i dati da inviare al server
    let logingFormInput = new FormData(loginForm);

    //invio richiesta httpxml
    let promise = httpPost('php/ajax/login.php', logingFormInput);

    //interpreto risposta
    promise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                if ($('.error-message').length !== 0)
                    $('#login-fielset').find('.error-message').remove();
                // $('#login-content').find('.register-button').remove();
                // $('#login-content').find('.login-separator').remove();
                // $('#login-content').find('#username').remove();
                // $('#login-fielset').find('.ui-input-btn').addClass('hidden');
                //
                // let contracts = $('<ul data-role="listview" data-inset="true" class="margin-anagrafica-list"></ul>');
                // if (data.contratti.length === 1){
                //     $('#login-fielset').find('.ui-input-btn').removeClass('hidden');
                //     $('#login-fielset').find('.ui-input-btn').text('Entra');
                //     $('#login-fielset').find('#login-submit').val('Entra');
                //     $('#login-fielset > div:nth-child(1)').after('<input type="password" name="password" id="password" value="" data-clear-btn="true" placeholder="Inserisci password">');
                //     $('#login-fielset').enhanceWithin();
                //     $('#login-content').find('#contractsContainer').remove();
                //     loginForm.submit = false;
                //     let contractForm = document.querySelector('#loginForm');
                //     contractForm.onsubmit = function (event) {
                //         event.preventDefault();
                //
                //         let pass = $('#password').val();
                //
                //         let contractForm = new FormData();
                //         console.log(data.contratti[0].piva);
                //         console.log(data.contratti[0].email);
                //         contractForm.append('piva', data.contratti[0].piva);
                //         contractForm.append('email', data.contratti[0].email);
                //         contractForm.append('password', pass);
                //
                //         let contractPromise = httpPost('php/ajax/login_contract.php', contractForm);
                //
                //         contractPromise.then(
                //             function (data) {
                //                 if (data.result){
                //                     window.location.replace('../Asso/content.php');
                //                 }
                //             });
                //     }
                // } else {
                //     $.each(data.contratti, function (key, value) {
                //         console.log(value);
                //         let listElem = $('<a href="#" class="ui-btn fatture-item">' +
                //             '<p class="green-text font-small margin-bottom-none center-text"><b>' + value.nome + '</b></p></a>').on('click', function () {
                //
                //             $('#login-fielset').find('.ui-input-btn').removeClass('hidden');
                //             $('#login-fielset').find('.ui-input-btn').text('Entra');
                //             $('#login-fielset').find('#login-submit').val('Entra');
                //             $('#login-fielset > div:nth-child(1)').after('<input type="password" name="password" id="password" value="" data-clear-btn="true" placeholder="Inserisci password">');
                //             $('#login-fielset').enhanceWithin();
                //             $('#login-content').find('#contractsContainer').remove();
                //             loginForm.submit      = false;
                //             let contractForm      = document.querySelector('#loginForm');
                //             contractForm.onsubmit = function (event) {
                //                 event.preventDefault();
                //
                //                 let pass = $('#password').val();
                //
                //                 let contractForm = new FormData();
                //                 contractForm.append('piva', value.piva);
                //                 contractForm.append('email', value.email);
                //                 contractForm.append('password', pass);
                //
                //                 let contractPromise = httpPost('php/ajax/login_contract.php', contractForm);
                //
                //                 contractPromise.then(
                //                     function (data) {
                //                         if (data.result) {
                //                             window.location.replace('../Asso/content.php');
                //                         }
                //                     });
                //             }
                //
                //         });
                //         contracts.append(listElem);
                //     });
                //     $('#contractsContainer').append(contracts).trigger('create');
                // }
                window.location.replace('../Asso/content.php');

                // $('#login-fielset > div:nth-child(1)').after('<input type="password" name="password" id="password" value="" data-clear-btn="true" placeholder="Inserisci password">');
                // $('#login-fielset').enhanceWithin();
            } else {
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
