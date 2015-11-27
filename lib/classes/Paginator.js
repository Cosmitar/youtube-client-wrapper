'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Paginator = (function () {
    function Paginator(owner) {
        _classCallCheck(this, Paginator);

        /**
        * Initialization variables
        */
        this._limit = /*data.maxResults || */Paginator.LIMIT_DEFAULT;
        this._offset = /*data.offset || */Paginator.OFFSET_DEFAULT;
        this._total_pages = 0;
        this._total_results = 0;
        this._currentIndex = 1;
        this._currentPage = [];
        this._pagesCache = [];
        this._nextPageToken = '';
        this._prevPageToken = '';
        this._tokenPagination = '';
        this._pageToken = null;

        /**
        * Composition owner, shuld be an object who handle the method .all() to trigger a search
        * @type {Browser}
        */
        this._owner = owner;
    }

    _createClass(Paginator, [{
        key: 'getPaginationParams',
        value: function getPaginationParams() {
            var params = {};
            params.maxResults = this._limit;
            params.pageToken = this._pageToken;
            return params;
        }
    }, {
        key: 'update',
        value: function update() {
            var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            this._nextPageToken = data.nextPageToken;
            this._prevPageToken = data.prevPageToken;
            this._tokenPagination = data.tokenPagination;
            //YouTube doesn't have offset value
            this._offset = data.offset || this._offset;
            //pageInfo.resultsPerPage came from search response
            //maxResults came from query parameter
            this._limit = data.pageInfo && data.pageInfo.resultsPerPage || data.maxResults || this._limit;
            this._total_results = data.pageInfo && data.pageInfo.totalResults || this._total_results;
            this._currentIndex = data.current_page || this._offset + 1; //offset can be 0 but index starts in 1
            this._total_pages = data.total_pages || Math.ceil(this._total_results / this._limit);
        }
    }, {
        key: 'setPage',
        value: function setPage(items) {
            this._currentPage = items;
        }
    }, {
        key: 'firstElement',
        value: function firstElement() {
            return this._currentPage[0];
        }
    }, {
        key: 'lastElement',
        value: function lastElement() {
            return this._currentPage[this._currentPage.length - 1];
        }
    }, {
        key: 'elementAt',
        value: function elementAt(index) {
            return this._currentPage[index];
        }
    }, {
        key: 'hasNextPage',
        value: function hasNextPage() {
            return this._currentIndex < this._total_pages;
        }
    }, {
        key: 'hasPrevPage',
        value: function hasPrevPage() {
            return this._currentIndex > 1;
        }
    }, {
        key: 'nextPage',
        value: function nextPage() {
            var _this = this;

            var retVal = new Promise(function (resolve, reject) {
                if (_this.hasNextPage()) {
                    _this._offset++;
                    _this._pageToken = _this._nextPageToken;
                    _this._owner.all().then(function (result) {
                        _this._pageToken = null; //clear for next queries not related with pagination
                        resolve(result);
                    });
                } else {
                    reject(null);
                }
            });
            return retVal;
        }
    }, {
        key: 'prevPage',
        value: function prevPage() {
            var _this2 = this;

            var retVal = new Promise(function (resolve, reject) {
                if (_this2.hasPrevPage()) {
                    _this2._offset--;
                    _this2._pageToken = _this2._prevPageToken;
                    _this2._owner.all().then(function () {
                        _this2._pageToken = null; //clear for next queries not related with pagination
                    }).then(function (result) {
                        resolve(result);
                    });
                } else {
                    reject(null);
                }
            });
            return retVal;
        }
    }, {
        key: 'firstPage',
        value: function firstPage() {
            var _this3 = this;

            var retVal = new Promise(function (resolve, reject) {
                _this3._offset = 0;
                resolve(_this3._owner.all());
            });
            return retVal;
        }
    }, {
        key: 'lastPage',
        value: function lastPage() {
            var _this4 = this;

            var retVal = new Promise(function (resolve, reject) {
                _this4._offset = _this4._total_pages;
                resolve(_this4._owner.all());
            });
            return retVal;
        }
    }, {
        key: 'goToPage',
        value: function goToPage(index) {
            var _this5 = this;

            var retVal = new Promise(function (resolve, reject) {
                _this5._offset = index;
                resolve(_this5._owner.all());
            });
            return retVal;
        }
    }, {
        key: 'searchParams',
        get: function get() {
            return this._searchParams;
        }
    }, {
        key: 'elements',
        get: function get() {
            return this._currentPage;
        }
    }, {
        key: 'limit',
        get: function get() {
            return this._limit;
        }
    }, {
        key: 'offset',
        get: function get() {
            return this._offset;
        }
    }, {
        key: 'total_pages',
        get: function get() {
            return this._total_pages;
        }
    }, {
        key: 'currentIndex',
        get: function get() {
            return this._currentIndex;
        }
    }, {
        key: 'page_size',
        get: function get() {
            return this._limit;
        }
    }, {
        key: 'browser',
        set: function set(value) {
            this._owner = value;
        }
    }]);

    return Paginator;
})();

Paginator.LIMIT_DEFAULT = 10;
Paginator.OFFSET_DEFAULT = 0;

exports['default'] = Paginator;
module.exports = exports['default'];