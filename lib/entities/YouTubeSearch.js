'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _classesBrowser = require('./../classes/Browser');

var _classesBrowser2 = _interopRequireDefault(_classesBrowser);

var YouTubeSearch = (function () {
    function YouTubeSearch() {
        _classCallCheck(this, YouTubeSearch);
    }

    _createClass(YouTubeSearch, null, [{
        key: 'where',

        /**
        * Performs a search based on given query string an optiona search parameters.
        * Use this method to search multiples entities (Video, Playlist and Channels).
        * For specific entity search is better start queriyng from its class i order to 
        * get a response with aditional information defined in the parameter -part-.
        * @param {string} queryString The string to search.
        * @param {object=} params The aditiona configuration options
        * @return {Promise}
        */
        value: function where(queryString) {
            var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            params.q = queryString;
            var searcher = new _classesBrowser2['default']();
            /**
            * YouTube allows search by text only for search.list API method.
            * If you want a spacific entity data as https://developers.google.com/youtube/v3/docs/videos/list#part
            * you need to get video ids first and then call Video.find() or Video.several() with { part: contentDetails }
            * as config search.
            * Method YouTubeSearch.where allways has 'search' as origin, this means the api calls gapi.youtube.search.list
            */
            searcher.origin = 'search';
            searcher.config = params;
            return searcher.all();
        }
    }]);

    return YouTubeSearch;
})();

exports['default'] = YouTubeSearch;
module.exports = exports['default'];