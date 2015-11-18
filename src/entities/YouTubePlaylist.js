'use strict'
import EntityModel from './EntityModel';
import Manufacturer from './../classes/Manufacturer';

class YouTubePlaylist extends EntityModel {

    /**
    * Returns a string of the object type, usually used to build the query path.
    * @return {string}
    */
    static get SINGLE_TYPE(){
        return 'playlist';
    }
    
}
Manufacturer.add('youtube#playlist', YouTubePlaylist );

export default YouTubePlaylist;