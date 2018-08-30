/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
       this.bind();
    },
    
    bind: function(){
        document.addEventListener('deviceready', this.deviceready, false);

        $('#fatture').on('pageinit', function () {
            getFatture();
        });

        $('#anagrafica').on('pageinit', function () {
            getAnagrafica();
        });

        $('#contratti').on('pageinit', function () {
            getContratti();
        });

        $('#attrezzature').on('pageinit', function () {
            getAttrezzature();
        });

        $(document).on('tap', function (event) {
            if($(event.target).is('a')){
                switch (event.target.href.substr(event.target.href.indexOf('#') + 1)) {
                    case 'estintori':
                        console.log('clicked estintori');
                        viewList('LISTA_ESTINTORI');
                        $.mobile.changePage('#viewList');
                        break;
                    case 'porte':
                        console.log('clicked porte');
                        viewList('LISTA_PORTE');
                        $.mobile.changePage('#viewList');
                        break;
                    case 'rilevatori%20fumi':
                        console.log('clicked porte');
                        viewList('LISTA_RILEVATORI_FUMI');
                        $.mobile.changePage('#viewList');
                        break;
                    case 'idranti':
                        console.log('clicked porte');
                        viewList('LISTA_IDRANTI');
                        $.mobile.changePage('#viewList');
                        break;
                }
            }
        });
    },

    alert: function () {
        navigator.notification.alert(
            'You are the winner!', // callback
            'Game Over',            // title
            'Done'                  // buttonName
        );
    }
};


$(document).ready(function () {
    app.initialize()
});