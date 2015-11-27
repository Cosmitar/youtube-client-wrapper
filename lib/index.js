'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _entitiesYouTubeVideo = require('./entities/YouTubeVideo');

var _entitiesYouTubeVideo2 = _interopRequireDefault(_entitiesYouTubeVideo);

var _entitiesYouTubeChannel = require('./entities/YouTubeChannel');

var _entitiesYouTubeChannel2 = _interopRequireDefault(_entitiesYouTubeChannel);

var _entitiesYouTubePlaylist = require('./entities/YouTubePlaylist');

var _entitiesYouTubePlaylist2 = _interopRequireDefault(_entitiesYouTubePlaylist);

var _entitiesYouTubeSearch = require('./entities/YouTubeSearch');

var _entitiesYouTubeSearch2 = _interopRequireDefault(_entitiesYouTubeSearch);

var _servicesConfig = require('./services/Config');

var _servicesConfig2 = _interopRequireDefault(_servicesConfig);

var _servicesAuth = require('./services/Auth');

var _servicesAuth2 = _interopRequireDefault(_servicesAuth);

exports['default'] = {
    Video: _entitiesYouTubeVideo2['default'],
    Channel: _entitiesYouTubeChannel2['default'],
    Playlist: _entitiesYouTubePlaylist2['default'],
    Search: _entitiesYouTubeSearch2['default'],
    Config: _servicesConfig2['default'],
    Auth: _servicesAuth2['default']
};
module.exports = exports['default'];