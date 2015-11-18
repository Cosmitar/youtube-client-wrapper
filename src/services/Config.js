'use strict'

/**
* Flag for avoid multiple instances of Config class
* @type {boolean}
*/
var  singletonConfig = false;

class Config {
    constructor() {
        this._apiKey = '';
    }

    /**
    * Sets variables by given data.
    * @param {object} data
    */
    set( data ) {
        this._apiKey = data.apiKey;
        return this;
    }

    boot() {
        return new Promise( (resolve, reject) => {
            //load API client
            gapi.client.setApiKey(this._apiKey);
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
