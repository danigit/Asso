'use strict'; /* obbliga a dichiarare le variabili*/

/**
 * Funzione che reccupera l'anagrafica relativa all'utente attualmente connesso
 */
function pageIndexInit() 
{
    
    var clickCount = 0;
    
    if(navigator.userAgent.toUpperCase().indexOf('ANDROID')!=-1)
    {
      console.log("SONO ANDROID"); 
    }
    else
    { 
     // $('#logoWA').css("display","none");
      $('#bottone-call').css("display","none");
      
      
      console.log("SONO BROWSER");  
    }
    
    $('#pageLogin').on('pagebeforeshow', function () 
    {
       $('#error-recover-password').find('.error-message').remove();
       
            
    });
    
    $('#pageIndex').on('pagebeforeshow', function () 
    {
       $('#login-fielset').find('.error-message').remove();
       $('#error-register-user').find('.error-message').remove();
       $('#email').val('');
       $('#password').val('');
    });
    
    $("#imgAsso").on('click',function()
    {
       clickCount = clickCount + 1;
       if(clickCount == 7)
       {
        $.mobile.changePage("#pageHystory");
        clickCount = 0;
       }
    });
    
    $("#BtnAccedi").on('click',function()
    {
       $.mobile.changePage('#pageLogin');
    });
    
    $("#BtnRegistrati").on('click',function()
    {
       $.mobile.changePage("#pageRegister");
    });
    
    $("#BtnPswForget ").on('click',function()
    {
       $.mobile.changePage("#pageRecoverPsw");
    });
    
    
    $("#BtnContattaci").on('click', function()
    {
      try{
      window.plugins.CallNumber.callNumber(function (result)
                                          {
                                            
                                          }, 
                                          function(result)
                                          {
                                            alert("Error:"+result);
                                          }, NUMERO_TEL, false);  
      }
      catch(err){
       alert("ERRORE");
       alert(err);
      }
    });
    
    
    
    
}

