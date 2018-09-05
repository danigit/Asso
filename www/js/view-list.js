'use strict';

/**
 * Funzione che visualizza la lista degli elementi presenti nella reccuperata attraverso elem
 * @param elem - nome della lista degli elementi da visualizzare
 * @param contratto
 */
function viewList(elem, contratto) {
    var viewForm = new FormData();
    viewForm.append('lista', elem);
    viewForm.append('contratto', contratto);
    $('#viewListCollapsible').html('');

    var attrezzaturePromise = httpPost('php/ajax/get_viewlist.php', viewForm);

    attrezzaturePromise.then(
        function (data) {
            if (data.result) {

                var content = "";
                $.each(data[0], function (key, value) {
                    // console.log(value);
                    var label = $('<a href="#" data-inset="false" class="fatture-header ui-shadow ui-btn ui-corner-all ui-header">' + key + '</a>');
                    $('#viewListCollapsible').append(label);
                    var i = 1;

                    $.each(value, function (innerKey, innerValue) {
                        if(innerValue.MATRICOLA)
                            content += "<div data-role='collapsible'><h3>Matricola: " + innerValue.MATRICOLA + "</h3>";
                        else
                            content += "<div data-role='collapsible'><h3>Articolo: " + i++ + "</h3>";

                        $.each(innerValue, function (lastKey, lastValue) {
                            if($.isArray(lastValue)){
                                console.log(lastValue);
                                if(!$.isEmptyObject(lastValue)) {
                                    content += "<div data-role='collapsible' data-collapsed-icon='carat-d' data-expanded-icon='carat-u' data-iconpos='right' data-inset='true'><h3>Manichette</h3>";
                                    $.each(lastValue, function (mk, mv) {
                                        content += "<div data-role='collapsible' data-collapsed-icon='carat-d' data-expanded-icon='carat-u' data-iconpos='right' data-inset='true'><h3>Manichetta nuero: " + mv.ID_BOCCHELLO + "</h3>";
                                        $.each(mv, function (label, value) {
                                            content += '<a href="#" class="ui-btn fatture-item"><p class="float-left"><b class="blue-text">' + label.replace('_', ' ') + ':</b> </p><p class="float-right line-wrap">' + value + '</p></a>';
                                        });
                                        content += '</div>';
                                    });
                                    content += '</div>';
                                }
                            }else {
                                console.log('notArray');
                                content += '<a href="#" class="ui-btn fatture-item"><p class="float-left"><b class="blue-text">' + lastKey.replace('_', ' ') + ':</b> </p><p class="float-right line-wrap">' + lastValue + '</p></a>';
                            }
                        });
                        content += '</div>';
                    });
                    $("#viewListCollapsible").append( content ).collapsibleset('refresh');

                })

                // $.each(data[0], function (k, v) {
                //     var label = $('<a href="#" data-inset="false" class="fatture-header ui-shadow ui-btn ui-corner-all ui-header">' + k + '</a>');
                //     $('#viewListCollapsible').prepend(label);
                //     $.each(v, function (key, value) {
                //         console.log(key + '/' + value);
                //         var content = "<div data-role='collapsible'><h3>" + key + "</h3>";
                //         var i = 1;
                //         $.each(value, function (innerkey, innerValue) {
                //             if(innerValue.MATRICOLA)
                //                 content += "<div data-role='collapsible' data-collapsed-icon='carat-d' data-expanded-icon='carat-u' data-iconpos='right' data-inset='true'><h3>Matricola: " + innerValue.MATRICOLA + "</h3>";
                //             else
                //                 content += "<div data-role='collapsible' data-collapsed-icon='carat-d' data-expanded-icon='carat-u' data-iconpos='right' data-inset='true'><h3>Articolo: " + i++ + "</h3>";
                //             $.each(innerValue, function (lastKey, lastValue) {
                //                 if($.isArray(lastValue)){
                //                     content += "<div data-role='collapsible' data-collapsed-icon='carat-d' data-expanded-icon='carat-u' data-iconpos='right' data-inset='true'><h3>Manichette</h3>";
                //                     $.each(lastValue, function (mk, mv) {
                //                         content += "<div data-role='collapsible' data-collapsed-icon='carat-d' data-expanded-icon='carat-u' data-iconpos='right' data-inset='true'><h3>Manichetta nuero: " + mv.ID_BOCCHELLO + "</h3>";
                //                         $.each(mv, function (label, value) {
                //                             content += '<a href="#" class="ui-btn fatture-item"><p class="float-left"><b class="blue-text">' + label.replace('_', ' ') + ':</b> </p><p class="float-right line-wrap">' + value + '</p></a>';
                //                         });
                //                         content += '</div>';
                //                     });
                //                     content += '</div>';
                //                 }else {
                //                     console.log('notArray');
                //                     content += '<a href="#" class="ui-btn fatture-item"><p class="float-left"><b class="blue-text">' + lastKey.replace('_', ' ') + ':</b> </p><p class="float-right line-wrap">' + lastValue + '</p></a>';
                //                 }
                //             });
                //             content += '</div>';
                //         });
                //         content += '</div>';
                //         $("#viewListCollapsible").append( content ).collapsibleset('refresh');
                //     });
                // })
            } else {
                $('#viewListCollapsible').append('<div class="center-text error-message"><span>Impossibile reccuperare le fatture</span></div>');
            }
        }
    );
}