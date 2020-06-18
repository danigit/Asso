/**
 * Gestisco la disdetta dei contratti
 */
 
'use strict';
 
function sendClosedContracts() {
    let contracts = {}
    
    $(window).load(function(){

        $('#lista-contratti-disdetta input[type=checkbox]').change(function (event){
            if(this.checked && !contracts.hasOwnProperty($(this).attr('id'))){
                contracts[$(this).attr('id')] = $(this).prev('label').text()
            }else{
                delete contracts[$(this).attr('id')]
            }
        })
    })


    $("#BtnInviaDisdetta").on('click',function(){
        event.preventDefault();
        let closedContractsForm = new FormData();
        closedContractsForm.append('contracts', JSON.stringify(contracts))

        //invio richiesta httpxml
        let closedContractsPromise = httpPost('php/ajax/send_cancel_contracts.php', closedContractsForm);

        sendEmail($('#error-content-popup'), 'start', 'Sto inviando disdetta contratti...');
        //interpreto risposta della richiesta
        closedContractsPromise.then(
            function (data) {
                //controllo se ci sono stati errori nella chiamata
                if(data.result){
                    //ritorno alla pagina iniziale
                    showError($('#error-content-popup'), "Mail inviata", "Email con contratti disdetti inviata", "success");
                    setTimeout(function() {
                        // window.location.replace('content.php');
                    }, 1500)
                }else {
                    //mostro messaggio di errore
                    let message = $('<div class="center-text error-message"><span>' + data.message + '</span></div>');
                    if($('.error-message').length !== 0)
                        $('#change-pass-fielset').find('.error-message').remove();
                    $('#change-pass-fielset').prepend(message);
                }
            }
        );
    });
 };

 function getSelectedContracts(){
    let contracts = {}

    console.log('document ready')
    $('#lista-contratti-disdetta input[type=checkbox]').change(function (event){
        console.log(this.checked)
        if(this.checked && !contracts.hasOwnProperty($(this).attr('id'))){
            console.log('inside if')
            contracts[$(this).attr('id')] = $(this).prev('label').text()
            console.log(contracts)
        }else{
            delete contracts[$(this).attr('id')]
        }
    })
 }