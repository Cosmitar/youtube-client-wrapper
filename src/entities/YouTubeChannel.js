'use strict'
import EntityModel from './EntityModel';
import Manufacturer from './../classes/Manufacturer';

class YouTubeVideoChannel extends EntityModel {

    /**
    * Returns a string of the object type, usually used to build the query path.
    * @return {string}
    */
    static get SINGLE_TYPE(){
        return 'channel';
    }

}
Manufacturer.add('youtube#channel', YouTubeVideoChannel );

export default YouTubeVideoChannel;