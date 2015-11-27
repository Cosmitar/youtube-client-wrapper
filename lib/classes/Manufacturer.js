'use strict';
/*
* There is an issue trying to import entities from here because loops
* YouTubeVideo import -YouTubeSearch- import Manfacturer import YouTubePlaylist import -YouTubeSearch- (here fails)
* To solve the problem make Manufacturer create object from classes not explicit imported.
* Classes are suscribed via Manufacturer.add()
*/

/*import Video from   './../entities/YouTubeVideo';
import Channel from './../entities/YouTubeChannel';
import Playist from './../entities/YouTubePlaylist';

class Manufacturer {
    static make( YouTubeResultItem ){
        console.log('Manufacturer::make');
        let item;
        switch( YouTubeResultItem.id.kind ){
            default:
            case 'youtube#video':
                item = new Video( YouTubeResultItem );
                break;
            case 'youtube#channel':
                item = new Channel( YouTubeResultItem );
                break;
            case 'youtube#playlist':
                item = new Playist( YouTubeResultItem );
                break;
        }
        return item;
    }
}*/

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _entitiesEntityModel = require('./../entities/EntityModel');

var _entitiesEntityModel2 = _interopRequireDefault(_entitiesEntityModel);

/**
* Flag for avoid multiple instances of Config class
* @type {boolean}
*/
var singleton = false;

var Manufacturer = (function () {
    function Manufacturer() {
        _classCallCheck(this, Manufacturer);

        this.factories = [];
    }

    _createClass(Manufacturer, [{
        key: 'add',
        value: function add(key, factory) {
            this.factories.push({ key: key, source: factory });
        }
    }, {
        key: 'make',
        value: function make(YouTubeResultItem) {
            var item = undefined;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.factories[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var factory = _step.value;

                    if (factory.key == YouTubeResultItem.id.kind //for Search.List
                     || factory.key == YouTubeResultItem.kind //for Videos.List
                    ) {
                            item = new factory.source(YouTubeResultItem);
                        }
                }
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

            return item || new _entitiesEntityModel2['default'](YouTubeResultItem);
        }
    }]);

    return Manufacturer;
})();

if (!singleton) {
    singleton = new Manufacturer();
}

exports['default'] = singleton;
module.exports = exports['default'];