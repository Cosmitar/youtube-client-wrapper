'use strict'
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

import EntityModel from   './../entities/EntityModel';

/**
* Flag for avoid multiple instances of Config class
* @type {boolean}
*/
var  singleton = false;

class Manufacturer {

    constructor() {
        this.factories = [];
    }

    add( key, factory ) {
        this.factories.push( {key: key, source: factory} );
    }

    make( YouTubeResultItem ) {
        let item;
        for( let factory of this.factories ){
            if( factory.key == YouTubeResultItem.id.kind ){
                item = new factory.source( YouTubeResultItem );
            }
        }
        return item || new EntityModel(YouTubeResultItem);
    }
}

if( !singleton ) {
    singleton = new Manufacturer;
}

export default singleton ;