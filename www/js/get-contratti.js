function getContratti() {
    var contrattiPromise = httpPost('php/ajax/get_contratti.php');

    contrattiPromise.then(
        function (data) {
            if (data.result) {

                $.each(data[0], function (key, value) {
                    if(key === "0"){
                        var contrattiAttivi = "<div data-role='collapsible' class='contratti-collapsible' data-collapsed='false'><h3>Contratti attivi</h3>";
                        var contrattiAttiviList = '';
                        $.each(value, function (innerKey, innerValue) {
                            contrattiAttiviList += '<a href="../www/PhoenixData/' + innerValue.path + '" class="ui-btn">' + innerValue.nome + ' / ' + innerValue.data.split('/').pop() + '</a>';
                        });
                        contrattiAttivi += contrattiAttiviList + '</div>';
                        $("#contratti-list").append( contrattiAttivi ).collapsibleset('refresh');
                    }else{
                        var contrattiCessati = "<div data-role='collapsible' class='contratti-collapsible'><h3>Contratti cessati</h3>";
                        var contrattiCessatiList = '';
                        $.each(value, function (innerKey, innerValue) {
                            console.log('path: ' + innerValue.path + "=====" + 'id: ' + innerValue.id);
                            contrattiCessatiList += '<a href="../www/PhoenixData/' + innerValue.path + '" class="ui-btn">' + innerValue.nome + ' / ' + innerValue.data.split('/').pop() + '</a>';
                        });
                        contrattiCessati += contrattiCessatiList + '</div>';
                        $("#contratti-list").append( contrattiCessati ).collapsibleset('refresh');
                    }

                })
            } else {
                //TODO mostrare il messaggio di errore ritornato;

            }
        }
    );
}