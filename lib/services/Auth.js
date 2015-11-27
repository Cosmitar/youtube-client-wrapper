'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _servicesConfig = require('./../services/Config');

var _servicesConfig2 = _interopRequireDefault(_servicesConfig);

var promiseResolve = undefined,
    promiseReject = undefined;

var Auth = (function () {
    function Auth() {
        _classCallCheck(this, Auth);
    }

    _createClass(Auth, [{
        key: 'authorize',
        value: function authorize() {
            this.handleAuth(true);
            return new Promise(function (resolve, reject) {
                promiseResolve = resolve;
                promiseReject = reject;
            });
        }
    }, {
        key: 'showAuth',
        value: function showAuth() {
            this.handleAuth(false);
            return new Promise(function (resolve, reject) {
                promiseResolve = resolve;
                promiseReject = reject;
            });
        }
    }, {
        key: 'handleAuth',
        value: function handleAuth(immediate) {
            gapi.auth.authorize({ client_id: _servicesConfig2['default'].clientId, scope: _servicesConfig2['default'].scopes.join(','), immediate: immediate }, this.handleAuthResult.bind(this));
        }
    }, {
        key: 'handleAuthResult',
        value: function handleAuthResult(authResult) {
            if (authResult && !authResult.error) {
                promiseResolve(authResult);
            } else {
                promiseReject(authResult);
            }
        }
    }]);

    return Auth;
})();

exports['default'] = new Auth();
module.exports = exports['default'];