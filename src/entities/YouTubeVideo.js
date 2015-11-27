'use strict'
import EntityModel from './EntityModel';
import Manufacturer from './../classes/Manufacturer';
import Browser from './../classes/Browser';

class YouTubeVideo extends EntityModel {
     constructor(YouTubeVideoData) {
        super(YouTubeVideoData);
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

    static get OPTIONAL_PARTS() {
        return ['contentDetails','fileDetails','player','processingDetails','recordingDetails','statistics','status','suggestions','topicDetails'];
    }
    /**
    * Returns a string of the object type, usually used to build the query path.
    * @return {string}
    */
    static get SINGLE_TYPE(){ return 'video'; }
    static get FAMILY_TYPE(){ return 'videos'; }

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

    get(config) {
        return this.constructor.find( this.id, config ).then( video => {
            //parasites the returned object to update current one
            this._massAssign( video.rawData );
            this.rawData = video.rawData;
            return this;
        });
    }

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