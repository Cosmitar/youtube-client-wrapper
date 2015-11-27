'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _servicesYouTubeAPIClient = require('./../services/YouTubeAPIClient');

var _servicesYouTubeAPIClient2 = _interopRequireDefault(_servicesYouTubeAPIClient);

var _Paginator = require('./Paginator');

var _Paginator2 = _interopRequireDefault(_Paginator);

var _SearchParams = require('./SearchParams');

var _SearchParams2 = _interopRequireDefault(_SearchParams);

var _Manufacturer = require('./Manufacturer');

var _Manufacturer2 = _interopRequireDefault(_Manufacturer);

var Browser = (function () {
    function Browser() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Browser);

        /**
        * Configuration parameters for the query.
        * @type {SearchParams}
        */
        this._config = new _SearchParams2['default']();

        /**
        * Paginator handler
        * @type {Paginator}
        */
        this._paginator = new _Paginator2['default'](this);

        /**
        * The origin of the query, usually the name of the entity who trigger the process.
        * This parameter is used to build the path or url.
        * Can defer for the entity type into SearchParams
        * @type {string}
        */
        this.origin = params.origin;
    }

    _createClass(Browser, [{
        key: '_getSearchPath',
        value: function _getSearchPath() {
            var path = 'search.list';
            return path;
        }
    }, {
        key: '_getSearchPayload',
        value: function _getSearchPayload() {
            var data = this._config;
            Object.assign(data, this._paginator.getPaginationParams());
            return data;
        }
    }, {
        key: '_processQuery',
        value: function _processQuery(promise) {
            var _this = this;

            return promise.then(function (response) {
                var collection = [];
                //console.log(response.result);
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = response.result.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var item = _step.value;

                        collection.push(_Manufacturer2['default'].make(item));
                    }

                    //update paginator
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator['return']) {
                            _iterator['return']();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                _this._paginator.update(response.result);
                _this._paginator.setPage(collection);
                return _this._paginator;
            }, function (reject) {
                console.log(reject);
                return reject;
            });
        }
    }, {
        key: 'all',
        value: function all() {
            var path = this.origin + '.list';
            var payload = this._getSearchPayload();
            var promise = _servicesYouTubeAPIClient2['default'].request(path, payload);
            return this._processQuery(promise);
        }
    }, {
        key: 'find',
        value: function find() {
            var path = this.origin + '.list';
            var payload = this._getSearchPayload();
            var promise = _servicesYouTubeAPIClient2['default'].request(path, payload);
            return this._processQuery(promise);
        }
    }, {
        key: 'rate',
        value: function rate() {
            var path = this.origin + '.rate';
            var payload = this._getSearchPayload();
            return _servicesYouTubeAPIClient2['default'].request(path, payload);
        }
    }, {
        key: 'config',
        set: function set() {
            var searchParams = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            Object.assign(this._config, searchParams);
            this._paginator.update(searchParams);
        }
    }]);

    return Browser;
})();

exports['default'] = Browser;
module.exports = exports['default'];