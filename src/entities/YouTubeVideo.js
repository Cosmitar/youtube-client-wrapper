'use strict'
import EntityModel from './EntityModel';
import Manufacturer from './../classes/Manufacturer';

class YouTubeVideo extends EntityModel {
    /**
    * Returns a string of the object type, usually used to build the query path.
    * @return {string}
    */
    static get SINGLE_TYPE(){
        return 'video';
    }

}
Manufacturer.add('youtube#video', YouTubeVideo );

export default YouTubeVideo;