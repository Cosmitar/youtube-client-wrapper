'use strict'

/**
* Flag for avoid multiple instances of Config class
* @type {boolean}
*/
let singletonConfig = false,
    apiKey, clientId, scopes;

class Config {
    /**
    * Sets variables by given data.
    * @param {object} data
    */
    set( data ) {
        apiKey = data.apiKey;
        clientId = data.clientId;
        scopes = data.scopes;
        return this;
    }

    get apiKey()    { return apiKey; }
    get clientId()  { return clientId; }
    get scopes()    { return scopes; }

    boot() {
        return new Promise( (resolve, reject) => {
            //load API client
            gapi.client.setApiKey(apiKey);
            gapi.client.load('youtube', 'v3')
                .then(() => {
                    resolve();
                },(reason) => {
                    console.log('Error: ' + reason.result.error.message);
                    reject(reason);
                });
        });
    }
}

if( !singletonConfig ) {
    singletonConfig = new Config;
}

export default singletonConfig;
