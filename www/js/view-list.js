function viewList(elem) {

    var viewForm = new FormData();
    viewForm.append('lista', elem);
    $('#viewListCollapsible').html('');

    var attrezzaturePromise = httpPost('php/ajax/get_viewlist.php', viewForm);

    attrezzaturePromise.then(
        function (data) {
            if (data.result) {
                var label =  label = $('<a href="#" data-inset="false" class="fatture-header ui-shadow ui-btn ui-corner-all ui-header">' + data[0].contratto + '</a>');
                $('#viewListCollapsible').prepend(label);
                $.each(data[0].lista, function (key, value) {
                    var i = 1;
                    var oldFiliale = '';
                    console.log(key + '/' + value);
                    $.each(value, function (innerkey, innerValue) {
                        console.log('inner: ' + innerkey + '/' + innerValue);
                        if(innerValue.FILIALE != oldFiliale) {
                            var filiale = $('<a href="#" data-inset="true" class="ui-btn blue-text attrezzature-label-padding">' + innerValue.FILIALE + '</a>');
                            $('#viewListCollapsible').append(filiale);
                        }
                        var titoloLabel = '';
                        (innerValue.MATRICOLA === undefined) ? titoloLabel = 'Articolo ' + i++ : titoloLabel = "Matricola " + innerValue.MATRICOLA;
                        var content = "<div data-role='collapsible' id='" + innerValue.MATRICOLA + "'><h3>" + titoloLabel + "</h3>";
                        $.each(innerValue, function (lastKey, lastValue) {

                            content += '<a href="#" class="ui-btn fatture-item"><p class="float-left"><b class="blue-text">' + lastKey.replace('_', ' ') + ':</b> </p><p class="float-right">' + lastValue + '</p></a>';
                        });
                        content += '</div>';
                        $("#viewListCollapsible").append( content ).collapsibleset('refresh');
                        oldFiliale = innerValue.FILIALE;
                    })
                    // console.log('value: ' + value[0].ANNO_COSTRUZIONE);
                });
            } else {
                //TODO mostrare il messaggio di errore ritornato;
            }
        }
    );
}