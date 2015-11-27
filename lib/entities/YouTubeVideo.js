'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _EntityModel2 = require('./EntityModel');

var _EntityModel3 = _interopRequireDefault(_EntityModel2);

var _classesManufacturer = require('./../classes/Manufacturer');

var _classesManufacturer2 = _interopRequireDefault(_classesManufacturer);

var _classesBrowser = require('./../classes/Browser');

var _classesBrowser2 = _interopRequireDefault(_classesBrowser);

var YouTubeVideo = (function (_EntityModel) {
    _inherits(YouTubeVideo, _EntityModel);

    function YouTubeVideo(YouTubeVideoData) {
        _classCallCheck(this, YouTubeVideo);

        _get(Object.getPrototypeOf(YouTubeVideo.prototype), 'constructor', this).call(this, YouTubeVideoData);
        /*Object.assign(this, YouTubeVideoData.contentDetails);
        Object.assign(this, YouTubeVideoData.fileDetails);
        Object.assign(this, YouTubeVideoData.player);
        Object.assign(this, YouTubeVideoData.processingDetails);
        Object.assign(this, YouTubeVideoData.recordingDetails);
        Object.assign(this, YouTubeVideoData.statistics);
        Object.assign(this, YouTubeVideoData.status);
        Object.assign(this, YouTubeVideoData.suggestions);
        Object.assign(this, YouTubeVideoData.topicDetails);*/
    }

    _createClass(YouTubeVideo, [{
        key: 'get',

        /*static where( queryString, params = {} ){
            let setA = new Set( params.parts.split(',') );
            let setB = new Set( this.OPTIONAL_PARTS );
            let intersection = new Set(
                [...setA].filter(x => setB.has(x))
            );
            let retVal = super.where(queryString, params);
            if( intersection.size > 0 ){
                return retVal.then(page => {
                 });
            }else{
                return retVal;
            }
        }*/

        value: function get(config) {
            var _this = this;

            return this.constructor.find(this.id, config).then(function (video) {
                //parasites the returned object to update current one
                _this._massAssign(video.rawData);
                _this.rawData = video.rawData;
                return _this;
            });
        }
    }, {
        key: 'rate',
        value: function rate(rating) {
            var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            params.id = this.id;
            params.type = YouTubeVideo.FAMILY_TYPE;
            params.rating = rating;
            var searcher = new _classesBrowser2['default']();
            searcher.config = params;
            return searcher.rate();
        }
    }], [{
        key: 'OPTIONAL_PARTS',
        get: function get() {
            return ['contentDetails', 'fileDetails', 'player', 'processingDetails', 'recordingDetails', 'statistics', 'status', 'suggestions', 'topicDetails'];
        }

        /**
        * Returns a string of the object type, usually used to build the query path.
        * @return {string}
        */
    }, {
        key: 'SINGLE_TYPE',
        get: function get() {
            return 'video';
        }
    }, {
        key: 'FAMILY_TYPE',
        get: function get() {
            return 'videos';
        }
    }]);

    return YouTubeVideo;
})(_EntityModel3['default']);

_classesManufacturer2['default'].add('youtube#video', YouTubeVideo);

exports['default'] = YouTubeVideo;
module.exports = exports['default'];