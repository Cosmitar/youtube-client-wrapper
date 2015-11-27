'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var YouTubeAPIClient = (function () {
    function YouTubeAPIClient() {
        _classCallCheck(this, YouTubeAPIClient);
    }

    _createClass(YouTubeAPIClient, null, [{
        key: 'request',
        value: function request(path, payload) {
            var fn = undefined;
            eval('fn = gapi.client.youtube.' + path);
            return fn(payload).then(function (resp) {
                return resp;
            }, function (reason) {
                console.log('Error: ' + reason.result.error.message);
            });
        }
    }]);

    return YouTubeAPIClient;
})();

exports['default'] = YouTubeAPIClient;
module.exports = exports['default'];