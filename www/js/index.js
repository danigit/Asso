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

        // $('#viewList').on('pageinit', function () {
        //     viewList();
        // });

        $(document).on('tap', function (event) {
            if($(event.target).is('a')){
                var link = event.target.href.substr(event.target.href.indexOf('#') + 1);
                if(link === 'estintori' || link === 'porte' || link === 'rilevatori%20fumi' || link === 'idranti'
                    || link === 'sprinkler' || link === 'luci')
                    event.preventDefault();

                var target = event.target;
                switch (link) {
                    case 'estintori':
                        console.log("dani: " + $(target).attr('data-name'));
                        viewList('LISTA_ESTINTORI', $(target).attr('data-name'));
                        $.mobile.changePage('#viewList');
                        break;
                    case 'porte':
                        viewList('LISTA_PORTE', $(target).attr('data-name'));
                        $.mobile.changePage('#viewList');
                        break;
                    case 'rilevatori%20fumi':
                        viewList('LISTA_RILEVATORI_FUMI', $(target).attr('data-name'));
                        $.mobile.changePage('#viewList');
                        break;
                    case 'idranti':
                        viewList('LISTA_IDRANTI', $(target).attr('data-name'));
                        $.mobile.changePage('#viewList');
                        break;
                    case 'sprinkler':
                        viewList('LISTA_SPRINKLER', $(target).attr('data-name'));
                        $.mobile.changePage('#viewList');
                        break;
                    case 'luci':
                        viewList('LISTA_LUCI', $(target).attr('data-name'));
                        $.mobile.changePage('#viewList');
                        break;
                }
            }
        });
    },

    open: function(url){
        // console.log('pressed');
        // window.open('http://www.danielfotografo.altervista.org/PhoenixData/5EDE93B0D9FC141257AF248D6545DE46/D1C9AF683835522588C776665626202A.pdf', '_blank', 'location=yes');
        window.open(url, '_blank', 'location=yes');
    }
};


$(document).ready(function () {
    app.initialize()
});