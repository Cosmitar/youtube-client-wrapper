'use strict';

/**
* Flag for avoid multiple instances of Config class
* @type {boolean}
*/
Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var singletonConfig = false,
    apiKey = undefined,
    clientId = undefined,
    scopes = undefined;

var Config = (function () {
    function Config() {
        _classCallCheck(this, Config);
    }

    _createClass(Config, [{
        key: 'set',

        /**
        * Sets variables by given data.
        * @param {object} data
        */
        value: function set(data) {
            apiKey = data.apiKey;
            clientId = data.clientId;
            scopes = data.scopes;
            return this;
        }
    }, {
        key: 'boot',
        value: function boot() {
            return new Promise(function (resolve, reject) {
                //load API client
                gapi.client.setApiKey(apiKey);
                gapi.client.load('youtube', 'v3').then(function () {
                    resolve();
                }, function (reason) {
                    console.log('Error: ' + reason.result.error.message);
                    reject(reason);
                });
            });
        }
    }, {
        key: 'apiKey',
        get: function get() {
            return apiKey;
        }
    }, {
        key: 'clientId',
        get: function get() {
            return clientId;
        }
    }, {
        key: 'scopes',
        get: function get() {
            return scopes;
        }
    }]);

    return Config;
})();

if (!singletonConfig) {
    singletonConfig = new Config();
}

exports['default'] = singletonConfig;
module.exports = exports['default'];