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