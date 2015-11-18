'use strict'
import EntityModel from './EntityModel';
import Manufacturer from './../classes/Manufacturer';
import Browser from './../classes/Browser';

class YouTubeVideo extends EntityModel {
    /**
    * Returns a string of the object type, usually used to build the query path.
    * @return {string}
    */
    static get SINGLE_TYPE(){ return 'video'; }
    static get FAMILY_TYPE(){ return 'videos'; }

    rate( rating, params = {} ) {
        params.id = this.id;
        params.type = YouTubeVideo.FAMILY_TYPE;
        params.rating = rating;
        let searcher = new Browser();
        searcher.config = params;
        return searcher.rate();
    }

}
Manufacturer.add('youtube#video', YouTubeVideo );

export default YouTubeVideo;