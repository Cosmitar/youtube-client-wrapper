'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _YouTubeSearch2 = require('./YouTubeSearch');

var _YouTubeSearch3 = _interopRequireDefault(_YouTubeSearch2);

var _classesBrowser = require('./../classes/Browser');

var _classesBrowser2 = _interopRequireDefault(_classesBrowser);

var EntityModel = (function (_YouTubeSearch) {
    _inherits(EntityModel, _YouTubeSearch);

    function EntityModel(YouTubeSearchItemData) {
        _classCallCheck(this, EntityModel);

        _get(Object.getPrototypeOf(EntityModel.prototype), 'constructor', this).call(this, YouTubeSearchItemData);
        this.kind = YouTubeSearchItemData.id.kind;
        this.id = YouTubeSearchItemData.id[this.constructor.SINGLE_TYPE + 'Id'] || YouTubeSearchItemData.id;
        Object.assign(this, YouTubeSearchItemData.snippet);

        this.rawData = YouTubeSearchItemData;
        this._massAssign(YouTubeSearchItemData);
    }

    /**
    * Mass assign attributes. Excludes attributes marked as NOT FILLABLE
    * @param {object} data The object endpoint response.
    */

    _createClass(EntityModel, [{
        key: '_massAssign',
        value: function _massAssign(data) {
            var notFillable = this.constructor._getNotFillable() || [];
            for (var el in data) {
                if (notFillable.indexOf(el) === -1 && typeof this[el] != 'function') {
                    this[el] = data[el];
                }
            }
        }

        /**
        * Returns a string of the object type, usually used to build the query path.
        * @return {string}
        */
    }, {
        key: 'getThumbnail',

        /**
        * Returns the URI thumbnail based on optional size parameter
        * @param {string=} size One of three: default, medium or high
        * @return {string}
        */
        value: function getThumbnail(size) {
            var uri = '';
            switch (size) {
                default:
                case 'default':
                    uri = this.thumbnails['default'].url;
                    break;
                case 'medium':
                    uri = this.thumbnails.medium.url;
                    break;
                case 'high':
                    uri = this.thumbnails.high.url;
                    break;
            }
            return uri;
        }
    }], [{
        key: '_getNotFillable',

        /**
        * Protect attributes from mass assigment. Ready to be overwritten by generalization
        * @return {Array<string>} The names of the attributes to keep safe from mass assign.
        */
        value: function _getNotFillable() {
            return ['id'];
        }
    }, {
        key: 'several',
        value: function several() {
            var entitiesIds = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
            var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            params.id = entitiesIds.join(',');
            var searcher = new _classesBrowser2['default']();
            searcher.origin = this.FAMILY_TYPE;
            searcher.config = params;
            return searcher.find();
        }
    }, {
        key: 'find',
        value: function find() {
            for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
                params[_key] = arguments[_key];
            }

            //let {id,...other} = params;
            var id = params.shift();
            return this.several.apply(this, [[id]].concat(params)).then(function (page) {
                return page.firstElement();
            });
        }
    }, {
        key: 'SINGLE_TYPE',
        get: function get() {
            return '';
        }
    }]);

    return EntityModel;
})(_YouTubeSearch3['default']);

exports['default'] = EntityModel;
module.exports = exports['default'];