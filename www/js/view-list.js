function viewList(elem) {

    var viewForm = new FormData();
    viewForm.append('lista', elem);

    var attrezzaturePromise = httpPost('php/ajax/get_viewlist.php', viewForm);

    attrezzaturePromise.then(
        function (data) {
            if (data.result) {
                var label =  label = $('<a href="#" data-inset="false" class="fatture-header ui-shadow ui-btn ui-corner-all ui-header">' + data[0].contratto + '</a>');
                $('#viewListCollapsible').prepend(label);
                console.log('anag: ' + data[0].lista[0]);

                $.each(data[0].lista, function (key, value) {

                    $.each(value, function (innerkey, innerValue) {

                        console.log('innerValue: ' + innerValue.MATRICOLA);
                        var content = "<div data-role='collapsible' id='" + innerValue.MATRICOLA + "'><h3>Matricola " + innerValue.MATRICOLA + "</h3>";
                        $.each(innerValue, function (lastKey, lastValue) {

                            content += '<p><b class="blue-text">' + lastKey + '</b> ' + lastValue + '</p>';
                        });
                        content += '</div>';
                        $("#viewListCollapsible").append( content ).collapsibleset('refresh');
                    })
                    // console.log('value: ' + value[0].ANNO_COSTRUZIONE);
                });
            } else {
                //TODO mostrare il messaggio di errore ritornato;
            }
        }
    );
}