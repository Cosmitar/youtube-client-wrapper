'use strict'
import YouTubeSearch from './YouTubeSearch';

class EntityModel extends YouTubeSearch{
    constructor( YouTubeSearchItemData ) {
        super(YouTubeSearchItemData);
        this.kind = YouTubeSearchItemData.id.kind;
        this.id = YouTubeSearchItemData.id[`${this.SINGLE_TYPE}Id`];
        Object.assign(this,YouTubeSearchItemData.snippet);

        this.rawData = YouTubeSearchItemData;
        this._massAssign( YouTubeSearchItemData );
    }

    /**
    * Mass assign attributes. Excludes attributes marked as NOT FILLABLE
    * @param {object} data The object endpoint response.
    */
    _massAssign( data ){
        let notFillable = this.constructor._getNotFillable() || [];
        for( let el in data ){
            if( notFillable.indexOf( el ) === -1 && typeof this[ el ] != 'function' ){
                this[ el ] = data[ el ];
            }
        }
    }

    /**
    * Returns a string of the object type, usually used to build the query path.
    * @return {string}
    */
    static get SINGLE_TYPE(){
        return '';
    }

    /**
    * Protect attributes from mass assigment. Ready to be overwritten by generalization
    * @return {Array<string>} The names of the attributes to keep safe from mass assign.
    */
    static _getNotFillable(){ return []; }

    /**
    * Returns the URI thumbnail based on optional size parameter
    * @param {string=} size One of three: default, medium or high
    * @return {string}
    */
    getThumbnail( size ) {
        let uri = '';
        switch( size ) {
            default:
            case 'default':
                uri = this.thumbnails.default.url;
                break;
            case 'medium':
                uri = this.thumbnails.medium.url;
                break;
            case 'high':
                uri = this.thumbnails.high.url;
                break;
        }
        return uri;
    }

}

export default EntityModel;