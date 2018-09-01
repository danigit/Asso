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

        $('#register-button').on('click', function () {
            window.location.replace('index.php#register');
        });

        $('#fatture').on('pageinit', function () {
            getFatture();
        });

        $('#anagrafica').on('pageinit', function () {
            getAnagrafica();
        });

        $('#contratti').on('pageinit', function () {
            getContratti();
        });

        $('#rapporti').on('pageinit', function () {
            getRapporti();
        });

        $('#attrezzature').on('pageinit', function () {
            getAttrezzature();
        });

        $(document).on('tap', function (event) {
            if($(event.target).is('a')){
                switch (event.target.href.substr(event.target.href.indexOf('#') + 1)) {
                    case 'estintori':
                        viewList('LISTA_ESTINTORI');
                        $.mobile.changePage('#viewList');
                        break;
                    case 'porte':
                        viewList('LISTA_PORTE');
                        $.mobile.changePage('#viewList');
                        break;
                    case 'rilevatori%20fumi':
                        viewList('LISTA_RILEVATORI_FUMI');
                        $.mobile.changePage('#viewList');
                        break;
                    case 'idranti':
                        viewList('LISTA_IDRANTI');
                        $.mobile.changePage('#viewList');
                        break;
                    case 'sprinkler':
                        viewList('LISTA_SPRINKLER');
                        $.mobile.changePage('#viewList');
                        break;
                    case 'luci':
                        viewList('LISTA_LUCI');
                        $.mobile.changePage('#viewList');
                        break;
                }
            }
        });
    },

    open: function(url){
        window.open(url, '_blank', 'location=yes');
    }
};


$(document).ready(function () {
    app.initialize()
});