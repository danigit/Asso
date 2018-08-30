function httpPost(url, input) {
    return new Promise(function (resolve, reject) {
        var httpReq = new XMLHttpRequest();
        httpReq.open('POST', url, true);
        httpReq.onreadystatechange = function () {
            if(httpReq.readyState === 4){
                if(httpReq.status === 200){
                    resolve(JSON.parse(httpReq.responseText));
                }else{
                    reject(httpReq.statusText);
                }
            }
        };
        httpReq.send(input);
    });
}

function getValue(value){
    console.log('value: ' + value + 'end');
    if(!value || value.length === 0)
        return 'Nessun dato disponibile';
    else
        return value;
}

function parseString(key, stringValue) {

    if(key === 'pagata' && stringValue === '0')
        return 'si';
    else if(key === 'pagata' && stringValue === '0')
        return false;
    else if(key === 'importo' && stringValue.length > 2)
        return stringValue.substr(0, stringValue.length - 2) + '.' + stringValue.substr(stringValue.length - 2);
    else if(key === 'estintori' &&  stringValue === 'descrizione')
    else
        return stringValue;
}
