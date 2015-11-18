'use strict'
import Client from './../services/YouTubeAPIClient';
import Paginator from './Paginator';
import SearchParams from './SearchParams';
import Manufacturer from './Manufacturer';

class Browser {
    constructor( params = {} ) {
        this._config = new SearchParams;
        this._paginator = new Paginator;
        this._paginator.browser = this;
    }

    set config( searchParams = {} ) {
        Object.assign( this._config, searchParams );
        this._paginator.update( searchParams );
    }

    _getSearchPath() {
        let path = `search.list`;
        return path;
    }

    _getSearchPayload() {
        let data = this._config;
        Object.assign( data, this._paginator.getPaginationParams() );
        return data;
    }

    all() {
        let path = `search.list`;
        let payload = this._getSearchPayload();
        let promise = Client.request( path, payload );
        return promise.then( response => {
            let collection = [];
            for( let item of response.result.items ){
                collection.push( Manufacturer.make( item ) );
            }

            //update paginator
            this._paginator.update( response.result );
            this._paginator.setPage( collection );
            return this._paginator;
        }, reject => {
            console.log(reject);
            return reject;
        });
    }

}

export default Browser;
